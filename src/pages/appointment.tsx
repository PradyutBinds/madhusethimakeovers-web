import { useCreateAppointment } from "@/lib/api-client";
import { PageTransition, fadeIn } from "../components/animations";
import { SEO } from "../components/seo";
import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";

const appointmentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
 phone: z.string().regex(/^\d{10}$/, "Enter a valid 10-digit phone number"),
  email: z.string().email("Invalid email address").or(z.literal("")),
  service: z.string().min(1, "Please select a service"),
  date: z.string().min(1, "Please select a date"),
  time: z.string().min(1, "Please select a time"),
  message: z.string().optional(),
});

export default function Appointment() {
  const [success, setSuccess] = useState(false);
  const services = [
    { id: 1, name: "Bridal Makeup" },
    { id: 2, name: "Party Makeup" },
    { id: 3, name: "Hair Styling" },
  ];
  const createAppointment = useCreateAppointment();
  
  // Extract service from URL if passed
  const [locationStr] = useLocation();
  const urlParams = new URLSearchParams(window.location.search);
  const defaultService = urlParams.get("service") || "";

  const form = useForm<z.infer<typeof appointmentSchema>>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: { name: "", phone: "", email: "", service: defaultService, date: "", time: "", message: "" }
  });

 const onSubmit = (data: z.infer<typeof appointmentSchema>) => {
  createAppointment.mutate(
    { data },
    {
      onSuccess: () => {
        setSuccess(true);
        window.scrollTo(0, 0);
      },
      onError: () => {
        toast.error("Failed to book appointment. Please try again or call us.");
      },
    }
  );
};

  if (success) {
    return (
      <PageTransition>
        <section className="min-h-screen pt-32 pb-16 bg-background flex flex-col items-center justify-center">
          <div className="container mx-auto px-4 max-w-2xl text-center">
            <div className="w-24 h-24 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-8">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-6">Booking Confirmed</h1>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10">
              Thank you for choosing Madhu Sethi Makeovers. Your appointment request has been received. Our team will contact you shortly to confirm the details.
            </p>
            <Link href="/">
              <span className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-sm uppercase tracking-widest font-medium transition-all duration-300 inline-block shadow-lg cursor-pointer rounded-xl">
                Return to Home
              </span>
            </Link>
          </div>
        </section>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <SEO 
        title="Book Appointment | Madhu Sethi Makeovers" 
        description="Schedule your luxury makeup session at Madhu Sethi Makeovers in Solan."
      />
      
      <section className="pt-32 pb-16 bg-secondary/20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground uppercase tracking-widest mb-6">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <span className="text-foreground">Book</span>
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-serif text-foreground mb-4"
          >
            Reserve Your Session
          </motion.h1>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card border border-border p-8 md:p-12 rounded-xl shadow-2xl"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                
                <div className="space-y-6">
                  <h3 className="font-serif text-2xl text-foreground border-b border-border pb-4">Personal Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="name" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="uppercase tracking-widest text-xs font-medium text-muted-foreground">Full Name *</FormLabel>
                        <FormControl><Input placeholder="Jane Doe" className="h-12 rounded-xl" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="phone" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="uppercase tracking-widest text-xs font-medium text-muted-foreground">Phone Number *</FormLabel>
                        <FormControl><Input placeholder="+91 XXXXX XXXXX" className="h-12 rounded-xl" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase tracking-widest text-xs font-medium text-muted-foreground">Email Address</FormLabel>
                      <FormControl><Input type="email" placeholder="jane@example.com (Optional)" className="h-12 rounded-xl" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>

                <div className="space-y-6 pt-6">
                  <h3 className="font-serif text-2xl text-foreground border-b border-border pb-4">Appointment Details</h3>
                  <FormField control={form.control} name="service" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase tracking-widest text-xs font-medium text-muted-foreground">Service Required *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-12 rounded-xl">
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {services.map((s) => (
                            <SelectItem key={s.id} value={s.name}>
                              {s.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="date" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="uppercase tracking-widest text-xs font-medium text-muted-foreground">Preferred Date *</FormLabel>
                        <FormControl><Input type="date" className="h-12 rounded-xl" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="time" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="uppercase tracking-widest text-xs font-medium text-muted-foreground">Preferred Time *</FormLabel>
                        <FormControl><Input type="time" className="h-12 rounded-xl" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                  
                  <FormField control={form.control} name="message" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase tracking-widest text-xs font-medium text-muted-foreground">Additional Notes</FormLabel>
                      <FormControl><Textarea placeholder="Any specific requirements or questions..." className="min-h-[100px] rounded-xl" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>

                <div className="pt-6">
                  <Button type="submit" className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground uppercase tracking-widest font-medium rounded-xl" disabled={createAppointment.isPending}>
                    {createAppointment.isPending ? "Processing..." : "Confirm Booking Request"}
                  </Button>
                </div>
              </form>
            </Form>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
