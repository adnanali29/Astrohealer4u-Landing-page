"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Lock,
  User,
  Key,
  LogOut,
  RefreshCw,
  Search,
  Download,
  CheckCircle2,
  Clock,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Trash2,
  Sparkles,
  Copy,
  Check,
  Eye,
  EyeOff,
  AlertCircle,
  ArrowRight,
  ExternalLink,
  Settings,
  X,
  ShieldCheck,
} from "lucide-react";
import type { BookingRecord } from "@/app/api/bookings/route";

export default function AdminPage() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(true);
  const [adminId, setAdminId] = useState<string>("");
  const [adminPassword, setAdminPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>("");
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [activeAdminId, setActiveAdminId] = useState<string>("1");

  // Settings Modal State
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [currentPasswordInput, setCurrentPasswordInput] = useState<string>("");
  const [newAdminIdInput, setNewAdminIdInput] = useState<string>("");
  const [newPasswordInput, setNewPasswordInput] = useState<string>("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState<string>("");
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [settingsError, setSettingsError] = useState<string>("");
  const [settingsSuccess, setSettingsSuccess] = useState<string>("");
  const [isSavingSettings, setIsSavingSettings] = useState<boolean>(false);

  // Bookings Data State
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Check login state on initial load
  useEffect(() => {
    try {
      const auth = localStorage.getItem("astrohealer_admin_auth");
      const storedId = localStorage.getItem("astrohealer_admin_id");
      if (auth === "true") {
        setIsAuthenticated(true);
        if (storedId) setActiveAdminId(storedId);
      }
    } catch {
      // ignore
    } finally {
      setIsLoadingAuth(false);
    }
  }, []);

  // Fetch current admin configuration
  const fetchConfig = async () => {
    try {
      const res = await fetch("/api/admin/credentials");
      const data = await res.json();
      if (data.success && data.adminId) {
        setActiveAdminId(data.adminId);
      }
    } catch {
      // ignore
    }
  };

  // Fetch bookings when authenticated
  const fetchBookings = async () => {
    setIsLoadingData(true);
    try {
      const res = await fetch("/api/bookings");
      const data = await res.json();
      if (data.success && Array.isArray(data.bookings)) {
        setBookings(data.bookings);
      }
    } catch (err) {
      console.error("Error fetching bookings:", err);
    } finally {
      setIsLoadingData(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchBookings();
      fetchConfig();
    }
  }, [isAuthenticated]);

  // Handle Login via /api/admin/credentials
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setIsLoggingIn(true);

    try {
      const res = await fetch("/api/admin/credentials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "login",
          adminId: adminId.trim(),
          adminPassword,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
        setActiveAdminId(data.adminId);
        try {
          localStorage.setItem("astrohealer_admin_auth", "true");
          localStorage.setItem("astrohealer_admin_id", data.adminId);
        } catch {
          // ignore
        }
      } else {
        setAuthError(data.error || "Invalid Admin ID or Password.");
      }
    } catch {
      // Fallback check for offline default: 1 / 1
      if (adminId.trim() === "1" && adminPassword === "1") {
        setIsAuthenticated(true);
        setActiveAdminId("1");
        try {
          localStorage.setItem("astrohealer_admin_auth", "true");
        } catch {
          // ignore
        }
      } else {
        setAuthError("Failed to authenticate. Please check credentials.");
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    try {
      localStorage.removeItem("astrohealer_admin_auth");
    } catch {
      // ignore
    }
  };

  // Handle Settings / Change Password & Username
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsError("");
    setSettingsSuccess("");

    if (newPasswordInput !== confirmPasswordInput) {
      setSettingsError("New password and confirmation do not match.");
      return;
    }

    if (!newAdminIdInput.trim()) {
      setSettingsError("Admin ID cannot be empty.");
      return;
    }

    if (!newPasswordInput) {
      setSettingsError("New password cannot be empty.");
      return;
    }

    setIsSavingSettings(true);
    try {
      const res = await fetch("/api/admin/credentials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "update",
          currentPassword: currentPasswordInput,
          newAdminId: newAdminIdInput.trim(),
          newPassword: newPasswordInput,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSettingsSuccess("Credentials updated successfully!");
        setActiveAdminId(data.newAdminId);
        try {
          localStorage.setItem("astrohealer_admin_id", data.newAdminId);
        } catch {
          // ignore
        }
        setCurrentPasswordInput("");
        setNewPasswordInput("");
        setConfirmPasswordInput("");
        setTimeout(() => {
          setIsSettingsOpen(false);
          setSettingsSuccess("");
        }, 1500);
      } else {
        setSettingsError(data.error || "Failed to update credentials.");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error saving credentials";
      setSettingsError(message);
    } finally {
      setIsSavingSettings(false);
    }
  };

  // Update Status
  const handleStatusChange = async (
    id: string,
    newStatus: "Pending" | "Confirmed" | "Completed" | "Cancelled"
  ) => {
    try {
      const res = await fetch("/api/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setBookings((prev) =>
          prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
        );
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  // Delete Booking
  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Delete consultation booking for "${name}" (${id})?`)) {
      return;
    }
    try {
      const res = await fetch(`/api/bookings?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setBookings((prev) => prev.filter((b) => b.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete booking:", err);
    }
  };

  // Copy Details for Astrologer analysis
  const handleCopyDetails = (b: BookingRecord) => {
    const text = `✦ ASTROHEALER CONSULTATION DATA ✦
Booking ID: ${b.id}
Client Name: ${b.name}
Phone: ${b.phone}
Email: ${b.email || "N/A"}
Service: ${b.consultation}
Status: ${b.status}
Source: ${b.source || "Hero Form"}
Notes: ${b.notes || "None"}`;

    navigator.clipboard.writeText(text);
    setCopiedId(b.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Export CSV
  const handleExportCSV = () => {
    if (bookings.length === 0) return;

    const headers = [
      "ID",
      "Client Name",
      "Phone",
      "Email",
      "Consultation Service",
      "Status",
      "Source",
      "Notes",
      "Booked At",
    ];

    const rows = bookings.map((b) => [
      `"${b.id}"`,
      `"${b.name.replace(/"/g, '""')}"`,
      `"${b.phone}"`,
      `"${b.email || ""}"`,
      `"${b.consultation.replace(/"/g, '""')}"`,
      `"${b.status}"`,
      `"${b.source || ""}"`,
      `"${(b.notes || "").replace(/"/g, '""')}"`,
      `"${b.createdAt}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `astrohealer-consultations-${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered Bookings
  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      const matchesSearch =
        searchQuery === "" ||
        b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (b.email && b.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
        b.consultation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (b.pob && b.pob.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStatus =
        statusFilter === "ALL" || b.status.toUpperCase() === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [bookings, searchQuery, statusFilter]);

  // Metrics
  const metrics = useMemo(() => {
    const total = bookings.length;
    const pending = bookings.filter((b) => b.status === "Pending").length;
    const confirmed = bookings.filter((b) => b.status === "Confirmed").length;
    const completed = bookings.filter((b) => b.status === "Completed").length;
    return { total, pending, confirmed, completed };
  }, [bookings]);

  if (isLoadingAuth) {
    return (
      <div className="min-h-screen bg-cosmic-950 flex items-center justify-center text-amber-300">
        <RefreshCw className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  // ==========================================
  // VIEW 1: LOGIN SCREEN (NO IMAGE 1 BADGE)
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-cosmic-950 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Soft Background Rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-15">
          <div className="w-[500px] h-[500px] rounded-full border border-amber-300/30 animate-spin-slow" />
          <div className="w-[300px] h-[300px] rounded-full border border-dashed border-purple-400/30 animate-spin-reverse-slow" />
        </div>

        <div className="w-full max-w-md bg-cosmic-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative z-10 backdrop-blur-xl">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-13 h-13 rounded-full bg-gradient-to-br from-amber-400/20 via-purple-900/40 to-cosmic-950 border border-amber-400/30 mb-3 shadow-md">
              <Sparkles className="w-6 h-6 text-amber-300" />
            </div>
            <h1 className="font-cinzel text-2xl font-bold text-white tracking-wide">
              ASTROHEALER <span className="text-amber-300">4U</span>
            </h1>
            <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mt-1">
              Admin Consultation Vault
            </p>
            <p className="text-[11px] text-slate-400 mt-2">
              Sign in to manage client natal bookings and schedule.
            </p>
          </div>

          {/* Error Message */}
          {authError && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-amber-300" />
                <span>Admin ID / Username</span>
              </label>
              <input
                type="text"
                required
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                placeholder="Enter Admin ID"
                className="w-full bg-cosmic-950 border border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 rounded-xl px-3.5 py-2.5 text-white text-sm focus:outline-none transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-amber-300" />
                <span>Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="Enter Password"
                  className="w-full bg-cosmic-950 border border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 rounded-xl px-3.5 py-2.5 text-white text-sm focus:outline-none transition pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950 font-bold uppercase tracking-wider text-xs shadow-md hover:shadow-lg hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer mt-5"
            >
              <Lock className="w-4 h-4" />
              <span>{isLoggingIn ? "Verifying..." : "Unlock Admin Vault"}</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </form>

          {/* Footer Back Link (Image 1 removed per user request) */}
          <div className="mt-6 pt-4 border-t border-slate-800 text-center">
            <Link
              href="/"
              className="text-[11px] text-slate-400 hover:text-white transition underline"
            >
              ← Return to Public Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 2: AUTHENTICATED ADMIN DASHBOARD
  // ==========================================
  return (
    <div className="min-h-screen bg-cosmic-950 text-slate-200 flex flex-col">
      {/* Top Admin Navigation Bar */}
      <header className="sticky top-0 z-30 bg-cosmic-900/95 border-b border-slate-800 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400/80 to-purple-900 flex items-center justify-center border border-amber-300/40 shadow-sm">
              <Sparkles className="w-4 h-4 text-cosmic-950" />
            </div>
            <div>
              <div className="font-cinzel font-bold text-base sm:text-lg text-white flex items-center gap-1.5">
                ASTROHEALER <span className="text-amber-300">4U</span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] uppercase font-sans font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  Admin Vault
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono">
                Operator ID: <span className="text-amber-200">{activeAdminId}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* View Website */}
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition"
              title="Open Public Website"
            >
              <span>View Website</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </Link>

            {/* Refresh */}
            <button
              type="button"
              onClick={fetchBookings}
              disabled={isLoadingData}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-xs font-medium border border-amber-500/30 transition cursor-pointer"
              title="Refresh consultations"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoadingData ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            {/* Export CSV */}
            <button
              type="button"
              onClick={handleExportCSV}
              disabled={bookings.length === 0}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition cursor-pointer disabled:opacity-40"
              title="Download CSV report"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>

            {/* Settings (Change Password & ID) */}
            <button
              type="button"
              onClick={() => {
                setIsSettingsOpen(true);
                setSettingsError("");
                setSettingsSuccess("");
                setNewAdminIdInput(activeAdminId);
                setCurrentPasswordInput("");
                setNewPasswordInput("");
                setConfirmPasswordInput("");
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-amber-300 text-xs font-medium border border-slate-700 hover:border-amber-400/40 transition cursor-pointer"
              title="Security Settings & Change Password"
            >
              <Settings className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden sm:inline">Settings</span>
            </button>

            {/* Logout */}
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-medium border border-rose-500/30 transition cursor-pointer"
              title="Log out from Admin Vault"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Metric Cards Banner */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-cosmic-900/80 border border-slate-800 rounded-2xl p-4 shadow-sm">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block mb-1">
              Total Consultations
            </span>
            <div className="text-2xl sm:text-3xl font-bold font-cinzel text-white flex items-center justify-between">
              <span>{metrics.total}</span>
              <Calendar className="w-5 h-5 text-amber-300/50" />
            </div>
            <p className="text-[10px] text-slate-500 mt-1">
              Recorded via hero form &amp; modals
            </p>
          </div>

          <div className="bg-cosmic-900/80 border border-amber-500/20 rounded-2xl p-4 shadow-sm">
            <span className="text-[11px] uppercase tracking-wider text-amber-300 font-semibold block mb-1">
              Pending Review
            </span>
            <div className="text-2xl sm:text-3xl font-bold font-cinzel text-amber-300 flex items-center justify-between">
              <span>{metrics.pending}</span>
              <Clock className="w-5 h-5 text-amber-400" />
            </div>
            <p className="text-[10px] text-amber-200/60 mt-1">
              Awaiting confirmation call
            </p>
          </div>

          <div className="bg-cosmic-900/80 border border-emerald-500/20 rounded-2xl p-4 shadow-sm">
            <span className="text-[11px] uppercase tracking-wider text-emerald-400 font-semibold block mb-1">
              Confirmed Slots
            </span>
            <div className="text-2xl sm:text-3xl font-bold font-cinzel text-emerald-400 flex items-center justify-between">
              <span>{metrics.confirmed}</span>
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            </div>
            <p className="text-[10px] text-emerald-300/60 mt-1">
              Locked on calendar
            </p>
          </div>

          <div className="bg-cosmic-900/80 border border-purple-500/20 rounded-2xl p-4 shadow-sm">
            <span className="text-[11px] uppercase tracking-wider text-purple-300 font-semibold block mb-1">
              Completed Readings
            </span>
            <div className="text-2xl sm:text-3xl font-bold font-cinzel text-purple-300 flex items-center justify-between">
              <span>{metrics.completed}</span>
              <Sparkles className="w-5 h-5 text-purple-400" />
            </div>
            <p className="text-[10px] text-purple-300/60 mt-1">
              Successfully delivered
            </p>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-cosmic-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-3 shadow-sm">
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, phone, email, city, or ID..."
              className="w-full bg-cosmic-950 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 transition"
            />
          </div>

          {/* Status Filter Tabs */}
          <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            {["ALL", "PENDING", "CONFIRMED", "COMPLETED"].map((tab) => {
              const active = statusFilter === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setStatusFilter(tab)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                    active
                      ? "bg-amber-400/25 border border-amber-400/50 text-amber-200"
                      : "bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  {tab === "ALL" ? `All (${metrics.total})` : tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bookings List / Table */}
        <div className="bg-cosmic-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          {filteredBookings.length === 0 ? (
            <div className="text-center py-16 px-4">
              <Calendar className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <h3 className="text-base font-semibold text-white">
                No consultations found
              </h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
                {searchQuery
                  ? "Try adjusting your search query or filter to find bookings."
                  : "All bookings submitted through 'Book 1-on-1 Guidance' will automatically populate here."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-cosmic-950/80 border-b border-slate-800 text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                  <tr>
                    <th className="py-3 px-4">Booking Ref</th>
                    <th className="py-3 px-4">Client Name</th>
                    <th className="py-3 px-4">Phone / WhatsApp</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Consultation Service &amp; Mode</th>
                    <th className="py-3 px-4 text-center">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {filteredBookings.map((b) => {
                    const cleanPhone = b.phone.replace(/[^0-9+]/g, "");
                    const whatsappMsg = encodeURIComponent(
                      `Namaste ${b.name} Ji! This is regarding your consultation booking (${b.id}) for "${b.consultation}" with Master Astrologer Garima Verma from AstroHealer4U. We have received your booking and would like to connect with you.`
                    );
                    const whatsappUrl = `https://wa.me/${cleanPhone.replace("+", "")}?text=${whatsappMsg}`;

                    return (
                      <tr key={b.id} className="hover:bg-slate-800/40 transition-colors">
                        {/* ID & Date Created */}
                        <td className="py-3.5 px-4 align-top whitespace-nowrap">
                          <span className="font-mono font-bold text-amber-300 block">
                            {b.id}
                          </span>
                          <span className="text-[10px] text-slate-500 block mt-0.5">
                            {new Date(b.createdAt).toLocaleDateString("en-IN", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                          <span className="text-[9px] text-slate-600 block">
                            {new Date(b.createdAt).toLocaleTimeString("en-IN", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </td>

                        {/* Client Name */}
                        <td className="py-3.5 px-4 align-top">
                          <div className="font-bold text-white text-sm">
                            {b.name}
                          </div>
                        </td>

                        {/* Phone / WhatsApp */}
                        <td className="py-3.5 px-4 align-top whitespace-nowrap">
                          <div className="flex items-center gap-1.5 text-slate-300 font-mono text-[11px]">
                            <Phone className="w-3 h-3 text-amber-400 shrink-0" />
                            <span>{b.phone}</span>
                          </div>
                        </td>

                        {/* Email */}
                        <td className="py-3.5 px-4 align-top">
                          {b.email ? (
                            <div className="flex items-center gap-1.5 text-slate-400 text-[10px]">
                              <Mail className="w-3 h-3 text-slate-500 shrink-0" />
                              <span className="truncate max-w-[180px]">{b.email}</span>
                            </div>
                          ) : (
                            <span className="text-slate-600 text-[10px]">—</span>
                          )}
                        </td>

                        {/* Consultation Service & Mode */}
                        <td className="py-3.5 px-4 align-top">
                          <span className="font-medium text-slate-200 block max-w-sm">
                            {b.consultation}
                          </span>
                          <span className="inline-block mt-1 px-2 py-0.5 rounded text-[9px] font-semibold uppercase bg-slate-800 text-slate-400 border border-slate-700">
                            {b.source || "Hero Form"}
                          </span>
                          {b.notes && (
                            <p className="text-[10px] text-slate-400 mt-1 italic">
                              Note: {b.notes}
                            </p>
                          )}
                        </td>

                        {/* Status Dropdown Selector */}
                        <td className="py-3.5 px-4 align-top text-center">
                          <select
                            value={b.status}
                            onChange={(e) =>
                              handleStatusChange(
                                b.id,
                                e.target.value as BookingRecord["status"]
                              )
                            }
                            className={`text-[10px] font-bold uppercase rounded-lg px-2.5 py-1 focus:outline-none cursor-pointer border ${
                              b.status === "Confirmed"
                                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                                : b.status === "Completed"
                                ? "bg-purple-500/20 text-purple-300 border-purple-500/40"
                                : b.status === "Cancelled"
                                ? "bg-rose-500/20 text-rose-300 border-rose-500/40"
                                : "bg-amber-500/20 text-amber-300 border-amber-500/40"
                            }`}
                          >
                            <option value="Pending" className="bg-cosmic-950 text-amber-300">
                              ● Pending
                            </option>
                            <option value="Confirmed" className="bg-cosmic-950 text-emerald-300">
                              ✓ Confirmed
                            </option>
                            <option value="Completed" className="bg-cosmic-950 text-purple-300">
                              ★ Completed
                            </option>
                            <option value="Cancelled" className="bg-cosmic-950 text-rose-300">
                              ✕ Cancelled
                            </option>
                          </select>
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 align-top text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            {/* WhatsApp Direct */}
                            <a
                              href={whatsappUrl}
                              target="_blank"
                              rel="noreferrer"
                              title="Chat on WhatsApp"
                              className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition cursor-pointer"
                            >
                              <Phone className="w-3.5 h-3.5" />
                            </a>

                            {/* Copy Full Record */}
                            <button
                              type="button"
                              onClick={() => handleCopyDetails(b)}
                              title="Copy details for chart calculation"
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition cursor-pointer"
                            >
                              {copiedId === b.id ? (
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>

                            {/* Delete */}
                            <button
                              type="button"
                              onClick={() => handleDelete(b.id, b.name)}
                              title="Delete record"
                              className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* ========================================== */}
      {/* SETTINGS MODAL: RESET / ADD NEW PASSWORD & ID */}
      {/* ========================================== */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <div className="bg-cosmic-900 border border-slate-700 w-full max-w-md rounded-2xl p-6 shadow-2xl relative">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsSettingsOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Title */}
            <div className="mb-5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[10px] font-bold uppercase tracking-wider mb-2">
                <ShieldCheck className="w-3 h-3 text-amber-400" />
                <span>Security Configuration</span>
              </div>
              <h3 className="font-cinzel text-xl font-bold text-white">
                Admin Credentials Settings
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Change your Admin ID (Username) and access password.
              </p>
            </div>

            {/* Error / Success Alerts */}
            {settingsError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{settingsError}</span>
              </div>
            )}
            {settingsSuccess && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{settingsSuccess}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSaveSettings} className="space-y-3.5 text-xs">
              {/* Current Password */}
              <div>
                <label className="block text-slate-300 mb-1 font-medium">
                  Current Password <span className="text-amber-400">*</span>
                </label>
                <input
                  type="password"
                  required
                  value={currentPasswordInput}
                  onChange={(e) => setCurrentPasswordInput(e.target.value)}
                  placeholder="Enter current password to authorize"
                  className="w-full bg-cosmic-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* New Admin ID */}
              <div>
                <label className="block text-slate-300 mb-1 font-medium">
                  New Admin ID / Username <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newAdminIdInput}
                  onChange={(e) => setNewAdminIdInput(e.target.value)}
                  placeholder="e.g. 1 or garima"
                  className="w-full bg-cosmic-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* New Password */}
              <div>
                <label className="block text-slate-300 mb-1 font-medium">
                  New Password <span className="text-amber-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    required
                    value={newPasswordInput}
                    onChange={(e) => setNewPasswordInput(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full bg-cosmic-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400 pr-9"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    {showNewPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Confirm New Password */}
              <div>
                <label className="block text-slate-300 mb-1 font-medium">
                  Confirm New Password <span className="text-amber-400">*</span>
                </label>
                <input
                  type="password"
                  required
                  value={confirmPasswordInput}
                  onChange={(e) => setConfirmPasswordInput(e.target.value)}
                  placeholder="Re-enter new password"
                  className="w-full bg-cosmic-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsSettingsOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingSettings}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-950 font-bold uppercase tracking-wider text-[11px] shadow-md hover:shadow-lg transition cursor-pointer"
                >
                  {isSavingSettings ? "Saving..." : "Save Credentials"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
