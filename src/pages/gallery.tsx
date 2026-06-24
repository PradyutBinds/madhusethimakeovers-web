import { useState } from "react";
import { PageTransition, fadeIn, staggerContainer, GoldDivider, ScrollReveal } from "../components/animations";
import { SEO } from "../components/seo";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { useListGalleryImages } from "@/lib/api-client";
import { Skeleton } from "@/components/ui/skeleton";
import { X, ZoomIn } from "lucide-react";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Gallery() {
  const [activeTab, setActiveTab] = useState("all");
  const { data: rawImages, isLoading } = useListGalleryImages(
    activeTab !== "all" ? { category: activeTab } : {}
  );
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxAlt, setLightboxAlt] = useState("");

  const images = Array.isArray(rawImages) ? rawImages : [];

  const categories = [
    { id: "all", label: "All" },
    { id: "bridal", label: "Bridal" },
    { id: "party", label: "Party Makeup" },
    { id: "hair", label: "Hair Styling" },
    { id: "transformations", label: "Transformations" },
  ];

  const openLightbox = (url: string, alt: string) => {
    setLightboxImage(url);
    setLightboxAlt(alt);
  };

  return (
    <PageTransition>
      <SEO
        title="Gallery | Madhu Sethi Makeovers"
        description="View our portfolio of bridal makeup, party makeup, hair styling, and beauty transformations."
      />

      {/* Header */}
      <section className="pt-32 pb-16 bg-secondary/20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground uppercase tracking-widest mb-6">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <span className="text-foreground">Gallery</span>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE_OUT }}
            className="text-4xl md:text-6xl font-serif text-foreground mb-4"
          >
            Portfolio
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

      <section className="py-20 bg-background min-h-[60vh]">
        <div className="container mx-auto px-4 max-w-7xl">

          {/* Category tabs */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className={`px-5 py-2 text-xs uppercase tracking-widest font-medium transition-all duration-300 rounded-xl border ${
                  activeTab === cat.id
                    ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                    : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {cat.label}
              </motion.button>
            ))}
          </div>

          {isLoading ? (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="break-inside-avoid">
                  <Skeleton className="w-full rounded-sm" style={{ height: `${180 + (i % 3) * 80}px` }} />
                </div>
              ))}
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0 }}
                className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5"
              >
                {images.length > 0 ? (
                  images.map((img, i) => (
                    <motion.div
                      variants={fadeIn}
                      key={img.id ?? i}
                      className="break-inside-avoid group cursor-pointer relative overflow-hidden rounded-2xl bg-muted shadow-sm hover:shadow-xl transition-shadow duration-500"
                      onClick={() => openLightbox(img.imageUrl, img.altText ?? "Gallery Image")}
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.3, ease: EASE_OUT }}
                    >
                      <img
                        src={img.imageUrl}
                        alt={img.altText ?? "Gallery Image"}
                        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 flex items-center justify-center">
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileHover={{ opacity: 1, scale: 1 }}
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                          <ZoomIn className="text-white w-8 h-8 drop-shadow-lg" />
                        </motion.div>
                      </div>
                      {img.category && (
                        <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-lg capitalize tracking-wide">
                            {img.category}
                          </span>
                        </div>
                      )}
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="col-span-full text-center py-24 w-full"
                  >
                    <div className="text-4xl mb-4 opacity-30">✦</div>
                    <p className="text-muted-foreground text-lg font-serif italic mb-2">
                      No images in this category yet.
                    </p>
                    <p className="text-sm text-muted-foreground/60">
                      Check back soon — new work is added regularly.
                    </p>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200] bg-black/96 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setLightboxImage(null)}
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-full p-2.5 backdrop-blur-sm"
              onClick={() => setLightboxImage(null)}
            >
              <X size={22} />
            </motion.button>
            <motion.img
              src={lightboxImage}
              alt={lightboxAlt}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.35, ease: EASE_OUT }}
              className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
