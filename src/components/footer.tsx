import { Link } from "wouter";
import { Instagram, MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white pt-20 pb-10 border-t-4 border-primary">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <span className="font-serif text-2xl text-white block">Madhu Sethi</span>
              <span className="text-primary text-sm uppercase tracking-[0.2em] font-medium">Makeovers</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-sm">
              Enhancing Beauty With Elegance & Perfection. A luxury destination for bridal transformations and high-end beauty services in Himachal Pradesh.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="https://instagram.com/madhusethimakeovers" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-colors"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-serif text-lg mb-6 text-white tracking-wide">Quick Links</h4>
            <ul className="space-y-4">
              {["Home", "About", "Services", "Gallery", "Testimonials", "Contact"].map((item) => (
                <li key={item}>
                  <Link href={item === "Home" ? "/" : `/${item.toLowerCase()}`}>
                    <span className="text-gray-400 hover:text-primary transition-colors text-sm cursor-pointer block">
                      {item}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif text-lg mb-6 text-white tracking-wide">Services</h4>
            <ul className="space-y-4">
              {["Bridal Makeup", "Party Makeup", "Hair Styling", "Beauty Services"].map((item) => (
                <li key={item}>
                  <Link href="/services">
                    <span className="text-gray-400 hover:text-primary transition-colors text-sm cursor-pointer block">
                      {item}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif text-lg mb-6 text-white tracking-wide">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
                <span className="leading-relaxed">Rajgarh Rd, Bajoral Khurd<br/>Solan, Himachal Pradesh 173212</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Phone size={18} className="text-primary shrink-0" />
                <span>+91 7018215015</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Mail size={18} className="text-primary shrink-0" />
                <span>contact@madhusethimakeovers.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} Madhu Sethi Makeovers. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/admin">
              <span className="text-gray-600 hover:text-gray-400 text-xs transition-colors cursor-pointer">Admin Login</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
