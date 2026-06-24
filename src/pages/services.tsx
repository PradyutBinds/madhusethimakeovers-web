import { useState } from "react";
import { PageTransition, fadeIn, staggerContainer, GoldDivider, HoverCard } from "../components/animations";
import { SEO } from "../components/seo";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { type Service, useListServices } from "@/lib/api-client";
import { Skeleton } from "@/components/ui/skeleton";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Services() {
  const [activeTab, setActiveTab] = useState("bridal");
  const { data, isLoading } = useListServices(
    activeTab !== "all" ? { category: activeTab } : {}
  );

  const services = Array.isArray(data)
    ? data
    : Array.isArray((data as any)?.data)
    ? (data as any).data
    : Array.isArray((data as any)?.services)
    ? (data as any).services
    : [];
  const categories = [
    { id: "all", label: "All Services" },
    { id: "bridal", label: "Bridal Makeup" },
    { id: "party", label: "Party Makeup" },
    { id: "hair", label: "Hair Styling" },
    { id: "beauty", label: "Beauty Services" },
  ];

  return (
    <PageTransition>
      <SEO
        title="Services | Madhu Sethi Makeovers"
        description="Luxury bridal makeup, party makeup, hair styling and beauty services in Solan, Himachal Pradesh."
      />

      {/* Header */}
      <section className="pt-32 pb-16 bg-secondary/20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground uppercase tracking-widest mb-6">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <span className="text-foreground">Services</span>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE_OUT }}
            className="text-4xl md:text-6xl font-serif text-foreground mb-4"
          >
            Our Expertise
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <GoldDivider className="mt-6" />
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-background min-h-[60vh]">
        <div className="container mx-auto px-4 max-w-6xl">

          {/* Category tabs */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className={`px-6 py-2.5 text-xs uppercase tracking-widest font-medium transition-all duration-300 rounded-xl border ${
                  activeTab === cat.id
                    ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                    : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground bg-transparent"
                }`}
              >
                {cat.label}
              </motion.button>
            ))}
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex gap-6 p-6 border border-border rounded-sm">
                  <Skeleton className="w-32 h-32 rounded-sm shrink-0" />
                  <div className="flex-1 space-y-4 py-2">
                    <Skeleton className="h-5 w-2/3" />
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-4/5" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              key={activeTab}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {services && services.length > 0 ? (
                services.map((service: Service) => (
                  <motion.div
                    variants={fadeIn}
                    key={service.id}
                    whileHover={{ y: -4, boxShadow: "0 16px 48px rgba(0,0,0,0.09)" }}
                    transition={{ duration: 0.3, ease: EASE_OUT }}
                    className="flex flex-col sm:flex-row gap-0 border border-border bg-card shadow-sm rounded-2xl overflow-hidden group hover:border-primary/20 transition-all duration-300"
                  >
                    <div className="w-full sm:w-1/3 aspect-square sm:aspect-auto overflow-hidden shrink-0">
                      <motion.img
                        src={service.imageUrl || "/assets/images/beauty-products.png"}
                        alt={service.name}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.07 }}
                        transition={{ duration: 0.6, ease: EASE_OUT }}
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between p-6">
                      <div>
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="font-serif text-xl text-card-foreground group-hover:text-primary transition-colors duration-300">
                            {service.name}
                          </h3>
                          {service.price && (
                            <span className="text-primary font-medium text-sm ml-3 shrink-0">{service.price}</span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                          {service.description}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
                        <span className="text-xs uppercase tracking-wider text-muted-foreground">
                          {service.duration}
                        </span>
                        <Link href={`/appointment`}>
                          <motion.span
                            whileHover={{ x: 3 }}
                            transition={{ duration: 0.2 }}
                            className="text-xs uppercase tracking-widest font-medium text-primary hover:text-foreground transition-colors cursor-pointer inline-flex items-center gap-1.5"
                          >
                            Book Now
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </motion.span>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-1 md:col-span-2 text-center py-24">
                  <p className="text-muted-foreground text-lg font-serif italic mb-2">
                    No services found in this category.
                  </p>
                  <p className="text-sm text-muted-foreground/70">Check back soon or explore another category.</p>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </section>
    </PageTransition>
  );
}
