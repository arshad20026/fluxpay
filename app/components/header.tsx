"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Sidebar } from "./sidebar";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  interface UserData {
    id?: string;
    name?: string;
    email?: string;
    balance?: number;
  }

  const [userData] = useState<UserData | null>(() => {
    if (typeof window === "undefined") {
      return null;
    }
    try {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const getInitials = (name: string) => {
    return name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "??";
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-[#020617]/60 backdrop-blur-2xl">
      <div className="flex h-16 items-center gap-4 px-4 sm:px-6">
        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white rounded-xl">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 bg-[#020617] border-r border-white/5 p-0">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <Sidebar mobile onClose={() => setIsOpen(false)} />
          </SheetContent>
        </Sheet>

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex flex-1 max-w-md">
          <div className="relative w-full group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-teal-400 transition-colors" />
            <Input
              type="search"
              placeholder="Search assets, users, transactions..."
              className="w-full h-11 pl-11 bg-white/5 border-white/5 rounded-2xl text-slate-200 placeholder:text-slate-600 focus:bg-white/10 focus:border-white/10 transition-all font-medium"
            />
          </div>
        </div>

        <div className="flex-1 lg:flex-none" />

        {/* Right Side Actions */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <button
            className="relative w-11 h-11 rounded-2xl bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all group"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-3 right-3 w-1.5 h-1.5 bg-teal-500 rounded-full shadow-[0_0_10px_rgba(20,184,166,0.5)]" />
          </button>

          {/* Profile Quick Link */}
          <Link href="/profile">
            <div className="flex items-center gap-3 pl-3 py-1 pr-1 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
              <span className="hidden sm:block text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-slate-300 transition-colors">{userData?.name?.split(' ')[0] || 'User'}</span>
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-blue-600 flex items-center justify-center shadow-lg active:scale-95 transition-transform">
                <span className="text-[10px] font-black text-white uppercase tracking-tighter">
                  {getInitials(userData?.name)}
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
