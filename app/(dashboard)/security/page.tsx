"use client";

import { Shield, Lock, Eye, Smartphone, Fingerprint, Key, Globe, Bell, AlertTriangle, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function SecurityPage() {
    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-fade-in pb-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tight">Vault Protocol <span className="text-teal-500">.</span></h1>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-2">Military-Grade Asset Protection</p>
                </div>
                <Badge variant="outline" className="h-8 border-teal-500/30 text-teal-400 bg-teal-500/10 font-black tracking-widest uppercase text-[8px] px-4">
                    Security Score: 98%
                </Badge>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main Security Controls */}
                <div className="lg:col-span-8 space-y-6">
                    <Card className="glass-card border-white/5 rounded-[2rem] overflow-hidden">
                        <CardHeader className="p-8 pb-0">
                            <CardTitle className="text-xs font-black text-slate-500 uppercase tracking-widest">Active Defenses</CardTitle>
                        </CardHeader>
                        <CardContent className="p-8 space-y-8">
                            <SecurityToggle
                                icon={<Fingerprint className="w-6 h-6 text-teal-400" />}
                                title="Biometric Authentication"
                                description="Secure every high-value transaction with Touch/Face ID"
                                enabled={true}
                            />
                            <SecurityToggle
                                icon={<Smartphone className="w-6 h-6 text-blue-400" />}
                                title="Two-Factor Identity (2FA)"
                                description="Require a six-digit code from your authenticator app"
                                enabled={true}
                            />
                            <SecurityToggle
                                icon={<Globe className="w-6 h-6 text-purple-400" />}
                                title="Regional Blocking"
                                description="Prevent access from sanctioned or high-risk geo-locations"
                                enabled={false}
                            />
                            <SecurityToggle
                                icon={<Bell className="w-6 h-6 text-orange-400" />}
                                title="Instant Spend Alerts"
                                description="Real-time notifications for every ledger entry"
                                enabled={true}
                            />
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="glass-card border-white/5 rounded-[2rem] p-8 space-y-4">
                            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-teal-400">
                                <Key className="w-6 h-6" />
                            </div>
                            <h3 className="text-sm font-black text-white uppercase tracking-widest">Recovery Seed</h3>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-relaxed">Generated 12-word mnemonic for account rescue.</p>
                            <Button variant="outline" className="w-full h-12 border-white/5 bg-white/5 text-white font-black uppercase tracking-widest text-[10px] rounded-xl">View Seed</Button>
                        </Card>
                        <Card className="glass-card border-white/5 rounded-[2rem] p-8 space-y-4">
                            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-blue-400">
                                <Lock className="w-6 h-6" />
                            </div>
                            <h3 className="text-sm font-black text-white uppercase tracking-widest">Auto-Lock</h3>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-relaxed">Lock financial dashboard after 5 minutes of inactivity.</p>
                            <Button variant="outline" className="w-full h-12 border-white/5 bg-white/5 text-white font-black uppercase tracking-widest text-[10px] rounded-xl">Configure</Button>
                        </Card>
                    </div>
                </div>

                {/* Privacy & Logs */}
                <div className="lg:col-span-4 space-y-6">
                    <Card className="glass-card border-white/5 rounded-[2rem] p-8">
                        <h3 className="text-sm font-black text-white uppercase tracking-widest mb-8">Access Logs</h3>
                        <div className="space-y-6">
                            <AccessLog device="iPhone 15 Pro" location="Mumbai, India" time="Just now" current />
                            <AccessLog device="Chrome (macOS)" location="Pune, India" time="2h ago" />
                            <AccessLog device="Unknown Android" location="Brazil" time="Yesterday" warning />
                        </div>
                        <Button variant="ghost" className="w-full mt-10 text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-white transition-colors">Terminate All Sessions</Button>
                    </Card>

                    <Card className="bg-gradient-to-br from-red-500/10 to-transparent border-red-500/20 rounded-[2rem] p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <AlertTriangle className="w-5 h-5 text-red-500" />
                            <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">Threat Intelligence</span>
                        </div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed">We noticed a login from an unrecognized geographical zone. Please verify your identity.</p>
                    </Card>
                </div>
            </div>
        </div>
    );
}

function SecurityToggle({ icon, title, description, enabled }: { icon: React.ReactNode, title: string, description: string, enabled: boolean }) {
    return (
        <div className="flex items-center justify-between group cursor-pointer">
            <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                    {icon}
                </div>
                <div>
                    <h4 className="text-sm font-black text-white uppercase tracking-widest mb-1">{title}</h4>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest max-w-sm">{description}</p>
                </div>
            </div>
            <div className={cn(
                "w-12 h-6 rounded-full relative transition-all duration-300",
                enabled ? "bg-teal-500 shadow-[0_0_15px_rgba(20,184,166,0.5)]" : "bg-slate-800"
            )}>
                <div className={cn(
                    "absolute top-1 w-4 h-4 rounded-full bg-white transition-all shadow-lg",
                    enabled ? "right-1" : "left-1"
                )} />
            </div>
        </div>
    );
}

function AccessLog({ device, location, time, current, warning }: { device: string, location: string, time: string, current?: boolean, warning?: boolean }) {
    return (
        <div className="flex items-start justify-between">
            <div className="flex gap-4">
                <div className={cn(
                    "w-2 h-2 rounded-full mt-1.5",
                    current ? "bg-teal-500 animate-pulse" : warning ? "bg-red-500" : "bg-slate-700"
                )} />
                <div>
                    <h4 className="text-[10px] font-black text-white uppercase tracking-widest">{device}</h4>
                    <p className="text-[8px] text-slate-500 font-bold uppercase tracking-widest">{location}</p>
                </div>
            </div>
            <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">{time}</span>
        </div>
    );
}

function cn(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}
