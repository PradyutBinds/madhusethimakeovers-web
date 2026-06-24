import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import {
  useGetDashboardStats, getGetDashboardStatsQueryKey,
  useListAppointments, getListAppointmentsQueryKey, useUpdateAppointment, useDeleteAppointment,
  useListMessages, getListMessagesQueryKey, useUpdateMessage, useDeleteMessage,
  useListServices, getListServicesQueryKey, useCreateService, useUpdateService, useDeleteService,
  useListTestimonials, getListTestimonialsQueryKey, useCreateTestimonial, useUpdateTestimonial, useDeleteTestimonial,
  useListGalleryImages, getListGalleryImagesQueryKey, useCreateGalleryImage, useDeleteGalleryImage,
} from "@/lib/api-client";
import { SEO } from "../components/seo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";

// ─── Auth Gate ────────────────────────────────────────────────────────────────
export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("msm_admin_auth") === "true") setIsAuthenticated(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "Madhu@2026") {
      localStorage.setItem("msm_admin_auth", "true");
      setIsAuthenticated(true);
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  const logout = () => {
    localStorage.removeItem("msm_admin_auth");
    setIsAuthenticated(false);
    setPassword("");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <SEO title="Admin Login | Madhu Sethi Makeovers" />
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          onSubmit={handleLogin}
          className="w-full max-w-sm bg-card border border-border shadow-2xl rounded-2xl p-10 text-center space-y-6"
        >
          <div>
            <div className="w-14 h-14 rounded-full border-2 border-primary/40 flex items-center justify-center font-serif text-2xl text-primary mx-auto mb-4 shadow-lg shadow-primary/10">M</div>
            <h1 className="font-serif text-2xl text-foreground">Admin Portal</h1>
            <p className="text-xs text-muted-foreground mt-1 tracking-wide uppercase">Madhu Sethi Makeovers</p>
          </div>
          <div className="space-y-3 text-left">
            <Input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(""); }}
              className="rounded-xl h-11"
              autoFocus
            />
            {error && <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-red-500">{error}</motion.p>}
          </div>
          <Button type="submit" className="w-full rounded-xl tracking-wide uppercase text-sm h-11">
            Sign In
          </Button>
        </motion.form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-28 pb-20">
      <SEO title="Admin Dashboard | Madhu Sethi Makeovers" />
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex justify-between items-center mb-10 border-b border-border pb-6">
          <div>
            <h1 className="text-3xl font-serif text-foreground">Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage appointments, messages, and studio content</p>
          </div>
          <Button variant="outline" onClick={logout} size="sm" className="rounded-xl text-xs uppercase tracking-wide hover:scale-105 transition-all duration-300">
            Logout
          </Button>
        </div>
        <AdminDashboard />
      </div>
    </div>
  );
}

// ─── Status Badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    pending: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
    confirmed: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
    completed: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300",
    cancelled: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300",
  };
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${map[status] ?? "bg-muted text-muted-foreground"}`}>
      {status}
    </span>
  );
}

// ─── Confirm Delete Button ────────────────────────────────────────────────────
function DeleteButton({ onDelete, label = "Delete" }: { onDelete: () => void; label?: string }) {
  const [confirming, setConfirming] = useState(false);
  if (confirming) {
    return (
      <span className="flex gap-1">
        <Button size="sm" variant="destructive" className="h-7 px-2 text-xs rounded-lg" onClick={() => { onDelete(); setConfirming(false); }}>
          Confirm
        </Button>
        <Button size="sm" variant="ghost" className="h-7 px-2 text-xs rounded-lg" onClick={() => setConfirming(false)}>
          Cancel
        </Button>
      </span>
    );
  }
  return (
    <Button size="sm" variant="ghost" className="h-7 px-2 text-xs text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg" onClick={() => setConfirming(true)}>
      {label}
    </Button>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
function AdminDashboard() {
  const { data: stats, isLoading: statsLoading } = useGetDashboardStats();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-8"
    >
      {/* Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: "Total Bookings", value: stats?.totalAppointments ?? "—", icon: "📋" },
          { label: "Pending", value: stats?.pendingAppointments ?? "—", accent: true, icon: "⏳" },
          { label: "Confirmed", value: stats?.confirmedAppointments ?? "—", icon: "✓" },
          { label: "Completed", value: stats?.completedAppointments ?? "—", icon: "✦" },
          { label: "Messages", value: stats?.totalMessages ?? "—", icon: "✉" },
          { label: "Unread", value: stats?.unreadMessages ?? "—", accent: true, icon: "●" },
        ].map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -3, boxShadow: "0 8px 30px rgba(0,0,0,0.08)" }}
            className="bg-card border border-border rounded-xl p-5 text-center shadow-sm transition-all duration-300"
          >
            {statsLoading ? (
              <div className="h-8 w-12 bg-muted animate-pulse rounded-lg mx-auto mb-2" />
            ) : (
              <div className={`text-3xl font-serif mb-1 ${s.accent ? "text-primary" : "text-foreground"}`}>{s.value}</div>
            )}
            <p className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="appointments" className="w-full">
        <TabsList className="border-b border-border bg-transparent rounded-none h-auto p-0 w-full justify-start gap-0 flex-wrap">
          {["appointments", "messages", "services", "testimonials", "gallery"].map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className="rounded-none px-5 py-3.5 text-sm capitalize data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none tracking-wide transition-all duration-300 hover:text-primary"
            >
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="appointments" className="pt-6"><AppointmentsTab /></TabsContent>
        <TabsContent value="messages" className="pt-6"><MessagesTab /></TabsContent>
        <TabsContent value="services" className="pt-6"><ServicesTab /></TabsContent>
        <TabsContent value="testimonials" className="pt-6"><TestimonialsTab /></TabsContent>
        <TabsContent value="gallery" className="pt-6"><GalleryTab /></TabsContent>
      </Tabs>
    </motion.div>
  );
}

// ─── Appointments Tab ─────────────────────────────────────────────────────────
function AppointmentsTab() {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const qc = useQueryClient();

  const params = statusFilter !== "all" ? { status: statusFilter as "pending" | "confirmed" | "completed" | "cancelled" } : {};
  const { data, isLoading } = useListAppointments(params);
  const updateMut = useUpdateAppointment();
  const deleteMut = useDeleteAppointment();

  const appointments = data?.data ?? [];

  const handleStatusChange = (id: number, status: string) => {
    updateMut.mutate(
      { id, data: { status: status as "pending" | "confirmed" | "completed" | "cancelled" } },
      {
        onSuccess: () => {
          toast.success("Status updated");
          qc.invalidateQueries({ queryKey: getListAppointmentsQueryKey() });
          qc.invalidateQueries({ queryKey: getGetDashboardStatsQueryKey() });
        },
        onError: () => toast.error("Failed to update status"),
      }
    );
  };

  const handleDelete = (id: number) => {
    deleteMut.mutate(
      { id },
      {
        onSuccess: () => {
          toast.success("Appointment deleted");
          qc.invalidateQueries({ queryKey: getListAppointmentsQueryKey() });
          qc.invalidateQueries({ queryKey: getGetDashboardStatsQueryKey() });
        },
        onError: () => toast.error("Failed to delete"),
      }
    );
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="bg-card border border-border rounded-xl shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 border-b border-border">
        <h2 className="font-serif text-xl text-foreground">Appointments</h2>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40 rounded-xl h-9 text-xs">
            <SelectValue placeholder="Filter status" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="p-8 space-y-3">
          {[...Array(4)].map((_, i) => <div key={i} className="h-12 bg-muted animate-pulse rounded-lg" />)}
        </div>
      ) : appointments.length === 0 ? (
        <div className="p-16 text-center text-muted-foreground">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}>
            <p className="text-5xl mb-4 opacity-40">📋</p>
            <p className="font-serif text-lg">No appointments found</p>
            <p className="text-sm mt-1">New bookings will appear here.</p>
          </motion.div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-4 py-3 font-medium">Client</th>
                <th className="px-4 py-3 font-medium">Service</th>
                <th className="px-4 py-3 font-medium">Date & Time</th>
                <th className="px-4 py-3 font-medium">Message</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt) => (
                <tr key={appt.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-medium text-foreground">{appt.name}</div>
                    <div className="text-xs text-muted-foreground">{appt.phone}</div>
                    <div className="text-xs text-muted-foreground">{appt.email}</div>
                  </td>
                  <td className="px-4 py-3 text-foreground">{appt.service}</td>
                  <td className="px-4 py-3">
                    <div className="text-foreground">{appt.date}</div>
                    <div className="text-xs text-muted-foreground">{appt.time}</div>
                  </td>
                  <td className="px-4 py-3 max-w-[180px]">
                    <p className="text-muted-foreground text-xs truncate">{appt.message || "—"}</p>
                  </td>
                  <td className="px-4 py-3">
                    <Select
                      value={appt.status}
                      onValueChange={(val) => handleStatusChange(appt.id, val)}
                    >
                      <SelectTrigger className="w-32 h-8 text-xs rounded-lg">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-4 py-3">
                    <DeleteButton onDelete={() => handleDelete(appt.id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
}

// ─── Messages Tab ─────────────────────────────────────────────────────────────
function MessagesTab() {
  const [readFilter, setReadFilter] = useState<string>("all");
  const [expanded, setExpanded] = useState<number | null>(null);
  const qc = useQueryClient();

  const params = readFilter === "unread" ? { read: false } : readFilter === "read" ? { read: true } : {};
  const { data: messages, isLoading } = useListMessages(params);
  const updateMut = useUpdateMessage();
  const deleteMut = useDeleteMessage();

  const handleMarkRead = (id: number, read: boolean) => {
    updateMut.mutate(
      { id, data: { read } },
      {
        onSuccess: () => {
          toast.success(read ? "Marked as read" : "Marked as unread");
          qc.invalidateQueries({ queryKey: getListMessagesQueryKey() });
          qc.invalidateQueries({ queryKey: getGetDashboardStatsQueryKey() });
        },
        onError: () => toast.error("Failed to update"),
      }
    );
  };

  const handleDelete = (id: number) => {
    deleteMut.mutate(
      { id },
      {
        onSuccess: () => {
          toast.success("Message deleted");
          qc.invalidateQueries({ queryKey: getListMessagesQueryKey() });
          qc.invalidateQueries({ queryKey: getGetDashboardStatsQueryKey() });
        },
        onError: () => toast.error("Failed to delete"),
      }
    );
  };

  const msgs = Array.isArray(messages) ? messages : [];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="bg-card border border-border rounded-xl shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 border-b border-border">
        <h2 className="font-serif text-xl text-foreground">Contact Messages</h2>
        <Select value={readFilter} onValueChange={setReadFilter}>
          <SelectTrigger className="w-36 rounded-xl h-9 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="all">All Messages</SelectItem>
            <SelectItem value="unread">Unread</SelectItem>
            <SelectItem value="read">Read</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="p-8 space-y-3">
          {[...Array(4)].map((_, i) => <div key={i} className="h-16 bg-muted animate-pulse rounded-lg" />)}
        </div>
      ) : msgs.length === 0 ? (
        <div className="p-16 text-center text-muted-foreground">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}>
            <p className="text-5xl mb-4 opacity-40">✉️</p>
            <p className="font-serif text-lg">No messages yet</p>
            <p className="text-sm mt-1">Messages from the contact form will appear here.</p>
          </motion.div>
        </div>
      ) : (
        <div className="divide-y divide-border">
          {msgs.map((msg) => (
            <div key={msg.id} className={`p-5 hover:bg-muted/20 transition-colors ${!msg.read ? "border-l-2 border-primary" : ""}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1 flex-wrap">
                    <span className="font-medium text-foreground">{msg.name}</span>
                    {!msg.read && (
                      <span className="inline-block px-2 py-0.5 rounded-full text-xs bg-primary/10 text-primary font-medium">New</span>
                    )}
                    <span className="text-xs text-muted-foreground">{new Date(msg.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                  </div>
                  <div className="text-xs text-muted-foreground mb-2 flex flex-wrap gap-3">
                    <span>{msg.email}</span>
                    {msg.phone && <span>{msg.phone}</span>}
                    {msg.subject && <span className="text-foreground/60">Re: {msg.subject}</span>}
                  </div>
                  <p className={`text-sm text-foreground/80 ${expanded === msg.id ? "" : "line-clamp-2"}`}>{msg.message}</p>
                  {msg.message.length > 120 && (
                    <button
                      onClick={() => setExpanded(expanded === msg.id ? null : msg.id)}
                      className="text-xs text-primary mt-1 hover:underline"
                    >
                      {expanded === msg.id ? "Show less" : "Read more"}
                    </button>
                  )}
                </div>
                <div className="flex flex-col gap-1.5 flex-shrink-0">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 px-2 text-xs rounded-lg"
                    onClick={() => handleMarkRead(msg.id, !msg.read)}
                  >
                    {msg.read ? "Mark unread" : "Mark read"}
                  </Button>
                  <DeleteButton onDelete={() => handleDelete(msg.id)} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

// ─── Services Tab ─────────────────────────────────────────────────────────────
function ServicesTab() {
  const qc = useQueryClient();
  const { data: services, isLoading } = useListServices();
  const createMut = useCreateService();
  const updateMut = useUpdateService();
  const deleteMut = useDeleteService();

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", category: "bridal", description: "", price: "", duration: "", featured: false });

  const resetForm = () => { setForm({ name: "", category: "bridal", description: "", price: "", duration: "", featured: false }); setEditing(null); setShowForm(false); };

  const handleEdit = (svc: { id: number; name: string; category: string; description: string; price?: string | null; duration: string; featured: boolean }) => {
    setForm({ name: svc.name, category: svc.category, description: svc.description, price: svc.price ?? "", duration: svc.duration, featured: svc.featured });
    setEditing(svc.id);
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { name: form.name, category: form.category as "bridal" | "party" | "hair" | "beauty", description: form.description, price: form.price, duration: form.duration, featured: form.featured, sortOrder: 0 };

    if (editing !== null) {
      updateMut.mutate({ id: editing, data: payload }, {
        onSuccess: () => { toast.success("Service updated"); qc.invalidateQueries({ queryKey: getListServicesQueryKey() }); resetForm(); },
        onError: () => toast.error("Failed to update service"),
      });
    } else {
      createMut.mutate({ data: payload }, {
        onSuccess: () => { toast.success("Service created"); qc.invalidateQueries({ queryKey: getListServicesQueryKey() }); resetForm(); },
        onError: () => toast.error("Failed to create service"),
      });
    }
  };

  const handleDelete = (id: number) => {
    deleteMut.mutate({ id }, {
      onSuccess: () => { toast.success("Service deleted"); qc.invalidateQueries({ queryKey: getListServicesQueryKey() }); qc.invalidateQueries({ queryKey: getGetDashboardStatsQueryKey() }); },
      onError: () => toast.error("Failed to delete"),
    });
  };

  const svcs = Array.isArray(services) ? services : [];

  return (
    <div className="space-y-4">
      {/* Form Panel */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="bg-card border border-border rounded-xl shadow-sm">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h2 className="font-serif text-xl text-foreground">{editing ? "Edit Service" : "Add New Service"}</h2>
          {!showForm && (
            <Button size="sm" className="rounded-xl text-xs uppercase tracking-wide" onClick={() => setShowForm(true)}>
              + Add Service
            </Button>
          )}
        </div>
        {showForm && (
          <form onSubmit={handleSubmit} className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-wide text-muted-foreground">Service Name *</label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="rounded-xl" placeholder="e.g. Bridal Makeup Package" />
            </div>
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-wide text-muted-foreground">Category *</label>
              <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="bridal">Bridal</SelectItem>
                  <SelectItem value="party">Party</SelectItem>
                  <SelectItem value="hair">Hair</SelectItem>
                  <SelectItem value="beauty">Beauty</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="sm:col-span-2 space-y-1">
              <label className="text-xs uppercase tracking-wide text-muted-foreground">Description *</label>
              <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required className="rounded-xl" rows={3} placeholder="Describe the service..." />
            </div>
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-wide text-muted-foreground">Price Range</label>
              <Input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="rounded-xl" placeholder="e.g. ₹5,000 – ₹10,000" />
            </div>
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-wide text-muted-foreground">Duration *</label>
              <Input value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} required className="rounded-xl" placeholder="e.g. 2–3 hours" />
            </div>
            <div className="sm:col-span-2 flex items-center gap-3">
              <input type="checkbox" id="featured" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="accent-primary w-4 h-4" />
              <label htmlFor="featured" className="text-sm text-foreground cursor-pointer">Feature this service on the homepage</label>
            </div>
            <div className="sm:col-span-2 flex gap-3">
              <Button type="submit" className="rounded-xl text-sm" disabled={createMut.isPending || updateMut.isPending}>
                {editing ? "Update Service" : "Save Service"}
              </Button>
              <Button type="button" variant="outline" className="rounded-xl text-sm" onClick={resetForm}>Cancel</Button>
            </div>
          </form>
        )}
      </motion.div>

      {/* Services List */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.1 }} className="bg-card border border-border rounded-xl shadow-sm">
        <div className="p-5 border-b border-border">
          <h2 className="font-serif text-xl text-foreground">All Services ({svcs.length})</h2>
        </div>
        {isLoading ? (
          <div className="p-8 space-y-3">{[...Array(4)].map((_, i) => <div key={i} className="h-14 bg-muted animate-pulse rounded-lg" />)}</div>
        ) : svcs.length === 0 ? (
          <div className="p-16 text-center text-muted-foreground">
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}>
              <p className="font-serif text-lg">No services added yet</p>
              <p className="text-sm mt-1">Add your first service above.</p>
            </motion.div>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {svcs.map((svc) => (
              <div key={svc.id} className="flex items-start justify-between p-4 hover:bg-muted/20 transition-colors gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-medium text-foreground">{svc.name}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground capitalize">{svc.category}</span>
                    {svc.featured && <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">Featured</span>}
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-1">{svc.description}</p>
                  <div className="flex gap-4 mt-1 text-xs text-muted-foreground">
                    {svc.price && <span>{svc.price}</span>}
                    <span>{svc.duration}</span>
                  </div>
                </div>
                <div className="flex gap-1.5 flex-shrink-0">
                  <Button size="sm" variant="ghost" className="h-7 px-2 text-xs rounded-lg" onClick={() => handleEdit(svc)}>Edit</Button>
                  <DeleteButton onDelete={() => handleDelete(svc.id)} />
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}

// ─── Testimonials Tab ─────────────────────────────────────────────────────────
function TestimonialsTab() {
  const qc = useQueryClient();
  const { data: testimonials, isLoading } = useListTestimonials();
  const createMut = useCreateTestimonial();
  const updateMut = useUpdateTestimonial();
  const deleteMut = useDeleteTestimonial();

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<number | null>(null);
  const [form, setForm] = useState({ clientName: "", serviceType: "", rating: 5, review: "", featured: false });

  const resetForm = () => { setForm({ clientName: "", serviceType: "", rating: 5, review: "", featured: false }); setEditing(null); setShowForm(false); };

  const handleEdit = (t: { id: number; clientName: string; serviceType?: string | null; rating: number; review: string; featured: boolean }) => {
    setForm({ clientName: t.clientName, serviceType: t.serviceType ?? "", rating: t.rating, review: t.review, featured: t.featured });
    setEditing(t.id);
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { clientName: form.clientName, serviceType: form.serviceType, rating: form.rating, review: form.review, featured: form.featured };

    if (editing !== null) {
      updateMut.mutate({ id: editing, data: payload }, {
        onSuccess: () => { toast.success("Testimonial updated"); qc.invalidateQueries({ queryKey: getListTestimonialsQueryKey() }); resetForm(); },
        onError: () => toast.error("Failed to update"),
      });
    } else {
      createMut.mutate({ data: payload }, {
        onSuccess: () => { toast.success("Testimonial added"); qc.invalidateQueries({ queryKey: getListTestimonialsQueryKey() }); resetForm(); },
        onError: () => toast.error("Failed to add testimonial"),
      });
    }
  };

  const handleDelete = (id: number) => {
    deleteMut.mutate({ id }, {
      onSuccess: () => { toast.success("Testimonial deleted"); qc.invalidateQueries({ queryKey: getListTestimonialsQueryKey() }); },
      onError: () => toast.error("Failed to delete"),
    });
  };

  const tmnls = Array.isArray(testimonials) ? testimonials : [];

  return (
    <div className="space-y-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="bg-card border border-border rounded-xl shadow-sm">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h2 className="font-serif text-xl text-foreground">{editing ? "Edit Testimonial" : "Add Testimonial"}</h2>
          {!showForm && (
            <Button size="sm" className="rounded-xl text-xs uppercase tracking-wide" onClick={() => setShowForm(true)}>
              + Add Testimonial
            </Button>
          )}
        </div>
        {showForm && (
          <form onSubmit={handleSubmit} className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-wide text-muted-foreground">Client Name *</label>
              <Input value={form.clientName} onChange={(e) => setForm({ ...form, clientName: e.target.value })} required className="rounded-xl" placeholder="e.g. Priya Sharma" />
            </div>
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-wide text-muted-foreground">Service Type</label>
              <Input value={form.serviceType} onChange={(e) => setForm({ ...form, serviceType: e.target.value })} className="rounded-xl" placeholder="e.g. Bridal Makeup" />
            </div>
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-wide text-muted-foreground">Rating (1–5) *</label>
              <Select value={String(form.rating)} onValueChange={(v) => setForm({ ...form, rating: Number(v) })}>
                <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                <SelectContent className="rounded-xl">
                  {[5, 4, 3, 2, 1].map((r) => (
                    <SelectItem key={r} value={String(r)}>{"★".repeat(r)} ({r}/5)</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-3 pt-6">
              <input type="checkbox" id="tfeatured" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="accent-primary w-4 h-4" />
              <label htmlFor="tfeatured" className="text-sm text-foreground cursor-pointer">Feature on homepage</label>
            </div>
            <div className="sm:col-span-2 space-y-1">
              <label className="text-xs uppercase tracking-wide text-muted-foreground">Review *</label>
              <Textarea value={form.review} onChange={(e) => setForm({ ...form, review: e.target.value })} required className="rounded-xl" rows={4} placeholder="Write the client's review..." />
            </div>
            <div className="sm:col-span-2 flex gap-3">
              <Button type="submit" className="rounded-xl text-sm" disabled={createMut.isPending || updateMut.isPending}>
                {editing ? "Update" : "Save Testimonial"}
              </Button>
              <Button type="button" variant="outline" className="rounded-xl text-sm" onClick={resetForm}>Cancel</Button>
            </div>
          </form>
        )}
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.1 }} className="bg-card border border-border rounded-xl shadow-sm">
        <div className="p-5 border-b border-border">
          <h2 className="font-serif text-xl text-foreground">All Testimonials ({tmnls.length})</h2>
        </div>
        {isLoading ? (
          <div className="p-8 space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="h-20 bg-muted animate-pulse rounded-lg" />)}</div>
        ) : tmnls.length === 0 ? (
          <div className="p-16 text-center text-muted-foreground">
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}>
              <p className="font-serif text-lg">No testimonials yet</p>
            </motion.div>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {tmnls.map((t) => (
              <div key={t.id} className="flex items-start justify-between p-4 hover:bg-muted/20 gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-medium text-foreground">{t.clientName}</span>
                    {t.serviceType && <span className="text-xs text-muted-foreground">{t.serviceType}</span>}
                    {t.featured && <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">Featured</span>}
                  </div>
                  <div className="text-primary text-sm mb-1">{"★".repeat(t.rating)}{"☆".repeat(5 - t.rating)}</div>
                  <p className="text-xs text-muted-foreground line-clamp-2">{t.review}</p>
                </div>
                <div className="flex gap-1.5 flex-shrink-0">
                  <Button size="sm" variant="ghost" className="h-7 px-2 text-xs rounded-lg" onClick={() => handleEdit(t)}>Edit</Button>
                  <DeleteButton onDelete={() => handleDelete(t.id)} />
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}

// ─── Gallery Tab ──────────────────────────────────────────────────────────────
function GalleryTab() {
  const qc = useQueryClient();
  const [categoryFilter, setCategoryFilter] = useState("all");
  const { data: images, isLoading } = useListGalleryImages(categoryFilter !== "all" ? { category: categoryFilter } : {});
  const createMut = useCreateGalleryImage();
  const deleteMut = useDeleteGalleryImage();

  const [form, setForm] = useState({ imageUrl: "", altText: "", category: "bridal", featured: false });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.imageUrl.trim()) return;
    createMut.mutate(
      { data: { imageUrl: form.imageUrl, altText: form.altText, category: form.category as "bridal" | "party" | "hair" | "transformations", featured: form.featured } },
      {
        onSuccess: () => {
          toast.success("Image added to gallery");
          setForm({ imageUrl: "", altText: "", category: "bridal", featured: false });
          qc.invalidateQueries({ queryKey: getListGalleryImagesQueryKey() });
          qc.invalidateQueries({ queryKey: getGetDashboardStatsQueryKey() });
        },
        onError: () => toast.error("Failed to add image"),
      }
    );
  };

  const handleDelete = (id: number) => {
    deleteMut.mutate({ id }, {
      onSuccess: () => { toast.success("Image removed"); qc.invalidateQueries({ queryKey: getListGalleryImagesQueryKey() }); qc.invalidateQueries({ queryKey: getGetDashboardStatsQueryKey() }); },
      onError: () => toast.error("Failed to delete"),
    });
  };

  const imgs = Array.isArray(images) ? images : [];

  return (
    <div className="space-y-4">
      {/* Add Image Form */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="bg-card border border-border rounded-xl shadow-sm">
        <div className="p-5 border-b border-border">
          <h2 className="font-serif text-xl text-foreground">Add Gallery Image</h2>
        </div>
        <form onSubmit={handleSubmit} className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2 space-y-1">
            <label className="text-xs uppercase tracking-wide text-muted-foreground">Image URL *</label>
            <Input
              value={form.imageUrl}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              required
              className="rounded-xl"
              placeholder="https://..."
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs uppercase tracking-wide text-muted-foreground">Alt Text</label>
            <Input value={form.altText} onChange={(e) => setForm({ ...form, altText: e.target.value })} className="rounded-xl" placeholder="Describe the image..." />
          </div>
          <div className="space-y-1">
            <label className="text-xs uppercase tracking-wide text-muted-foreground">Category *</label>
            <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
              <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="bridal">Bridal</SelectItem>
                <SelectItem value="party">Party Makeup</SelectItem>
                <SelectItem value="hair">Hair Styling</SelectItem>
                <SelectItem value="transformations">Transformations</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="sm:col-span-2 flex items-center gap-3">
            <input type="checkbox" id="gfeatured" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="accent-primary w-4 h-4" />
            <label htmlFor="gfeatured" className="text-sm text-foreground cursor-pointer">Feature this image</label>
          </div>
          {form.imageUrl && (
            <div className="sm:col-span-2">
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Preview</p>
              <img src={form.imageUrl} alt="preview" className="h-32 w-48 object-cover rounded-xl border border-border shadow-sm" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
            </div>
          )}
          <div className="sm:col-span-2">
            <Button type="submit" className="rounded-xl text-sm" disabled={createMut.isPending}>
              Add to Gallery
            </Button>
          </div>
        </form>
      </motion.div>

      {/* Gallery Grid */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.1 }} className="bg-card border border-border rounded-xl shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 border-b border-border">
          <h2 className="font-serif text-xl text-foreground">Gallery ({imgs.length} images)</h2>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-40 rounded-xl h-9 text-xs"><SelectValue /></SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="bridal">Bridal</SelectItem>
              <SelectItem value="party">Party Makeup</SelectItem>
              <SelectItem value="hair">Hair Styling</SelectItem>
              <SelectItem value="transformations">Transformations</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <div className="p-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => <div key={i} className="aspect-square bg-muted animate-pulse rounded-xl" />)}
          </div>
        ) : imgs.length === 0 ? (
          <div className="p-16 text-center text-muted-foreground">
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}>
              <p className="font-serif text-lg">Gallery is empty</p>
              <p className="text-sm mt-1">Add images above to populate the gallery.</p>
            </motion.div>
          </div>
        ) : (
          <div className="p-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {imgs.map((img) => (
              <div key={img.id} className="group relative aspect-square rounded-xl overflow-hidden border border-border bg-muted shadow-sm transition-all duration-300 hover:shadow-md">
                <img src={img.imageUrl} alt={img.altText ?? ""} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2">
                  <span className="text-white text-xs px-2.5 py-1 bg-black/40 rounded-lg capitalize">{img.category}</span>
                  <button
                    onClick={() => handleDelete(img.id)}
                    className="text-white text-xs bg-red-500/80 hover:bg-red-600 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    Remove
                  </button>
                </div>
                {img.featured && (
                  <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-lg shadow-sm">Featured</div>
                )}
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
