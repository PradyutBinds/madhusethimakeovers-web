import { PageTransition, fadeIn, staggerContainer, GoldDivider, ScrollReveal } from "../components/animations";
import { SEO } from "../components/seo";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useListTestimonials } from "@/lib/api-client";
import { Skeleton } from "@/components/ui/skeleton";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Testimonials() {
  const { data: rawTestimonials, isLoading } = useListTestimonials();
  const testimonials = Array.isArray(rawTestimonials) ? rawTestimonials : [];

  return (
    <PageTransition>
      <SEO
        title="Testimonials | Madhu Sethi Makeovers"
        description="Read what our clients have to say about their luxury makeover experiences in Solan."
      />

      {/* Header */}
      <section className="pt-32 pb-16 bg-secondary/20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground uppercase tracking-widest mb-6">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <span className="text-foreground">Testimonials</span>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE_OUT }}
            className="text-4xl md:text-6xl font-serif text-foreground mb-4"
          >
            Client Love
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

      {/* Google Rating Banner */}
      <section className="py-14 bg-background border-b border-border">
        <ScrollReveal className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-center sm:text-left">
            <div>
              <span className="text-5xl font-serif text-primary">4.9</span>
            </div>
            <div>
              <div className="flex items-center gap-1 text-primary mb-1 justify-center sm:justify-start">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-muted-foreground text-sm uppercase tracking-widest">Based on 200+ Google Reviews</p>
            </div>
            <div className="hidden sm:block w-px h-12 bg-border" />
            <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
              Trusted by hundreds of brides and clients across Himachal Pradesh.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Cards */}
      <section className="py-20 bg-background min-h-[50vh]">
        <div className="container mx-auto px-4 max-w-6xl">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="w-full h-64 rounded-sm" />
              ))}
            </div>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {testimonials.length > 0 ? (
                testimonials.map((t) => (
                  <motion.div
                    variants={fadeIn}
                    key={t.id}
                    whileHover={{ y: -6, boxShadow: "0 20px 60px rgba(0,0,0,0.12)" }}
                    transition={{ duration: 0.35, ease: EASE_OUT }}
                    className="bg-card/80 backdrop-blur-sm border border-border p-8 rounded-2xl shadow-sm relative flex flex-col group hover:border-primary/20 transition-all duration-300"
                  >
                    <div className="flex text-primary mb-5 gap-0.5">
                      {[...Array(t.rating || 5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>

                    <div className="absolute top-6 right-7 opacity-10 group-hover:opacity-20 transition-opacity">
                      <svg className="w-10 h-10 text-primary" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </div>

                    <p className="text-card-foreground leading-relaxed italic flex-1 mb-8 text-sm">
                      "{t.review}"
                    </p>

                    <div className="flex items-center gap-3 mt-auto pt-5 border-t border-border/50">
                      {t.imageUrl ? (
                        <img
                          src={t.imageUrl}
                          alt={t.clientName}
                          className="w-11 h-11 rounded-full object-cover border border-border"
                        />
                      ) : (
                        <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center text-primary font-serif text-lg border border-primary/20 shrink-0">
                          {t.clientName.charAt(0)}
                        </div>
                      )}
                      <div>
                        <h4 className="font-semibold text-sm text-card-foreground">{t.clientName}</h4>
                        {t.serviceType && (
                          <p className="text-xs text-muted-foreground uppercase tracking-wider mt-0.5">
                            {t.serviceType}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center py-24">
                  <p className="text-muted-foreground text-lg font-serif italic">
                    Reviews will appear here shortly.
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-secondary/20">
        <ScrollReveal className="container mx-auto px-4 text-center max-w-xl">
          <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-6">
            Ready to create your story?
          </h2>
          <Link href="/appointment">
            <motion.span
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="bg-primary text-primary-foreground px-10 py-4 text-xs uppercase tracking-widest font-medium inline-block rounded-xl cursor-pointer shadow-lg hover:shadow-xl hover:shadow-primary/20 transition-all duration-300"
            >
              Book Your Session
            </motion.span>
          </Link>
        </ScrollReveal>
      </section>
    </PageTransition>
  );
}
