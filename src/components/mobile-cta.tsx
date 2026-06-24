import { Link } from "wouter";
import { Calendar } from "lucide-react";

export function MobileCta() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full z-40 bg-background border-t border-border shadow-[0_-4px_10px_rgba(0,0,0,0.05)] p-3">
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Call Us</span>
          <a href="tel:+917018215015" className="text-sm font-semibold text-foreground">+91 7018215015</a>
        </div>
        <Link href="/appointment">
          <span className="flex-1 bg-primary text-primary-foreground h-12 flex items-center justify-center rounded-sm font-medium uppercase tracking-wide text-xs gap-2 shadow-md">
            <Calendar size={16} />
            Book Now
          </span>
        </Link>
      </div>
    </div>
  );
}
