import { PageTransition, fadeIn, staggerContainer } from "../components/animations";
import { SEO } from "../components/seo";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateMessage } from "@/lib/api-client";
import { toast } from "sonner";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function Contact() {
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", subject: "", message: "" }
  });

  const createMessage = useCreateMessage();

  const onSubmit = (data: z.infer<typeof contactSchema>) => {
    createMessage.mutate({ data }, {
      onSuccess: () => {
        toast.success("Message sent successfully. We will get back to you soon.");
        form.reset();
      },
      onError: () => {
        toast.error("Failed to send message. Please try again.");
      }
    });
  };

  return (
    <PageTransition>
      <SEO 
        title="Contact | Madhu Sethi Makeovers" 
        description="Get in touch to book your luxury makeover session."
      />
      
      <section className="pt-32 pb-16 bg-secondary/20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground uppercase tracking-widest mb-6">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <span className="text-foreground">Contact</span>
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-serif text-foreground mb-4"
          >
            Get In Touch
          </motion.h1>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Contact Info */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-primary uppercase tracking-[0.2em] text-sm font-medium mb-4 block">Reach Out</span>
              <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-8">We'd love to hear from you.</h2>
              <p className="text-muted-foreground leading-relaxed mb-12">
                Whether you have a question about our services, pricing, or want to check availability for your wedding date, our team is ready to answer all your questions.
              </p>

              <div className="space-y-8 mb-12">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary flex items-center justify-center rounded-xl text-primary shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1 uppercase tracking-wider text-sm">Studio Location</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">Rajgarh Rd, Bajoral Khurd<br/>Solan, Himachal Pradesh 173212</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary flex items-center justify-center rounded-xl text-primary shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1 uppercase tracking-wider text-sm">Phone</h4>
                    <p className="text-muted-foreground text-sm">+91 7018215015</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary flex items-center justify-center rounded-xl text-primary shrink-0">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1 uppercase tracking-wider text-sm">Working Hours</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">Mon - Sun: 10:00 AM - 7:00 PM<br/>By Appointment Only</p>
                  </div>
                </div>
              </div>

            </motion.div>

            {/* Form */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-card border border-border p-8 md:p-10 rounded-2xl shadow-xl"
            >
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="uppercase tracking-widest text-xs font-medium text-muted-foreground">Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Jane Doe" className="bg-background border-border rounded-xl h-12" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="uppercase tracking-widest text-xs font-medium text-muted-foreground">Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="+91 XXXXX XXXXX" className="bg-background border-border rounded-xl h-12" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="uppercase tracking-widest text-xs font-medium text-muted-foreground">Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="jane@example.com" className="bg-background border-border rounded-xl h-12" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="uppercase tracking-widest text-xs font-medium text-muted-foreground">Subject</FormLabel>
                        <FormControl>
                          <Input placeholder="Bridal Makeup Inquiry" className="bg-background border-border rounded-xl h-12" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="uppercase tracking-widest text-xs font-medium text-muted-foreground">Message</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Tell us about your requirements..." className="bg-background border-border rounded-xl min-h-[120px]" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground uppercase tracking-widest font-medium rounded-xl"
                    disabled={createMessage.isPending}
                  >
                    {createMessage.isPending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="h-[400px] w-full bg-muted grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-1000">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m3!1d13735.6322301077!2d77.0863004!3d30.9045331!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390f86d8b9d883b3%3A0x1d4d5d3b6f2b4e8e!2sBajoral%20Khurd%2C%20Solan%2C%20Himachal%20Pradesh!5e0!3m2!1sen!2sin!4v1689000000000!5m2!1sen!2sin" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Madhu Sethi Makeovers Location"
        />
      </section>
    </PageTransition>
  );
}
