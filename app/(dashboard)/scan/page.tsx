"use client";

import { useState } from "react";
import { X, Zap, User, ArrowRight, Loader2, CheckCircle, Camera, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { apiClient } from "@/lib/api-client";
import Link from "next/link";

export default function ScanPage() {
  const [scanState, setScanState] = useState<"idle" | "scanning" | "found" | "paying" | "success">("idle");
  interface BasicUser { name: string; email: string }
  const [scannedUser, setScannedUser] = useState<BasicUser | null>(null);
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [manualEmail, setManualEmail] = useState("");

  const startScan = () => {
    setScanState("scanning");
    // Simulate scanning logic
    setTimeout(() => {
      // After 2 seconds, simulate finding a user or showing manual entry
    }, 2000);
  };

  const handleManualScan = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const users = await apiClient.get(`/user/search?query=${manualEmail}`) as BasicUser[];
      if (users.length > 0) {
        setScannedUser(users[0]);
        setScanState("found");
      } else {
        alert("No user found with this identifier");
      }
    } catch (error: unknown) {
      alert("Search failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePayment = async () => {
    setIsLoading(true);
    try {
      await apiClient.post("/transaction/send", {
        recipientEmail: scannedUser?.email ?? "",
        amount: parseFloat(amount)
      });
      setScanState("success");
    } catch (error: unknown) {
      const msg = (error as Error)?.message || "Payment failed";
      alert(msg);
    } finally {
      setIsLoading(false);
    }
  };

  if (scanState === "success") {
    return (
      <div className="max-w-md mx-auto animate-scale-in py-10">
        <Card className="glass-card premium-card border-amber-500/20 bg-amber-500/5">
          <CardContent className="pt-12 pb-10 px-8 text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-amber-500/40">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-black text-white mb-2">Payment Sent!</h2>
            <p className="text-stone-400 mb-8">₹{parseFloat(amount || "0").toFixed(2)} transfer to {scannedUser?.name || 'user'} successful.</p>
            <Button asChild className="w-full h-14 bg-white text-slate-950 font-black uppercase tracking-widest text-[10px] rounded-2xl">
              <Link href="/dashboard">Back to Dashboard</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight">Scanner Pay <span className="text-teal-500">.</span></h1>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-2">Instant QR Identity Verification</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Scanner Interface */}
        <Card className="lg:col-span-12 glass-card rounded-[2.5rem] border-white/5 overflow-hidden relative min-h-[500px] flex flex-col items-center justify-center">
          {scanState === "idle" && (
            <div className="text-center space-y-8 p-10">
              <div className="relative inline-block">
                <div className="w-32 h-32 rounded-[2.5rem] border-2 border-dashed border-teal-500/40 flex items-center justify-center bg-teal-500/5 group hover:border-teal-500 transition-all cursor-pointer" onClick={startScan}>
                  <Camera className="w-12 h-12 text-teal-400 group-hover:scale-110 transition-transform" />
                </div>
                <div className="absolute inset-0 rounded-[2.5rem] bg-teal-500/10 animate-ping opacity-20 pointer-events-none" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white">Initialize Scanner</h3>
                <p className="text-slate-500 max-w-xs mx-auto">Point your device at a FluxPay QR code or enter an ID manually below.</p>
              </div>

              <form onSubmit={handleManualScan} className="max-w-xs mx-auto space-y-4">
                <div className="relative">
                  <QrCode className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <Input
                    placeholder="Enter Email or UPI ID"
                    value={manualEmail}
                    onChange={(e) => setManualEmail(e.target.value)}
                    className="h-14 pl-12 bg-white/5 border-white/10 text-white rounded-2xl"
                  />
                </div>
                <Button type="submit" disabled={isLoading} className="w-full h-14 bg-white text-slate-950 font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-slate-200 transition-all">
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Identify User"}
                </Button>
              </form>
            </div>
          )}

          {scanState === "scanning" && (
            <div className="absolute inset-0 bg-slate-950 flex flex-col items-center justify-center p-10">
              <div className="relative w-64 h-64">
                {/* Scanner Frame */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-teal-500 rounded-tl-xl" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-teal-500 rounded-tr-xl" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-teal-500 rounded-bl-xl" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-teal-500 rounded-br-xl" />

                {/* Scan Line */}
                <div className="absolute top-0 left-2 right-2 h-1 bg-teal-500/50 shadow-[0_0_15px_rgba(20,184,166,0.8)] animate-scan" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <Zap className="w-12 h-12 text-teal-500/20 animate-pulse" />
                </div>
              </div>
              <p className="mt-10 text-teal-400 font-black uppercase tracking-[0.2em] text-[10px] animate-pulse">Scanning Protocol Active...</p>
              <Button variant="ghost" className="mt-10 text-slate-500 hover:text-white" onClick={() => setScanState("idle")}>
                <X className="w-4 h-4 mr-2" /> Cancel
              </Button>
            </div>
          )}

          {scanState === "found" && (
            <div className="space-y-8 p-10 w-full max-w-sm animate-scale-in">
              <div className="flex flex-col items-center gap-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-2xl shadow-amber-500/20">
                  <User className="w-10 h-10 text-white" />
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white">{scannedUser?.name || 'User'}</h3>
                  <p className="text-stone-500 font-medium">{scannedUser?.email || ''}</p>
                  <Badge className="mt-2 bg-amber-500/10 text-amber-400 border-none px-3 font-bold text-[8px] tracking-widest uppercase">Verified Identity</Badge>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest ml-1">Payment Amount (₹)</label>
                  <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="h-16 text-2xl font-black bg-stone-800/50 border-white/5 text-white rounded-2xl px-6 focus:border-amber-500 transition-all"
                  />
                </div>
                <Button onClick={handlePayment} disabled={!amount || isLoading} className="w-full h-16 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold uppercase tracking-widest text-xs rounded-2xl shadow-xl shadow-amber-500/20 transition-all active:scale-[0.98]">
                  {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                    <div className="flex items-center gap-2">
                      <span>Pay ₹{parseFloat(amount || "0").toFixed(2)}</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  )}
                </Button>
                <Button variant="ghost" className="w-full h-12 text-slate-500 font-bold uppercase text-[10px] tracking-widest" onClick={() => setScanState("idle")}>
                  Try Another Scan
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
