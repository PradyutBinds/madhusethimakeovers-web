import { useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  PageTransition,
  fadeIn,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  staggerContainer,
  ScrollReveal,
  StaggerReveal,
  AnimatedNumber,
  HoverCard,
  GoldDivider,
} from "../components/animations";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const heroContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18, delayChildren: 0.2 },
  },
};

const heroItem = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: EASE_OUT },
  },
};

export default function Home() {
  useEffect(() => {
    document.title = "Madhu Sethi Makeovers | Luxury Bridal Makeup Artist in Solan";
  }, []);

  return (
    <PageTransition className="pb-24">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.img
            src="/assets/images/hero-bridal.png"
            alt="Luxury Bridal Makeup"
            className="w-full h-full object-cover object-center"
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.8, ease: EASE_OUT }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/60" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={heroContainer}
            className="flex flex-col items-center"
          >
            <motion.span
              variants={heroItem}
              className="block text-primary uppercase tracking-[0.35em] text-xs md:text-sm font-medium mb-8 opacity-90"
            >
              Solan's Premier Makeup Studio
            </motion.span>

            <motion.h1
              variants={heroItem}
              className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-3 leading-tight drop-shadow-lg"
            >
              Madhu Sethi
            </motion.h1>

            <motion.div variants={heroItem} className="flex items-center gap-4 mb-6">
              <div className="h-px w-12 bg-primary/70" />
              <span className="text-3xl md:text-5xl lg:text-6xl font-serif italic text-primary/90">
                Makeovers
              </span>
              <div className="h-px w-12 bg-primary/70" />
            </motion.div>

            <motion.p
              variants={heroItem}
              className="text-base md:text-lg text-white/85 mb-12 font-light max-w-xl mx-auto tracking-wide leading-relaxed"
            >
              Enhancing Beauty With Elegance &amp; Perfection
            </motion.p>

            <motion.div
              variants={heroItem}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5"
            >
              <Link href="/appointment">
                <motion.span
                  whileHover={{ scale: 1.04, boxShadow: "0 12px 40px rgba(201,169,110,0.45)" }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.3 }}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-4 text-xs uppercase tracking-widest font-medium transition-all duration-300 min-w-[210px] text-center rounded-xl inline-block shadow-2xl shadow-primary/30 cursor-pointer"
                >
                  Book Appointment
                </motion.span>
              </Link>
              <Link href="/services">
                <motion.span
                  whileHover={{ scale: 1.04, backgroundColor: "rgba(255,255,255,0.2)" }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-10 py-4 text-xs uppercase tracking-widest font-medium transition-all duration-300 min-w-[210px] text-center rounded-xl inline-block cursor-pointer hover:border-white/50"
                >
                  Explore Services
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
        >
          <motion.div
            className="w-px h-12 bg-white/40"
            animate={{ scaleY: [1, 0.4, 1] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          />
          <span className="text-white/50 text-xs uppercase tracking-widest">Scroll</span>
        </motion.div>
      </section>

      {/* ── Stats ────────────────────────────────────────────── */}
      <section className="py-20 bg-background border-b border-border">
        <div className="container mx-auto px-4">
          <StaggerReveal className="grid grid-cols-2 md:grid-cols-4 gap-8 md:divide-x md:divide-border/60">
            {[
              { raw: 10, suffix: "+", label: "Years Experience" },
              { raw: 500, suffix: "+", label: "Happy Brides" },
              { raw: 1000, suffix: "+", label: "Transformations" },
              { raw: 4, suffix: ".9★", label: "Star Rating" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                variants={scaleIn}
                className="flex flex-col items-center justify-center space-y-2 px-4"
              >
                <span className="text-4xl md:text-5xl font-serif text-primary">
                  <AnimatedNumber value={stat.raw} suffix={stat.suffix} />
                </span>
                <span className="text-xs md:text-sm uppercase tracking-widest text-muted-foreground text-center">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ── About Preview ─────────────────────────────────────── */}
      <section className="py-28 bg-background overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

            <ScrollReveal variants={fadeInLeft} className="w-full lg:w-1/2">
              <div className="relative aspect-[3/4] max-w-md mx-auto">
                <motion.img
                  src="/assets/images/makeup-application.png"
                  alt="Madhu Sethi applying makeup"
                  className="w-full h-full object-cover rounded-2xl shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.6, ease: EASE_OUT }}
                />
                <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-secondary -z-10 rounded-2xl" />
                <div className="absolute -top-6 -left-6 w-full h-full border border-primary/25 -z-10 rounded-2xl" />
              </div>
            </ScrollReveal>

            <ScrollReveal variants={fadeInRight} className="w-full lg:w-1/2 max-w-xl">
              <span className="text-primary uppercase tracking-[0.2em] text-xs font-medium mb-5 block">
                The Art of Beauty
              </span>
              <h2 className="text-4xl md:text-5xl font-serif mb-8 text-foreground leading-tight">
                Where luxury meets{" "}
                <span className="italic text-primary">perfection.</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-5">
                Located in the heart of Solan, Madhu Sethi Makeovers is a sanctuary of refined beauty.
                With over a decade of experience, we specialize in creating breathtaking bridal
                transformations that feel both timeless and contemporary.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-10">
                Every face is a unique canvas, and our philosophy is simple: enhance your natural beauty
                with premium products, flawless techniques, and an unwavering attention to detail.
              </p>
              <Link href="/about">
                <motion.span
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.25 }}
                  className="inline-flex items-center gap-2 border-b border-foreground pb-1 uppercase tracking-widest text-sm font-medium hover:text-primary hover:border-primary transition-colors cursor-pointer"
                >
                  Discover Our Story
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.span>
              </Link>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* ── Why Choose Us ─────────────────────────────────────── */}
      <section className="py-24 bg-secondary/20">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <ScrollReveal>
            <span className="text-primary uppercase tracking-[0.2em] text-xs font-medium mb-4 block">
              Why Choose Us
            </span>
            <h2 className="text-4xl md:text-5xl font-serif mb-4 text-foreground">
              The Difference Is In the Details
            </h2>
          </ScrollReveal>
          <GoldDivider className="my-8" />
          <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              {
                title: "10+ Years of Mastery",
                desc: "Over a decade perfecting the craft of luxury makeup artistry for brides across Himachal Pradesh.",
                icon: "✦",
              },
              {
                title: "Premium Products Only",
                desc: "We use only the finest HD, long-wear formulations — your look holds flawlessly from morning to midnight.",
                icon: "✦",
              },
              {
                title: "Personalised Consultations",
                desc: "Every client receives a dedicated consultation so your final look is uniquely, perfectly yours.",
                icon: "✦",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                whileHover={{ y: -6, boxShadow: "0 20px 60px rgba(0,0,0,0.08)" }}
                transition={{ duration: 0.35, ease: EASE_OUT }}
                className="bg-background border border-border rounded-2xl p-8 text-left shadow-sm"
              >
                <span className="text-primary text-lg mb-5 block">{item.icon}</span>
                <h3 className="font-serif text-xl mb-3 text-foreground">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ── Featured Services ──────────────────────────────────── */}
      <section className="py-28 bg-background">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <span className="text-primary uppercase tracking-[0.2em] text-xs font-medium mb-4 block">
              Signature Services
            </span>
            <h2 className="text-4xl md:text-5xl font-serif mb-4 text-foreground">Our Expertise</h2>
          </ScrollReveal>
          <GoldDivider className="my-8" />

          <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              {
                title: "Bridal Makeup",
                image: "/assets/images/bride-transformation.png",
                desc: "Flawless, long-lasting luxury bridal makeovers that photograph beautifully.",
              },
              {
                title: "Party Makeup",
                image: "/assets/images/party-makeup.png",
                desc: "Glamorous, camera-ready looks for weddings, receptions, and festive events.",
              },
              {
                title: "Hair Styling",
                image: "/assets/images/hair-styling.png",
                desc: "Elegant updos, intricate braids, and contemporary styles for every occasion.",
              },
            ].map((service, i) => (
              <motion.div key={i} variants={scaleIn}>
                <Link href="/services">
                  <motion.div
                    className="group cursor-pointer"
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.35, ease: EASE_OUT }}
                  >
                    <div className="relative aspect-[4/5] overflow-hidden mb-5 rounded-2xl shadow-md">
                      <motion.img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.06 }}
                        transition={{ duration: 0.7, ease: EASE_OUT }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent group-hover:from-black/20 transition-all duration-500" />
                      <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-400">
                        <span className="text-white text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          View Services
                        </span>
                      </div>
                    </div>
                    <h3 className="text-2xl font-serif mb-2 group-hover:text-primary transition-colors duration-300 text-left">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-sm text-left leading-relaxed">{service.desc}</p>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </StaggerReveal>

          <ScrollReveal delay={0.2} className="mt-16">
            <Link href="/services">
              <motion.span
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="bg-foreground text-background hover:bg-foreground/90 px-10 py-4 text-xs uppercase tracking-widest font-medium transition-all duration-300 inline-block rounded-xl cursor-pointer shadow-lg hover:shadow-xl"
              >
                View All Services
              </motion.span>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Testimonials Preview ───────────────────────────────── */}
      <section className="py-28 bg-secondary/20">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <ScrollReveal>
            <span className="text-primary uppercase tracking-[0.2em] text-xs font-medium mb-4 block">
              Client Love
            </span>
            <h2 className="text-4xl md:text-5xl font-serif mb-4 text-foreground">Words of Praise</h2>
          </ScrollReveal>
          <GoldDivider className="my-8" />

          <ScrollReveal delay={0.15} className="mt-8">
            <motion.div
              whileHover={{ y: -4, boxShadow: "0 24px 64px rgba(0,0,0,0.12)" }}
              transition={{ duration: 0.4, ease: EASE_OUT }}
              className="bg-card border border-border p-10 md:p-16 rounded-2xl shadow-lg relative backdrop-blur-sm"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background p-3 rounded-full border border-border/50 shadow-sm">
                <svg className="w-7 h-7 text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-xl md:text-2xl font-serif leading-relaxed italic mb-8 text-foreground">
                "Madhu made me feel like an absolute queen on my wedding day. The makeup was flawless,
                lasted all night, and looked stunning in photos. Her attention to detail is unmatched."
              </p>
              <div className="flex items-center justify-center gap-1 mb-4 text-primary">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="uppercase tracking-wider text-xs font-semibold text-muted-foreground">
                — Priya Sharma, Bridal Makeup
              </p>
            </motion.div>
          </ScrollReveal>

          <ScrollReveal delay={0.25} className="mt-10">
            <Link href="/testimonials">
              <motion.span
                whileHover={{ x: 3 }}
                transition={{ duration: 0.2 }}
                className="text-sm uppercase tracking-widest font-medium text-muted-foreground hover:text-primary transition-colors cursor-pointer border-b border-transparent hover:border-primary pb-1 inline-block"
              >
                Read All Reviews
              </motion.span>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────── */}
      <section className="py-28 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <ScrollReveal className="text-center mb-14">
            <span className="text-primary uppercase tracking-[0.2em] text-xs font-medium mb-4 block">
              Common Questions
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-foreground">
              Frequently Asked
            </h2>
            <GoldDivider className="mt-8" />
          </ScrollReveal>
          <StaggerReveal className="space-y-4">
            {[
              {
                q: "Do you offer a bridal trial session?",
                a: "Yes — every bridal package includes a complimentary trial session so you can preview your look and make adjustments before the wedding day.",
              },
              {
                q: "What areas do you serve?",
                a: "Our studio is located in Solan, Himachal Pradesh. We serve Solan and nearby areas including Shimla, Kasauli, Dharampur, and Parwanoo. For destinations further afield, travel packages can be arranged.",
              },
              {
                q: "How far in advance should I book for bridal makeup?",
                a: "We recommend booking at least 3–6 months in advance, especially for peak wedding season (Oct–Feb). Popular dates fill up quickly.",
              },
              {
                q: "What makeup products do you use?",
                a: "We exclusively use premium international and Indian professional brands known for longevity and skin compatibility — MAC, Huda Beauty, Charlotte Tilbury, and others.",
              },
              {
                q: "Do you provide services at home or the wedding venue?",
                a: "Yes. We offer both in-studio services and on-location services at your home or wedding venue. Travel charges may apply based on distance.",
              },
            ].map((item, i) => (
              <FaqItem key={i} question={item.q} answer={item.a} />
            ))}
          </StaggerReveal>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: [
                  { "@type": "Question", name: "Do you offer a bridal trial session?", acceptedAnswer: { "@type": "Answer", text: "Yes — every bridal package includes a complimentary trial session." } },
                  { "@type": "Question", name: "What areas do you serve?", acceptedAnswer: { "@type": "Answer", text: "Our studio is in Solan, HP. We serve Solan and nearby areas." } },
                ],
              }),
            }}
          />
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────── */}
      <section className="relative py-36 bg-foreground text-background overflow-hidden text-center">
        <div className="absolute inset-0 z-0 opacity-15">
          <img
            src="/assets/images/beauty-products.png"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
          />
        </div>
        <ScrollReveal className="container relative z-10 mx-auto px-4 max-w-3xl">
          <h2 className="text-4xl md:text-6xl font-serif mb-8 text-white leading-tight">
            Ready for your <br className="hidden md:block" />
            <span className="italic text-primary">transformation?</span>
          </h2>
          <p className="text-base text-white/75 mb-12 max-w-lg mx-auto leading-relaxed">
            Book your appointment today and let us create the perfect look for your special occasion.
          </p>
          <Link href="/appointment">
            <motion.span
              whileHover={{ scale: 1.04, boxShadow: "0 12px 48px rgba(201,169,110,0.5)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.3, ease: EASE_OUT }}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-5 text-xs uppercase tracking-widest font-medium transition-all duration-300 inline-block shadow-2xl cursor-pointer rounded-xl"
            >
              Book Your Session
            </motion.span>
          </Link>
        </ScrollReveal>
      </section>

    </PageTransition>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
  return (
    <motion.details
      variants={fadeIn}
      className="group border border-border rounded-xl bg-card overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <summary className="flex items-center justify-between px-6 py-5 cursor-pointer select-none list-none font-medium text-foreground hover:text-primary transition-colors">
        {question}
        <span className="ml-4 shrink-0 text-primary transition-transform duration-300 group-open:rotate-45">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
          </svg>
        </span>
      </summary>
      <motion.div
        initial={false}
        className="px-6 pb-5 text-muted-foreground text-sm leading-relaxed"
      >
        {answer}
      </motion.div>
    </motion.details>
  );
}
