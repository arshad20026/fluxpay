"use client";

import { useState } from "react";
import { CreditCard, Eye, EyeOff, Plus, Shield, Zap, Lock, Smartphone, ChevronRight, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function CardsPage() {
  const [showFullDetails, setShowFullDetails] = useState(false);
  const [activeTab, setActiveTab] = useState<"active" | "frozen" | "history">("active");

  const cards = [
    {
      id: 1,
      type: "Virtual",
      number: "4829 1029 3847 8291",
      expiry: "09/28",
      cvv: "821",
      name: "PREMIUM MEMBER",
      balance: "₹45,290.00",
      status: "active",
      color: "from-teal-500 via-blue-500 to-indigo-600"
    }
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight">Identity Cards <span className="text-teal-500">.</span></h1>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-2">Secure Virtual Payment Instruments</p>
        </div>
        <Button className="h-12 bg-white text-slate-950 font-black uppercase tracking-widest text-[10px] rounded-2xl gap-2 hover:bg-slate-200 transition-all px-6">
          <Plus className="w-4 h-4" />
          Issue New Card
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Card View */}
        <div className="lg:col-span-8 space-y-8">
          {cards.map((card) => (
            <Card key={card.id} className="relative group perspective-1000 bg-transparent border-none">
              <div className={cn(
                "relative w-full aspect-[1.586/1] rounded-[2.5rem] bg-gradient-to-br p-10 overflow-hidden shadow-2xl transition-all duration-700",
                card.color,
                "shadow-teal-500/20"
              )}>
                {/* Background Patterns */}
                <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
                  <svg width="100%" height="100%">
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>
                </div>

                <div className="h-full flex flex-col justify-between relative z-10">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <Badge className="bg-white/20 text-white border-none text-[8px] tracking-widest font-black uppercase py-0 px-2 h-5">FluxPay Premium</Badge>
                      <div className="flex items-center gap-2">
                        <Zap className="w-5 h-5 text-white animate-pulse" />
                        <span className="text-lg font-black text-white tracking-tight italic">INFINITY</span>
                      </div>
                    </div>
                    <div className="w-14 h-10 bg-white/20 rounded-lg backdrop-blur-md flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-white/40 -mr-3" />
                      <div className="w-8 h-8 rounded-full bg-white/40" />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-white/50 uppercase tracking-[0.3em]">Card Identifier</p>
                      <div className="flex items-center gap-4 group/num" onClick={() => copyToClipboard(card.number)}>
                        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-widest flex items-center gap-2">
                          {showFullDetails ? card.number : `•••• •••• •••• ${card.number.slice(-4)}`}
                        </h2>
                        <Copy className="w-4 h-4 text-white/30 opacity-0 group-hover/num:opacity-100 transition-opacity cursor-pointer" />
                      </div>
                    </div>

                    <div className="flex items-center gap-12">
                      <div className="space-y-1">
                        <p className="text-[10px] font-black text-white/50 uppercase tracking-widest">Expiry</p>
                        <p className="text-sm font-black text-white tracking-widest">{card.expiry}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-black text-white/50 uppercase tracking-widest">CVV</p>
                        <p className="text-sm font-black text-white tracking-widest">{showFullDetails ? card.cvv : "•••"}</p>
                      </div>
                      <div className="ml-auto">
                        <p className="text-sm font-black text-white tracking-widest">{card.name}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <ActionButton icon={<Eye className="w-5 h-5" />} label={showFullDetails ? "Hide" : "Show"} onClick={() => setShowFullDetails(!showFullDetails)} />
            <ActionButton icon={<Lock className="w-5 h-5" />} label="Freeze" onClick={() => alert("Card Frozen Successfully")} />
            <ActionButton icon={<Smartphone className="w-5 h-5" />} label="Limits" onClick={() => { }} />
            <ActionButton icon={<CreditCard className="w-5 h-5" />} label="Replace" onClick={() => { }} />
          </div>
        </div>

        {/* Card Controls & Details */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="glass-card rounded-[2rem] border-white/5 p-8">
            <h3 className="text-sm font-black text-white uppercase tracking-widest mb-8 px-1">Card Security</h3>
            <div className="space-y-6">
              <SecurityOption
                icon={<Shield className="w-5 h-5 text-teal-400" />}
                title="Contactless"
                description="Secure NFC payments enabled"
                enabled={true}
              />
              <SecurityOption
                icon={<Zap className="w-5 h-5 text-blue-400" />}
                title="International"
                description="Global currency rails ready"
                enabled={true}
              />
              <SecurityOption
                icon={<Lock className="w-5 h-5 text-purple-400" />}
                title="Auto-Lock"
                description="Freeze after 24h idle"
                enabled={false}
              />
            </div>

            <div className="mt-10 p-4 bg-teal-500/5 rounded-2xl border border-teal-500/20">
              <div className="flex items-center gap-3 mb-2">
                <Shield className="w-4 h-4 text-teal-400" />
                <span className="text-[10px] font-black text-teal-400 uppercase tracking-widest">PCI-DSS Protected</span>
              </div>
              <p className="text-[10px] text-slate-500 leading-relaxed uppercase font-bold tracking-wider">Your virtual identifier is stored in our military-grade encrypted vault.</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function ActionButton({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="h-24 flex flex-col items-center justify-center gap-2 rounded-[1.5rem] bg-white/5 border border-white/5 hover:bg-white/10 transition-all group"
    >
      <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center group-hover:scale-110 transition-transform text-slate-400 group-hover:text-white">
        {icon}
      </div>
      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest group-hover:text-white">{label}</span>
    </button>
  );
}

function SecurityOption({ icon, title, description, enabled }: { icon: React.ReactNode, title: string, description: string, enabled: boolean }) {
  return (
    <div className="flex items-center gap-4 group cursor-pointer lg:justify-between">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
          {icon}
        </div>
        <div>
          <p className="text-xs font-bold text-white uppercase tracking-wider">{title}</p>
          <p className="text-[10px] text-slate-500 font-medium">{description}</p>
        </div>
      </div>
      <div className={cn(
        "w-10 h-5 rounded-full relative transition-colors",
        enabled ? "bg-teal-500" : "bg-slate-800"
      )}>
        <div className={cn(
          "absolute top-1 w-3 h-3 rounded-full bg-white transition-all",
          enabled ? "right-1" : "left-1"
        )} />
      </div>
    </div>
  );
}

// Utility to merge classes
function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(' ');
}
