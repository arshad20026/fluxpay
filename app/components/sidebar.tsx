"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ArrowRightLeft,
  Send,
  User,
  Settings,
  LogOut,
  Wallet,
  Scan,
  CreditCard,
  Users,
  Repeat,
  Gift,
  Mic,
  TrendingUp,
  Hexagon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Send Money", href: "/send", icon: Send },
  { name: "Circle", href: "/beneficiaries", icon: Users },
  { name: "Scan QR", href: "/scan", icon: Scan },
  { name: "Virtual Cards", href: "/cards", icon: CreditCard },
  { name: "Split Bills", href: "/split", icon: Users },
  { name: "Recurring", href: "/recurring", icon: Repeat },
  { name: "Rewards", href: "/rewards", icon: Gift },
  { name: "Voice Pay", href: "/voice", icon: Mic },
  { name: "Analytics", href: "/analytics", icon: TrendingUp },
  { name: "Transactions", href: "/transactions", icon: ArrowRightLeft },
];

const premiumNavigation = [
  { name: "Security Center", href: "/security", icon: Settings },
  { name: "AI Insights", href: "/ai-insights", icon: TrendingUp },
  { name: "Crypto Wallet", href: "/crypto", icon: Wallet },
  { name: "Market News", href: "/market-news", icon: TrendingUp },
];

const secondaryNavigation = [
  { name: "Profile", href: "/profile", icon: User },
];

export function Sidebar({ mobile, onClose }: { mobile?: boolean; onClose?: () => void }) {
  const pathname = usePathname();

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

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const getInitials = (name: string | undefined) => {
    if (!name) return "??";
    return name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "??";
  };

  return (
    <div className="flex flex-col h-full glass-sidebar">
      <div className="flex items-center gap-3 px-6 py-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/20 animate-glow">
          <Hexagon className="w-5 h-5 text-white fill-white/20" />
        </div>
        <div>
          <span className="text-lg font-bold text-white tracking-tight">FluxPay</span>
          <p className="text-[8px] text-amber-500/60 font-medium tracking-widest uppercase">Digital Wallet</p>
        </div>
      </div>

      <Separator className="bg-white/5 mx-6" />

      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto custom-scrollbar">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={mobile ? onClose : undefined}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group relative",
                isActive
                  ? "bg-gradient-to-r from-amber-500/10 to-transparent text-amber-400"
                  : "text-stone-400 hover:bg-white/5 hover:text-stone-200"
              )}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-amber-500 rounded-r-full shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
              )}
              <item.icon className={cn("w-5 h-5 transition-colors", isActive ? "text-amber-400" : "text-stone-500 group-hover:text-stone-300")} />
              <span className={isActive ? "font-semibold" : ""}>{item.name}</span>
            </Link>
          );
        })}

        <div className="mt-8 mb-2 px-4">
          <p className="text-[10px] font-bold text-stone-600 uppercase tracking-widest">Premium</p>
        </div>

        {premiumNavigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={mobile ? onClose : undefined}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 relative overflow-hidden group",
                isActive
                  ? "bg-gradient-to-r from-purple-500/10 to-amber-500/10 text-amber-400 border border-amber-500/20"
                  : "text-stone-400 hover:bg-white/5 hover:text-stone-200"
              )}
            >
              <item.icon className={cn("w-5 h-5 transition-transform duration-300 group-hover:scale-110", isActive && "text-amber-400")} />
              <span className="relative z-10">{item.name}</span>
              <div className="ml-auto w-2 h-2 rounded-full bg-amber-500/50 animate-pulse" />
            </Link>
          );
        })}
      </nav>

      <div className="p-4 bg-stone-900/50 backdrop-blur-sm mt-auto border-t border-white/5">
        {secondaryNavigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            onClick={mobile ? onClose : undefined}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-stone-400 hover:bg-white/5 hover:text-stone-200 transition-all duration-200"
          >
            <item.icon className="w-5 h-5" />
            {item.name}
          </Link>
        ))}
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-stone-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 justify-start mt-1"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </Button>
      </div>

      <div className="p-4 pt-0">
        <Link
          href="/profile"
          onClick={mobile ? onClose : undefined}
          className="bg-stone-800/50 rounded-xl p-3 border border-white/5 backdrop-blur-md flex items-center gap-3 hover:bg-stone-800 transition-colors cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <span className="text-sm font-bold text-white uppercase">
              {getInitials(userData?.name)}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">{userData?.name || "User"}</p>
            <p className="text-xs text-stone-500 truncate">
              {userData?.balance !== undefined ? `₹${userData.balance.toLocaleString('en-IN')}` : "Premium"}
            </p>
          </div>
          <Settings className="w-4 h-4 text-stone-500 group-hover:rotate-90 transition-transform duration-500" />
        </Link>
      </div>
    </div>
  );
}
