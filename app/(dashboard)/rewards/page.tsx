"use client";

import { useState } from "react";
import { Gift, Award, Star, Zap, Trophy, Flame, Target, Share2, ArrowRight, CheckCircle, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function RewardsPage({ defaultTab = "rewards" }: { defaultTab?: "rewards" | "achievements" }) {
  const [activeTab, setActiveTab] = useState<"rewards" | "achievements">(defaultTab);

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight">Milestones <span className="text-teal-500">.</span></h1>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-2">Loyalty Yield & Proof of Activity</p>
        </div>
        <div className="flex items-center gap-2 bg-white/5 p-1 rounded-2xl border border-white/5">
          <button
            onClick={() => setActiveTab("rewards")}
            className={cn(
              "px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
              activeTab === "rewards" ? "bg-white text-slate-950 shadow-lg" : "text-slate-500 hover:text-white"
            )}
          >
            Rewards
          </button>
          <button
            onClick={() => setActiveTab("achievements")}
            className={cn(
              "px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
              activeTab === "achievements" ? "bg-white text-slate-950 shadow-lg" : "text-slate-500 hover:text-white"
            )}
          >
            Achievements
          </button>
        </div>
      </div>

      {activeTab === "rewards" ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Points Summary */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="glass-card border-none rounded-[2.5rem] bg-gradient-to-br from-indigo-600 to-purple-700 overflow-hidden relative p-10">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10 space-y-8">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-indigo-200 uppercase tracking-widest">Available Flux Points</p>
                  <h2 className="text-5xl font-black text-white tracking-tighter">12,450</h2>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-[10px] font-black text-white/60 uppercase tracking-widest">
                    <span>Next Tier: Diamond</span>
                    <span>75%</span>
                  </div>
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-[75%] bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
                  </div>
                  <p className="text-[10px] text-white/40 font-bold leading-relaxed uppercase tracking-widest">Earn 2,550 more points to unlock free global wires and zero-fee crypto trades.</p>
                </div>
                <Button className="w-full h-14 bg-white text-indigo-600 font-black uppercase text-[10px] tracking-widest rounded-2xl hover:bg-white/90">Redeem Points</Button>
              </div>
            </Card>

            <Card className="glass-card border-white/5 rounded-[2.5rem] p-8 space-y-6">
              <h3 className="text-xs font-black text-white uppercase tracking-widest px-1">Daily Streak</h3>
              <div className="flex items-center justify-between">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className={cn(
                      "w-10 h-10 rounded-full border-4 border-slate-900 flex items-center justify-center text-xs font-black",
                      i <= 4 ? "bg-teal-500 text-white" : "bg-slate-800 text-slate-500"
                    )}>
                      {i === 4 ? <Flame className="w-4 h-4" /> : i}
                    </div>
                  ))}
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black text-white tracking-tighter">4 Days</p>
                  <p className="text-[8px] font-black text-teal-400 tracking-widest uppercase">Hot Streak</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Active Offers */}
          <div className="lg:col-span-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <OfferCard
                icon={<Zap className="w-6 h-6 text-orange-400" />}
                title="Gasless Crypto Trades"
                description="Unlock 0% fees on all ETH/SOL trades for 48 hours."
                cost="1,200 pts"
              />
              <OfferCard
                icon={<Star className="w-6 h-6 text-teal-400" />}
                title="Cashback Multiplier"
                description="Get 5% back on all coffee and travel spends this week."
                cost="850 pts"
              />
              <OfferCard
                icon={<Gift className="w-6 h-6 text-purple-400" />}
                title="Premium Metal Card"
                description="Get our limited edition matte black metal identifier."
                cost="10,000 pts"
              />
              <OfferCard
                icon={<Trophy className="w-6 h-6 text-blue-400" />}
                title="VIP Lounge Access"
                description="One-time pass for 1,200+ airport lounges worldwide."
                cost="2,500 pts"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AchievementCard
            icon={<Trophy className="w-8 h-8 text-yellow-500" />}
            title="Early Pioneer"
            description="One of the first 10,000 members of FluxPay."
            date="Jan 2026"
            completed
          />
          <AchievementCard
            icon={<Zap className="w-8 h-8 text-teal-500" />}
            title="Velocity Master"
            description="Exceeded ₹10L in total transaction volume."
            progress={85}
            goal="₹10L"
          />
          <AchievementCard
            icon={<Globe className="w-8 h-8 text-blue-500" />}
            title="World Citizen"
            description="Transacted in more than 5 different currencies."
            completed
            date="Feb 2026"
          />
          <AchievementCard
            icon={<Share2 className="w-8 h-8 text-purple-500" />}
            title="The Connector"
            description="Invited 10 friends to join the social ledger."
            progress={40}
            goal="10 Friends"
          />
          <AchievementCard
            icon={<Smartphone className="w-8 h-8 text-indigo-500" />}
            title="Voice First"
            description="Completed 50 payments using Voice Rails."
            progress={12}
            goal="50"
          />
          <AchievementCard
            icon={<CheckCircle className="w-8 h-8 text-teal-500" />}
            title="KYC Emerald"
            description="Fully verified legacy account status."
            completed
            date="Jan 2026"
          />
        </div>
      )}
    </div>
  );
}

function OfferCard({ icon, title, description, cost }: any) {
  return (
    <Card className="glass-card border-white/5 rounded-[2rem] p-8 flex flex-col justify-between group hover:bg-white/5 transition-all">
      <div className="space-y-6">
        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <div>
          <h4 className="text-sm font-black text-white uppercase tracking-widest mb-1">{title}</h4>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-relaxed">{description}</p>
        </div>
      </div>
      <div className="mt-10 flex items-center justify-between">
        <Badge variant="outline" className="border-white/10 text-slate-300 px-3 py-1 rounded-xl text-[10px] font-black tracking-widest">{cost}</Badge>
        <button className="text-[10px] font-black text-white hover:text-teal-400 transition-colors flex items-center gap-2 uppercase tracking-widest">Redeem <ArrowRight className="w-3.5 h-3.5" /></button>
      </div>
    </Card>
  );
}

function AchievementCard({ icon, title, description, completed, date, progress, goal }: any) {
  return (
    <Card className={cn(
      "glass-card border-white/5 rounded-[2.5rem] p-8 flex flex-col items-center text-center space-y-6 relative overflow-hidden",
      !completed && "opacity-60"
    )}>
      {!completed && <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] z-10 hidden" />}
      <div className={cn(
        "w-20 h-20 rounded-3xl flex items-center justify-center shadow-xl",
        completed ? "bg-white/5 border border-white/10" : "bg-slate-900 border border-white/5"
      )}>
        {icon}
      </div>
      <div className="space-y-2">
        <h4 className="text-sm font-black text-white uppercase tracking-widest">{title}</h4>
        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-relaxed">{description}</p>
      </div>

      {completed ? (
        <div className="flex items-center gap-2 text-teal-400">
          <CheckCircle className="w-4 h-4" />
          <span className="text-[10px] font-black uppercase tracking-widest">Unlocked {date}</span>
        </div>
      ) : (
        <div className="w-full space-y-3">
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-slate-400 rounded-full" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Progress: {progress}% of {goal}</p>
        </div>
      )}
    </Card>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

function Globe({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function Smartphone({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  );
}
