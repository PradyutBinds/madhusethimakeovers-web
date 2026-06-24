import { useMutation, useQuery } from "@tanstack/react-query";

export type AppointmentStatus = "pending" | "confirmed" | "completed" | "cancelled";
export type ServiceCategory = "bridal" | "party" | "hair" | "beauty";
export type GalleryCategory = "bridal" | "party" | "hair" | "transformations";

export type Appointment = {
  id: number;
  name: string;
  phone: string;
  email: string;
  service: string;
  date: string;
  time: string;
  message: string | null;
  status: AppointmentStatus;
  createdAt: string;
};

export type AppointmentList = {
  data: Appointment[];
  total: number;
  page?: number;
  limit?: number;
};

export type AppointmentInput = Omit<Appointment, "id" | "status" | "createdAt" | "message"> & {
  message?: string;
};

export type AppointmentUpdate = {
  status?: AppointmentStatus;
  message?: string;
};

export type Service = {
  id: number;
  name: string;
  category: ServiceCategory;
  description: string;
  price: string | null;
  duration: string;
  imageUrl: string | null;
  featured: boolean;
  sortOrder: number;
  createdAt: string;
};

export type ServiceInput = {
  name: string;
  category: ServiceCategory;
  description: string;
  price?: string;
  duration: string;
  imageUrl?: string;
  featured?: boolean;
  sortOrder?: number;
};

export type ServiceUpdate = Partial<ServiceInput>;

export type Testimonial = {
  id: number;
  clientName: string;
  serviceType: string | null;
  rating: number;
  review: string;
  imageUrl: string | null;
  featured: boolean;
  createdAt: string;
};

export type TestimonialInput = {
  clientName: string;
  serviceType?: string;
  rating: number;
  review: string;
  imageUrl?: string;
  featured?: boolean;
};

export type TestimonialUpdate = Partial<TestimonialInput>;

export type GalleryImage = {
  id: number;
  imageUrl: string;
  altText: string | null;
  category: GalleryCategory;
  featured: boolean;
  createdAt: string;
};

export type GalleryImageInput = {
  imageUrl: string;
  altText?: string;
  category: GalleryCategory;
  featured?: boolean;
};

export type ContactMessage = {
  id: number;
  name: string;
  phone: string | null;
  email: string;
  subject: string | null;
  message: string;
  read: boolean;
  createdAt: string;
};

export type ContactMessageInput = {
  name: string;
  phone?: string;
  email: string;
  subject?: string;
  message: string;
};

export type ContactMessageUpdate = {
  read?: boolean;
};

export type DashboardStats = {
  totalAppointments: number;
  pendingAppointments: number;
  confirmedAppointments: number;
  completedAppointments: number;
  totalMessages: number;
  unreadMessages: number;
  totalTestimonials: number;
  totalServices: number;
  totalGalleryImages: number;
  recentAppointments: Appointment[];
};

type QueryParams = Record<string, string | number | boolean | undefined>;

class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(status: number, message: string, data: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

function withParams(path: string, params?: QueryParams) {
  const search = new URLSearchParams();
  Object.entries(params ?? {}).forEach(([key, value]) => {
    if (value !== undefined) search.set(key, String(value));
  });
  const query = search.toString();
  return query ? `${path}?${query}` : path;
}

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(path, {
    ...init,
    headers: {
      ...(init?.body ? { "Content-Type": "application/json" } : {}),
      ...init?.headers,
    },
  });

  if (response.status === 204) {
    return undefined as T;
  }

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const message =
      data && typeof data === "object" && "error" in data
        ? String((data as { error: unknown }).error)
        : `Request failed with status ${response.status}`;
    throw new ApiError(response.status, message, data);
  }

  return data as T;
}

const json = (data: unknown): RequestInit => ({
  method: "POST",
  body: JSON.stringify(data),
});

const patch = (data: unknown): RequestInit => ({
  method: "PATCH",
  body: JSON.stringify(data),
});

const remove = (): RequestInit => ({ method: "DELETE" });

export const getListAppointmentsQueryKey = (params?: QueryParams) =>
  ["/api/appointments", ...(params ? [params] : [])] as const;
export const getListMessagesQueryKey = (params?: QueryParams) =>
  ["/api/messages", ...(params ? [params] : [])] as const;
export const getListServicesQueryKey = (params?: QueryParams) =>
  ["/api/services", ...(params ? [params] : [])] as const;
export const getListTestimonialsQueryKey = (params?: QueryParams) =>
  ["/api/testimonials", ...(params ? [params] : [])] as const;
export const getListGalleryImagesQueryKey = (params?: QueryParams) =>
  ["/api/gallery", ...(params ? [params] : [])] as const;
export const getGetDashboardStatsQueryKey = () => ["/api/dashboard/stats"] as const;

export function useListAppointments(params?: QueryParams) {
  return useQuery({
    queryKey: getListAppointmentsQueryKey(params),
    queryFn: () => apiFetch<AppointmentList>(withParams("/api/appointments", params)),
  });
}

export function useCreateAppointment() {
  return useMutation({
    mutationFn: ({ data }: { data: AppointmentInput }) =>
      apiFetch<Appointment>("/api/appointments", json(data)),
  });
}

export function useUpdateAppointment() {
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: AppointmentUpdate }) =>
      apiFetch<Appointment>(`/api/appointments/${id}`, patch(data)),
  });
}

export function useDeleteAppointment() {
  return useMutation({
    mutationFn: ({ id }: { id: number }) => apiFetch<void>(`/api/appointments/${id}`, remove()),
  });
}

export function useListMessages(params?: QueryParams) {
  return useQuery({
    queryKey: getListMessagesQueryKey(params),
    queryFn: () => apiFetch<ContactMessage[]>(withParams("/api/messages", params)),
  });
}

export function useCreateMessage() {
  return useMutation({
    mutationFn: ({ data }: { data: ContactMessageInput }) =>
      apiFetch<ContactMessage>("/api/messages", json(data)),
  });
}

export function useUpdateMessage() {
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: ContactMessageUpdate }) =>
      apiFetch<ContactMessage>(`/api/messages/${id}`, patch(data)),
  });
}

export function useDeleteMessage() {
  return useMutation({
    mutationFn: ({ id }: { id: number }) => apiFetch<void>(`/api/messages/${id}`, remove()),
  });
}

export function useListServices(params?: QueryParams) {
  return useQuery({
    queryKey: getListServicesQueryKey(params),
    queryFn: () => apiFetch<Service[]>(withParams("/api/services", params)),
  });
}

export function useCreateService() {
  return useMutation({
    mutationFn: ({ data }: { data: ServiceInput }) =>
      apiFetch<Service>("/api/services", json(data)),
  });
}

export function useUpdateService() {
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: ServiceUpdate }) =>
      apiFetch<Service>(`/api/services/${id}`, patch(data)),
  });
}

export function useDeleteService() {
  return useMutation({
    mutationFn: ({ id }: { id: number }) => apiFetch<void>(`/api/services/${id}`, remove()),
  });
}

export function useListTestimonials(params?: QueryParams) {
  return useQuery({
    queryKey: getListTestimonialsQueryKey(params),
    queryFn: () => apiFetch<Testimonial[]>(withParams("/api/testimonials", params)),
  });
}

export function useCreateTestimonial() {
  return useMutation({
    mutationFn: ({ data }: { data: TestimonialInput }) =>
      apiFetch<Testimonial>("/api/testimonials", json(data)),
  });
}

export function useUpdateTestimonial() {
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: TestimonialUpdate }) =>
      apiFetch<Testimonial>(`/api/testimonials/${id}`, patch(data)),
  });
}

export function useDeleteTestimonial() {
  return useMutation({
    mutationFn: ({ id }: { id: number }) => apiFetch<void>(`/api/testimonials/${id}`, remove()),
  });
}

export function useListGalleryImages(params?: QueryParams) {
  return useQuery({
    queryKey: getListGalleryImagesQueryKey(params),
    queryFn: () => apiFetch<GalleryImage[]>(withParams("/api/gallery", params)),
  });
}

export function useCreateGalleryImage() {
  return useMutation({
    mutationFn: ({ data }: { data: GalleryImageInput }) =>
      apiFetch<GalleryImage>("/api/gallery", json(data)),
  });
}

export function useDeleteGalleryImage() {
  return useMutation({
    mutationFn: ({ id }: { id: number }) => apiFetch<void>(`/api/gallery/${id}`, remove()),
  });
}

export function useGetDashboardStats() {
  return useQuery({
    queryKey: getGetDashboardStatsQueryKey(),
    queryFn: () => apiFetch<DashboardStats>("/api/dashboard/stats"),
  });
}
