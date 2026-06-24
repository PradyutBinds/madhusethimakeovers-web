import { MessageCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function WhatsappButton() {
  return (
    <div className="fixed bottom-24 md:bottom-8 right-6 z-50">
      <Tooltip>
        <TooltipTrigger asChild>
          <a
            href="https://wa.me/917018215015"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:scale-110 transition-transform duration-300 hover:shadow-xl"
            aria-label="Chat on WhatsApp"
          >
            <MessageCircle size={28} />
          </a>
        </TooltipTrigger>
        <TooltipContent side="left" className="font-medium bg-foreground text-background border-none px-3 py-1.5">
          <p>Chat on WhatsApp</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
