import { useEffect } from "react";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { WhatsappButton } from "./whatsapp-button";
import { MobileCta } from "./mobile-cta";
import { useLocation } from "wouter";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="relative min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 w-full flex flex-col">
        {children}
      </main>
      <Footer />
      <WhatsappButton />
      <MobileCta />
    </div>
  );
}
