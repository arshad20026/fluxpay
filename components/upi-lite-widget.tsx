"use client";

import React from 'react';
import { Zap, ArrowRight, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface UPILiteWidgetProps {
  balance?: number;
  onTopUp?: () => void;
  onQuickPay?: () => void;
}

export function UPILiteWidget({
  balance = 250.00,
  onTopUp,
  onQuickPay
}: UPILiteWidgetProps) {
  return (
    <Card className="glass-card rounded-[2rem] overflow-hidden relative group border-white/5">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-teal-500/5 pointer-events-none" />

      <CardContent className="p-7 relative">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-md font-black text-white uppercase tracking-widest flex items-center gap-2">
                UPI Lite
                <Badge className="text-[8px] px-1.5 py-0 bg-teal-500/20 text-teal-400 border-none font-bold tracking-[0.2em]">INSTANT</Badge>
              </h3>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">No PIN • Safe</p>
            </div>
          </div>
          <TrendingUp className="w-4 h-4 text-teal-400" />
        </div>

        <div className="mb-6">
          <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1.5 opacity-60">Balance Equity</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-white tracking-tighter">₹{balance.toFixed(2)}</span>
            <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">/ ₹500</span>
          </div>

          {/* Progress bar */}
          <div className="mt-4 h-2 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-teal-500 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${(balance / 500) * 100}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={onQuickPay}
            className="h-11 bg-white text-slate-900 hover:bg-slate-200 font-black uppercase text-[10px] tracking-widest rounded-xl transition-all active:scale-95"
          >
            Quick Pay
          </Button>
          <Button
            onClick={onTopUp}
            variant="ghost"
            className="h-11 bg-white/5 border border-white/5 text-white hover:bg-white/10 font-black uppercase text-[10px] tracking-widest rounded-xl transition-all"
          >
            Top Up
          </Button>
        </div>

        <div className="mt-6 pt-5 border-t border-white/5">
          <button className="w-full text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-indigo-400 transition-colors flex items-center justify-center gap-2 group">
            Transaction History
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
