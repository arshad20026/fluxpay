"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, Bell, Search, Hexagon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Sidebar } from "./sidebar";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

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

  const getInitials = (name: string | undefined) => {
    if (!name) return "??";
    return name.split(" ").map((n) => n[0]).join("").toUpperCase() || "??";
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-[#0c0a09]/80 backdrop-blur-2xl">
      <div className="flex h-16 items-center gap-4 px-4 sm:px-6">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon" className="text-stone-400 hover:text-white rounded-xl">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 bg-[#0c0a09] border-r border-white/5 p-0">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <Sidebar mobile onClose={() => setIsOpen(false)} />
          </SheetContent>
        </Sheet>

        <div className="hidden md:flex flex-1 max-w-md">
          <div className="relative w-full group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-500 group-focus-within:text-amber-400 transition-colors" />
            <Input
              type="search"
              placeholder="Search transactions, users..."
              className="w-full h-11 pl-11 bg-stone-800/50 border-white/5 rounded-xl text-stone-200 placeholder:text-stone-600 focus:bg-stone-800/80 focus:border-amber-500/30 transition-all font-medium"
            />
          </div>
        </div>

        <div className="flex-1 lg:flex-none" />

        <div className="flex items-center gap-2">
          <button className="relative w-11 h-11 rounded-xl bg-stone-800/50 flex items-center justify-center text-stone-400 hover:text-white hover:bg-stone-800 transition-all group border border-white/5">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-amber-500 rounded-full" />
          </button>

          <Link href="/profile">
            <div className="flex items-center gap-3 pl-3 py-1.5 pr-2 bg-stone-800/50 rounded-xl border border-white/5 hover:bg-stone-800 transition-colors cursor-pointer group">
              <span className="hidden sm:block text-xs font-medium text-stone-400 group-hover:text-white transition-colors">{userData?.name?.split(' ')[0] || 'User'}</span>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg">
                <span className="text-[10px] font-bold text-white uppercase tracking-tighter">
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
