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
  { name: "Security Center", href: "/security", icon: Settings, badge: "AI" },
  { name: "AI Insights", href: "/ai-insights", icon: TrendingUp, badge: "NEW" },
  { name: "Crypto Wallet", href: "/crypto", icon: Wallet, badge: "HOT" },
  { name: "Market News", href: "/market-news", icon: TrendingUp, badge: "LIVE" },
  { name: "Achievements", href: "/achievements", icon: Gift, badge: "NEW" },
];

const secondaryNavigation = [
  { name: "Profile", href: "/profile", icon: User },
];

interface SidebarProps {
  mobile?: boolean;
  onClose?: () => void;
}

export function Sidebar({ mobile, onClose }: SidebarProps) {
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

  const getInitials = (name: string) => {
    return name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "??";
  };

  return (
    <div className="flex flex-col h-full glass-sidebar">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center shadow-lg shadow-teal-500/20">
          <Wallet className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold text-white tracking-tight">FluxPay</span>
      </div>

      <Separator className="bg-white/5 mx-6" />

      {/* Main Navigation */}
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
                  ? "bg-teal-500/10 text-teal-400"
                  : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
              )}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-teal-500 rounded-r-full shadow-[0_0_10px_rgba(20,184,166,0.5)]" />
              )}
              <item.icon className={cn("w-5 h-5 transition-colors", isActive ? "text-teal-400" : "text-slate-500 group-hover:text-slate-300")} />
              <span className={isActive ? "font-semibold" : ""}>{item.name}</span>
            </Link>
          );
        })}

        <div className="mt-8 mb-2 px-4">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Premium</p>
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
                  ? "bg-gradient-to-r from-purple-500/10 to-teal-500/10 text-teal-400 border border-teal-500/20"
                  : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
              )}
            >
              <item.icon className={cn("w-5 h-5 transition-transform duration-300 group-hover:scale-110", isActive && "text-teal-400")} />
              <span className="relative z-10">{item.name}</span>
              {item.badge && (
                <span className={cn(
                  "ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm",
                  item.badge === "AI" && "bg-purple-500/20 text-purple-400 border border-purple-500/20",
                  item.badge === "NEW" && "bg-teal-500/20 text-teal-400 border border-teal-500/20",
                  item.badge === "HOT" && "bg-orange-500/20 text-orange-400 border border-orange-500/20",
                  item.badge === "LIVE" && "bg-green-500/20 text-green-400 border border-green-500/20"
                )}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 bg-slate-900/50 backdrop-blur-sm mt-auto border-t border-white/5">
        {secondaryNavigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            onClick={mobile ? onClose : undefined}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-slate-200 transition-all duration-200"
          >
            <item.icon className="w-5 h-5" />
            {item.name}
          </Link>
        ))}
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 justify-start mt-1"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </Button>
      </div>

      {/* User Preview */}
      <div className="p-4 pt-0">
        <Link
          href="/profile"
          onClick={mobile ? onClose : undefined}
          className="bg-white/5 rounded-xl p-3 border border-white/5 backdrop-blur-md flex items-center gap-3 hover:bg-white/10 transition-colors cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <span className="text-sm font-bold text-white uppercase">
              {getInitials(userData?.name)}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">{userData?.name || "User"}</p>
            <p className="text-xs text-slate-400 truncate">Premium Member</p>
          </div>
          <Settings className="w-4 h-4 text-slate-500 group-hover:rotate-90 transition-transform duration-500" />
        </Link>
      </div>
    </div>
  );
}
