import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";

const { Pool } = pg;

type Row = Record<string, unknown> & { id: number; createdAt: Date };
type Store = Map<object, Row[]>;

const seedData: Array<[object, Row[]]> = [
  [schema.servicesTable, [
    {
      id: 1,
      name: "Bridal Makeup",
      category: "bridal",
      description: "Complete bridal makeover with premium skin prep, HD makeup, and draping support.",
      price: "Contact for pricing",
      duration: "3-4 hours",
      imageUrl: "/assets/images/hero-bridal.png",
      featured: true,
      sortOrder: 1,
      createdAt: new Date(),
    },
    {
      id: 2,
      name: "Party Makeup",
      category: "party",
      description: "Elegant makeup for engagements, receptions, parties, and special occasions.",
      price: "Contact for pricing",
      duration: "1.5-2 hours",
      imageUrl: "/assets/images/party-makeup.png",
      featured: true,
      sortOrder: 2,
      createdAt: new Date(),
    },
    {
      id: 3,
      name: "Hair Styling",
      category: "hair",
      description: "Soft curls, buns, braids, and occasion-ready hair styling.",
      price: "Contact for pricing",
      duration: "1-2 hours",
      imageUrl: "/assets/images/hair-styling.png",
      featured: false,
      sortOrder: 3,
      createdAt: new Date(),
    },
  ]],
  [schema.galleryTable, [
    {
      id: 1,
      imageUrl: "/assets/images/gallery-1.png",
      altText: "Bridal makeover portfolio",
      category: "bridal",
      featured: true,
      createdAt: new Date(),
    },
    {
      id: 2,
      imageUrl: "/assets/images/bride-transformation.png",
      altText: "Bride transformation",
      category: "transformations",
      featured: true,
      createdAt: new Date(),
    },
    {
      id: 3,
      imageUrl: "/assets/images/makeup-application.png",
      altText: "Makeup application",
      category: "party",
      featured: false,
      createdAt: new Date(),
    },
  ]],
  [schema.testimonialsTable, [
    {
      id: 1,
      clientName: "Priya Sharma",
      serviceType: "Bridal Makeup",
      rating: 5,
      review: "The makeover was beautiful and lasted through the entire ceremony.",
      imageUrl: null,
      featured: true,
      createdAt: new Date(),
    },
  ]],
  [schema.appointmentsTable, []],
  [schema.messagesTable, []],
];

const store: Store = new Map(seedData);

function cloneRows(table: object) {
  return [...(store.get(table) ?? [])];
}

function getIdFromCondition(condition: unknown) {
  const chunks = (condition as { queryChunks?: unknown[] } | undefined)?.queryChunks;
  const param = chunks?.find((chunk) => {
    if (typeof chunk !== "object" || chunk === null || !("value" in chunk)) return false;
    return !Array.isArray((chunk as { value?: unknown }).value);
  });
  return Number((param as { value?: unknown } | undefined)?.value);
}

function nextId(rows: Row[]) {
  return rows.reduce((max, row) => Math.max(max, row.id), 0) + 1;
}

function createMemoryDb() {
  return {
    select() {
      return {
        from(table: object) {
          let rows = cloneRows(table);
          const query = {
            orderBy() {
              rows = [...rows].sort((a, b) => {
                const aOrder = Number(a.sortOrder ?? 0);
                const bOrder = Number(b.sortOrder ?? 0);
                if (aOrder !== bOrder) return aOrder - bOrder;
                return b.createdAt.getTime() - a.createdAt.getTime();
              });
              return query;
            },
            where(condition: unknown) {
              const id = getIdFromCondition(condition);
              rows = rows.filter((row) => row.id === id);
              return query;
            },
            then<TResult1 = Row[], TResult2 = never>(
              onfulfilled?: ((value: Row[]) => TResult1 | PromiseLike<TResult1>) | null,
              onrejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null,
            ) {
              return Promise.resolve(rows).then(onfulfilled, onrejected);
            },
          };
          return query;
        },
      };
    },
    insert(table: object) {
      return {
        values(value: Record<string, unknown>) {
          return {
            returning() {
              const rows = store.get(table) ?? [];
              const inserted = {
                ...value,
                id: nextId(rows),
                createdAt: new Date(),
              } as Row;
              store.set(table, [...rows, inserted]);
              return Promise.resolve([inserted]);
            },
          };
        },
      };
    },
    update(table: object) {
      return {
        set(updates: Record<string, unknown>) {
          return {
            where(condition: unknown) {
              return {
                returning() {
                  const id = getIdFromCondition(condition);
                  const rows = store.get(table) ?? [];
                  let updated: Row | undefined;
                  const nextRows = rows.map((row) => {
                    if (row.id !== id) return row;
                    updated = { ...row, ...updates };
                    return updated;
                  });
                  store.set(table, nextRows);
                  return Promise.resolve(updated ? [updated] : []);
                },
              };
            },
          };
        },
      };
    },
    delete(table: object) {
      return {
        where(condition: unknown) {
          const id = getIdFromCondition(condition);
          const rows = store.get(table) ?? [];
          store.set(table, rows.filter((row) => row.id !== id));
          return Promise.resolve();
        },
      };
    },
  };
}

export const pool = process.env.DATABASE_URL
  ? new Pool({ connectionString: process.env.DATABASE_URL })
  : null;

export const db = process.env.DATABASE_URL
  ? drizzle(pool as pg.Pool, { schema })
  : createMemoryDb();

export * from "./schema";
