"use client";

import { useState } from "react";
import { Wallet, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, RefreshCw, Layers, Shield, Zap, CircleDollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const cryptoData = [
    { time: "00:00", price: 68200 },
    { time: "04:00", price: 69100 },
    { time: "08:00", price: 70500 },
    { time: "12:00", price: 69800 },
    { time: "16:00", price: 71200 },
    { time: "20:00", price: 72500 },
];

export default function CryptoPage() {
    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-fade-in pb-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tight">Decentralized <span className="text-teal-500">.</span></h1>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-2">Web3 Asset Management & Liquidity</p>
                </div>
                <div className="flex gap-2">
                    <Button className="h-12 bg-white text-slate-950 font-black uppercase tracking-widest text-[10px] rounded-2xl px-6">
                        Deposit Assets
                    </Button>
                    <Button variant="outline" className="h-12 border-white/5 bg-white/5 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl px-6">
                        Bridge Rails
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Holdings Panel */}
                <div className="lg:col-span-4 space-y-6">
                    <Card className="glass-card border-white/5 rounded-[2rem] overflow-hidden">
                        <CardHeader className="p-8 pb-4">
                            <CardTitle className="text-xs font-black text-slate-500 uppercase tracking-widest">Total Crypto Value</CardTitle>
                            <div className="flex items-baseline gap-2">
                                <h3 className="text-4xl font-black text-white tracking-tighter">₹18.42L</h3>
                                <Badge className="bg-teal-500/10 text-teal-400 border-none text-[8px] font-black tracking-widest px-2 py-0">+2.4%</Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="p-8 pt-0 space-y-6">
                            <CryptoAsset name="Bitcoin" symbol="BTC" value="₹72,50,000" holding="0.12 BTC" trend="+4.2%" positive />
                            <CryptoAsset name="Ethereum" symbol="ETH" value="₹3,20,000" holding="2.5 ETH" trend="-1.5%" positive={false} />
                            <CryptoAsset name="Solana" symbol="SOL" value="₹12,400" trend="+12.8%" holding="45 SOL" positive />
                        </CardContent>
                    </Card>

                    <Card className="glass-card border-white/5 rounded-[2rem] p-8 space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                                <Shield className="w-5 h-5 text-purple-400" />
                            </div>
                            <div>
                                <h4 className="text-[10px] font-black text-white uppercase tracking-widest">Cold Storage</h4>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Assets are air-gapped</p>
                            </div>
                        </div>
                        <Button className="w-full h-12 bg-white/5 border border-white/5 text-white font-black uppercase tracking-widest text-[10px] rounded-xl">Manage Keys</Button>
                    </Card>
                </div>

                {/* Market Chart */}
                <Card className="lg:col-span-8 glass-card border-white/5 rounded-[2.5rem] overflow-hidden flex flex-col">
                    <CardHeader className="p-10 pb-0">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                                    <CircleDollarSign className="w-8 h-8" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-white tracking-tight">BTC / INR</h3>
                                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Real-time Trading Feed</p>
                                </div>
                            </div>
                            <div className="text-right font-black">
                                <h3 className="text-2xl text-white tracking-tighter">₹72,50,492</h3>
                                <p className="text-[10px] text-teal-400 uppercase tracking-widest">Market Open</p>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-10 flex-1">
                        <div className="h-full min-h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={cryptoData}>
                                    <defs>
                                        <linearGradient id="cryptoGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#f97316" stopOpacity={0.2} />
                                            <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff03" />
                                    <XAxis
                                        dataKey="time"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#475569', fontSize: 10, fontWeight: 800 }}
                                    />
                                    <YAxis
                                        hide
                                        domain={['dataMin - 1000', 'dataMax + 1000']}
                                    />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #ffffff05', borderRadius: '12px' }}
                                        labelStyle={{ color: '#94a3b8', fontSize: '10px', fontWeight: 800 }}
                                        itemStyle={{ color: '#f97316', fontSize: '10px', fontWeight: 800 }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="price"
                                        stroke="#f97316"
                                        strokeWidth={4}
                                        fillOpacity={1}
                                        fill="url(#cryptoGradient)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                    <div className="p-10 pt-0 border-t border-white/5 flex items-center justify-between gap-4">
                        <div className="grid grid-cols-2 gap-4 flex-1">
                            <Button className="h-14 bg-teal-500 hover:bg-teal-600 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl">Execute Buy</Button>
                            <Button className="h-14 bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500/20 font-black uppercase tracking-widest text-[10px] rounded-2xl">Execute Sell</Button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}

function CryptoAsset({ name, symbol, value, holding, trend, positive }: { name: string, symbol: string, value: string, holding: string, trend: string, positive: boolean }) {
    return (
        <div className="flex items-center justify-between group cursor-pointer pb-6 border-b border-white/5 last:border-0 last:pb-0">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 group-hover:scale-110 transition-transform">
                    {name === "Bitcoin" ? <Zap className="w-5 h-5 text-orange-500" /> : name === "Ethereum" ? <Layers className="w-5 h-5 text-blue-400" /> : <RefreshCw className="w-5 h-5 text-purple-400" />}
                </div>
                <div>
                    <h4 className="text-[10px] font-black text-white uppercase tracking-widest">{name}</h4>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{holding}</p>
                </div>
            </div>
            <div className="text-right">
                <p className="text-xs font-black text-white tracking-widest">{value}</p>
                <p className={cn(
                    "text-[8px] font-black tracking-widest uppercase",
                    positive ? "text-teal-400" : "text-red-400"
                )}>{trend}</p>
            </div>
        </div>
    );
}

function cn(...classes: (string | boolean | undefined | null)[]) {
    return classes.filter(Boolean).join(' ');
}
