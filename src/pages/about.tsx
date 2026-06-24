import { PageTransition, fadeIn, fadeInLeft, fadeInRight, staggerContainer, ScrollReveal, StaggerReveal, GoldDivider } from "../components/animations";
import { SEO } from "../components/seo";
import { motion } from "framer-motion";
import { Link } from "wouter";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function About() {
  return (
    <PageTransition>
      <SEO
        title="About | Madhu Sethi Makeovers"
        description="Learn about Madhu Sethi, a premier luxury makeup artist in Solan, Himachal Pradesh with 10+ years of experience."
      />

      {/* Header */}
      <section className="pt-32 pb-16 bg-secondary/20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground uppercase tracking-widest mb-6">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <span className="text-foreground">About</span>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE_OUT }}
            className="text-4xl md:text-6xl font-serif text-foreground mb-4"
          >
            Our Story
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

      {/* Main Story */}
      <section className="py-28 bg-background overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

            <ScrollReveal variants={fadeInLeft} className="w-full lg:w-1/2">
              <div className="relative aspect-[3/4] max-w-md mx-auto rounded-2xl overflow-hidden shadow-2xl">
                <motion.img
                  src="/assets/images/makeup-application.png"
                  alt="Madhu Sethi"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.7, ease: EASE_OUT }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </ScrollReveal>

            <ScrollReveal variants={fadeInRight} className="w-full lg:w-1/2">
              <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
                <motion.span variants={fadeIn} className="text-primary uppercase tracking-[0.2em] text-xs font-medium block">
                  The Artist
                </motion.span>
                <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-serif text-foreground leading-tight">
                  Crafting perfection, <br />
                  <span className="italic text-primary">one face at a time.</span>
                </motion.h2>
                <motion.p variants={fadeIn} className="text-muted-foreground leading-relaxed">
                  Madhu Sethi is a distinguished makeup artist based in Solan, Himachal Pradesh. With over a decade
                  of experience in luxury beauty, she has established herself as the trusted name for brides seeking
                  elegance, sophistication, and flawless execution.
                </motion.p>
                <motion.p variants={fadeIn} className="text-muted-foreground leading-relaxed">
                  Her philosophy centers on enhancing natural features rather than masking them. Every stroke, every
                  shade, and every highlight is meticulously planned to complement your unique bone structure and skin tone.
                </motion.p>

                <motion.div variants={fadeIn} className="pt-6 grid grid-cols-2 gap-6 border-t border-border">
                  {[
                    { value: "10+", label: "Years Experience" },
                    { value: "500+", label: "Happy Brides" },
                    { value: "Premium", label: "Products Only" },
                    { value: "100%", label: "Personalised" },
                  ].map((stat, i) => (
                    <div key={i}>
                      <h4 className="font-serif text-2xl text-foreground mb-1">{stat.value}</h4>
                      <p className="text-xs text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-28 bg-foreground text-background overflow-hidden">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <ScrollReveal>
            <span className="text-primary uppercase tracking-[0.2em] text-xs font-medium mb-4 block">Our Values</span>
            <h2 className="text-4xl font-serif mb-4 text-white">The Pillars of Our Studio</h2>
            <GoldDivider className="mt-8" />
          </ScrollReveal>

          <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
            {[
              {
                num: "01",
                title: "Excellence",
                desc: "We compromise on nothing. From our tools to our techniques, every element meets the highest standard.",
              },
              {
                num: "02",
                title: "Personalisation",
                desc: "No two faces are alike. Every look is custom-tailored to reflect your individual style and personality.",
              },
              {
                num: "03",
                title: "Integrity",
                desc: "We maintain the highest standards of hygiene, transparency, and professional care for every client.",
              },
            ].map((value, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.35, ease: EASE_OUT }}
                className="space-y-4 group"
              >
                <div className="font-serif text-5xl text-primary/30 group-hover:text-primary/60 transition-colors duration-500 mb-4">
                  {value.num}
                </div>
                <h3 className="text-xl font-serif text-white">{value.title}</h3>
                <p className="text-white/55 leading-relaxed text-sm group-hover:text-white/75 transition-colors duration-300">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* Timeline / Experience */}
      <section className="py-28 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <ScrollReveal className="text-center mb-16">
            <span className="text-primary uppercase tracking-[0.2em] text-xs font-medium mb-4 block">Journey</span>
            <h2 className="text-4xl font-serif text-foreground mb-4">A Decade of Mastery</h2>
            <GoldDivider className="mt-8" />
          </ScrollReveal>

          <StaggerReveal className="relative space-y-0">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />
            {[
              { year: "2014", title: "The Beginning", desc: "Started as a freelance makeup artist serving local clients in Solan." },
              { year: "2017", title: "Studio Opens", desc: "Opened Madhu Sethi Makeovers as a dedicated luxury beauty studio." },
              { year: "2019", title: "Bridal Specialisation", desc: "Focused exclusively on luxury bridal transformations across HP." },
              { year: "2022", title: "500+ Brides", desc: "Crossed the milestone of 500 bridal transformations with 4.9 star average." },
              { year: "2024", title: "Today", desc: "Solan's premier destination for luxury bridal and occasion makeup." },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                className={`relative flex items-start gap-6 md:gap-0 pb-12 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                {/* Line dot */}
                <div className="relative z-10 flex-shrink-0 w-8 h-8 md:absolute md:left-1/2 md:-translate-x-1/2 md:top-2">
                  <div className="w-8 h-8 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                  </div>
                </div>
                {/* Content */}
                <div className={`flex-1 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16 md:ml-auto md:text-left"} pl-0 md:pl-0`}>
                  <span className="text-xs uppercase tracking-widest text-primary font-medium mb-1 block">{item.year}</span>
                  <h3 className="font-serif text-xl text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-secondary/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-8">
          <img src="/assets/images/studio-interior.png" className="w-full h-full object-cover" alt="" aria-hidden="true" />
        </div>
        <ScrollReveal className="container mx-auto px-4 relative z-10 text-center max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-8 leading-tight">
            Ready to discover <br />
            <span className="italic text-primary">your best look?</span>
          </h2>
          <Link href="/appointment">
            <motion.span
              whileHover={{ scale: 1.04, boxShadow: "0 8px 32px rgba(201,169,110,0.3)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.3 }}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-5 text-xs uppercase tracking-widest font-medium transition-all duration-300 inline-block shadow-lg hover:shadow-xl hover:shadow-primary/20 cursor-pointer rounded-xl"
            >
              Book a Consultation
            </motion.span>
          </Link>
        </ScrollReveal>
      </section>
    </PageTransition>
  );
}
