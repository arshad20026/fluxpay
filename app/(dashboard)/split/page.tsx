"use client";

import { useState } from "react";
import { Users, Plus, DollarSign, ArrowRight, CheckCircle, UserPlus, Calculator, Clock, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function SplitPage() {
  const [step, setStep] = useState(1);
  const [totalAmount, setTotalAmount] = useState("");
  const [description, setDescription] = useState("");

  const friends = [
    { id: 1, name: "Varun Sharma", email: "varun@example.com", avatar: "VS" },
    { id: 2, name: "Priya Patel", email: "priya@example.com", avatar: "PP" },
    { id: 3, name: "Amit Kumar", email: "amit@example.com", avatar: "AK" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight">Social Ledger <span className="text-teal-500">.</span></h1>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-2">Multi-Party Expense Distribution</p>
        </div>
        <Button className="h-12 bg-white text-slate-950 font-black uppercase tracking-widest text-[10px] rounded-2xl px-6 gap-2">
          <UserPlus className="w-4 h-4" />
          New Group
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Active Splits */}
        <div className="lg:col-span-8 space-y-6">
          <Card className="glass-card border-white/5 rounded-[2rem] p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-sm font-black text-white uppercase tracking-widest">Ongoing Settlements</h3>
              <Badge className="bg-orange-500/10 text-orange-400 border-none text-[8px] font-black tracking-widest uppercase">2 Pending</Badge>
            </div>

            <div className="space-y-4">
              <ActiveSplit
                title="Weekend Goa Trip"
                amount="₹24,500"
                members={friends}
                yourShare="₹6,125"
                status="Collecting"
              />
              <ActiveSplit
                title="Office Dinner"
                amount="₹4,200"
                members={friends.slice(0, 2)}
                yourShare="₹1,400"
                status="Settled"
                completed
              />
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass-card border-white/5 rounded-[2rem] p-8 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/10 flex items-center justify-center text-teal-400">
                <Calculator className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-black text-white uppercase tracking-widest">Smart Calculator</h3>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-relaxed">Automatically calculate tip, tax, and individual shares from receipt images.</p>
              <Button variant="outline" className="w-full h-12 border-white/5 bg-white/5 text-white font-black uppercase tracking-widest text-[10px] rounded-xl">Launch Scanner</Button>
            </Card>
            <Card className="glass-card border-white/5 rounded-[2rem] p-8 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-black text-white uppercase tracking-widest">Nudge Feature</h3>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-relaxed">Send polite automated reminders to group members with pending balances.</p>
              <Button variant="outline" className="w-full h-12 border-white/5 bg-white/5 text-white font-black uppercase tracking-widest text-[10px] rounded-xl">Configure Alerts</Button>
            </Card>
          </div>
        </div>

        {/* Create New Split */}
        <div className="lg:col-span-4">
          <Card className="glass-card border-white/5 rounded-[2rem] overflow-hidden sticky top-24">
            <div className="bg-teal-500 h-2 w-full" />
            <CardContent className="p-8 space-y-8">
              <div>
                <h3 className="text-lg font-black text-white uppercase tracking-widest">Quick Split</h3>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Initialize New Settlement</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Grand Total</label>
                  <div className="relative">
                    <Input
                      value={totalAmount}
                      onChange={(e) => setTotalAmount(e.target.value)}
                      placeholder="0.00"
                      className="h-14 pl-10 bg-white/5 border-white/10 text-white font-black text-lg rounded-2xl"
                    />
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-black">₹</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Description</label>
                  <Input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="e.g. Pizza Night"
                    className="h-14 bg-white/5 border-white/10 text-white font-bold rounded-2xl"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Add Members</p>
                <div className="flex -space-x-3 mb-4">
                  {friends.map(f => (
                    <div key={f.id} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-[10px] font-black text-white">{f.avatar}</div>
                  ))}
                  <button className="w-10 h-10 rounded-full border-2 border-dashed border-slate-600 bg-transparent flex items-center justify-center text-slate-600 hover:border-white hover:text-white transition-all">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <Button className="w-full h-14 bg-teal-500 hover:bg-teal-600 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl shadow-xl shadow-teal-500/20">
                Create Settlement
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

interface ActiveSplitProps {
  title: string;
  amount: string;
  members: any[];
  yourShare: string;
  status: string;
  completed?: boolean;
}

function ActiveSplit({ title, amount, members, yourShare, status, completed }: ActiveSplitProps) {
  return (
    <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all group flex flex-col sm:flex-row sm:items-center justify-between gap-6">
      <div className="flex items-center gap-6">
        <div className={cn(
          "w-12 h-12 rounded-2xl flex items-center justify-center",
          completed ? "bg-teal-500/10 text-teal-400" : "bg-blue-500/10 text-blue-400"
        )}>
          {completed ? <CheckCircle className="w-6 h-6" /> : <Clock className="w-6 h-6" />}
        </div>
        <div>
          <h4 className="text-sm font-black text-white uppercase tracking-widest">{title}</h4>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">{amount} • {members.length} members</p>
        </div>
      </div>

      <div className="flex items-center gap-8">
        <div className="text-right">
          <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Your Share</p>
          <p className="text-sm font-black text-white tracking-widest">{yourShare}</p>
        </div>
        <div className="text-right min-w-[100px]">
          <Badge variant="outline" className={cn(
            "text-[8px] font-black uppercase tracking-widest border-none px-2 py-0.5",
            completed ? "bg-teal-500/10 text-teal-400" : "bg-blue-500/10 text-blue-400"
          )}>
            {status}
          </Badge>
        </div>
        <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/10 transition-all">
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
