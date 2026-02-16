"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
    ArrowUpRight,
    ArrowDownLeft,
    Send,
    Plus,
    Clock,
    MoreHorizontal,
    TrendingUp,
    Wallet,
    QrCode,
    Smartphone,
    CreditCard,
    Bell,
    Sparkles,
    Zap,
    ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UPILiteWidget } from "@/components/upi-lite-widget";
import { MarketNewsWidget } from "@/components/market-news-widget";
import dynamic from "next/dynamic";
import { apiClient } from "@/lib/api-client";

const SpendingChart = dynamic(() => import("@/components/spending-chart").then((mod) => mod.SpendingChart), {
    ssr: false,
    loading: () => <div className="h-[300px] w-full glass-card animate-pulse" />,
});

const quickActions = [
    { icon: Send, label: "Send", href: "/send", gradient: "from-teal-500 to-teal-600", shadow: "shadow-teal-500/20" },
    { icon: QrCode, label: "Scan", href: "/scan", gradient: "from-purple-500 to-indigo-600", shadow: "shadow-purple-500/20" },
    { icon: Plus, label: "Add", href: "/add-funds", gradient: "from-blue-500 to-blue-600", shadow: "shadow-blue-500/20" },
    { icon: MoreHorizontal, label: "More", href: "/dashboard", gradient: "from-slate-700 to-slate-800", shadow: "shadow-slate-500/20" },
];

export default function DashboardPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [balanceVisible, setBalanceVisible] = useState(true);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [userData, setUserData] = useState<any>(null);
    const [realBalance, setRealBalance] = useState<number | null>(null);
    const [realTransactions, setRealTransactions] = useState<any[]>([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "/login";
            return;
        }

        const user = JSON.parse(localStorage.getItem("user") || "{}");
        setUserData(user);

        const fetchData = async () => {
            try {
                const [balanceRes, historyRes] = await Promise.all([
                    apiClient.get("/user/balance"),
                    apiClient.get("/transaction/history")
                ]);

                setRealBalance(balanceRes.balance);

                const transformed = historyRes.slice(0, 5).map((t: any) => {
                    const isSent = t.senderId === user.id;
                    const otherUser = isSent ? t.receiver : t.sender;
                    return {
                        id: t.id,
                        name: otherUser.name,
                        email: otherUser.email,
                        amount: isSent ? -parseFloat(t.amount) : parseFloat(t.amount),
                        type: isSent ? "sent" : "received",
                        date: new Date(t.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        status: t.status.toLowerCase(),
                        avatar: otherUser.name.split(' ').map((n: string) => n[0]).join(''),
                    };
                });
                setRealTransactions(transformed);
            } catch (error) {
                console.error("Failed to fetch dashboard data", error);
            }
        };

        fetchData();
        const timer = setInterval(() => setCurrentTime(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    const handleRefresh = async () => {
        setIsLoading(true);
        try {
            const [balanceRes, historyRes] = await Promise.all([
                apiClient.get("/user/balance"),
                apiClient.get("/transaction/history")
            ]);
            setRealBalance(balanceRes.balance);

            const user = JSON.parse(localStorage.getItem("user") || "{}");
            const transformed = historyRes.slice(0, 5).map((t: any) => {
                const isSent = t.senderId === user.id;
                const otherUser = isSent ? t.receiver : t.sender;
                return {
                    id: t.id,
                    name: otherUser.name,
                    email: otherUser.email,
                    amount: isSent ? -parseFloat(t.amount) : parseFloat(t.amount),
                    type: isSent ? "sent" : "received",
                    date: new Date(t.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    status: t.status.toLowerCase(),
                    avatar: otherUser.name.split(' ').map((n: string) => n[0]).join(''),
                };
            });
            setRealTransactions(transformed);
        } catch (error) {
            console.error("Refresh failed", error);
        } finally {
            setIsLoading(false);
        }
    };

    const formattedDate = currentTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

    return (
        <div className="space-y-8 animate-fade-in pb-10">
            {/* Header with Greeting and Actions */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="animate-slide-up">
                    <p className="text-teal-400 font-black uppercase tracking-[0.2em] text-[10px] mb-2 px-1">Overview • {formattedDate}</p>
                    <h1 className="text-4xl font-black text-white tracking-tight">
                        Hello, {userData?.name?.split(' ')[0] || 'Member'} <span className="text-teal-500">.</span>
                    </h1>
                </div>
                <div className="flex items-center gap-3 animate-slide-up delay-100">
                    <Button
                        variant="ghost"
                        onClick={handleRefresh}
                        className="bg-white/5 hover:bg-white/10 text-slate-300 font-bold px-4 h-12 rounded-2xl transition-all"
                    >
                        <Clock className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                        Syncing
                    </Button>
                    <button className="relative w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all group">
                        <Bell className="w-5 h-5 text-slate-400 group-hover:text-white" />
                        <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-950" />
                    </button>
                </div>
            </div>

            {/* Main Balance Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <Card className="lg:col-span-8 glass-card rounded-[2.5rem] overflow-hidden relative group border-white/5 shadow-2xl animate-scale-in">
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:bg-teal-500/15 transition-all duration-700" />

                    <CardContent className="p-8 sm:p-10 relative">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <Badge className="bg-teal-500/20 text-teal-400 border-none px-3 font-bold text-[10px] tracking-widest uppercase">Premium Identity</Badge>
                                    <Sparkles className="w-4 h-4 text-teal-400 animate-pulse" />
                                </div>

                                <div className="space-y-1">
                                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest ml-1">Total Available Equity</p>
                                    <div className="flex items-center gap-4">
                                        {balanceVisible ? (
                                            <h2 className="text-5xl sm:text-7xl font-black text-white tracking-tighter">
                                                ₹{realBalance !== null ? realBalance.toLocaleString('en-IN') : "0.00"}
                                            </h2>
                                        ) : (
                                            <h2 className="text-5xl sm:text-7xl font-black text-slate-800 tracking-tighter">••••••••</h2>
                                        )}
                                        <button
                                            onClick={() => setBalanceVisible(!balanceVisible)}
                                            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                                        >
                                            <Wallet className="w-5 h-5 text-slate-500" />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="px-3 py-1 bg-white/5 rounded-full border border-white/5 flex items-center gap-2">
                                        <TrendingUp className="w-3 h-3 text-teal-400" />
                                        <span className="text-[10px] font-black text-teal-400 uppercase tracking-widest">+4.2%</span>
                                    </div>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{userData?.email}</p>
                                </div>
                            </div>

                            {/* Mini QR Preview */}
                            <div className="w-32 h-32 p-3 bg-white/10 rounded-3xl border border-white/10 backdrop-blur-md flex flex-col items-center justify-center gap-2 group/qr cursor-pointer hover:bg-white/15 transition-all">
                                <QrCode className="w-12 h-12 text-white group-hover/qr:scale-110 transition-transform" />
                                <span className="text-[8px] font-black text-white uppercase tracking-widest opacity-60">My FastPay QR</span>
                            </div>
                        </div>

                        {/* Quick Actions Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {quickActions.map((action, i) => (
                                <Link key={action.label} href={action.href}>
                                    <div className={`h-24 flex flex-col items-center justify-center gap-2 rounded-[1.5rem] bg-white/5 border border-white/5 hover:bg-white/10 transition-all duration-300 group/btn shadow-xl ${action.shadow} hover:-translate-y-1`}>
                                        <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${action.gradient} flex items-center justify-center shadow-lg transform group-hover/btn:rotate-12 transition-transform`}>
                                            <action.icon className="w-5 h-5 text-white" />
                                        </div>
                                        <span className="text-[10px] font-black text-white uppercase tracking-widest opacity-60 group-hover/btn:opacity-100 transition-opacity">{action.label}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Side Stats Section */}
                <div className="lg:col-span-4 space-y-4 animate-slide-up delay-200">
                    <Card className="glass-card rounded-[2rem] border-white/5 p-6 h-full flex flex-col justify-between">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-sm font-black text-white uppercase tracking-widest px-1">Card Insights</h3>
                            <button className="text-teal-400 hover:text-white transition-colors"><MoreHorizontal className="w-5 h-5" /></button>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Monthly Limit</p>
                                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full w-[65%] bg-gradient-to-r from-teal-500 to-blue-500 rounded-full" />
                                </div>
                                <div className="flex justify-between text-[10px] font-bold text-slate-400">
                                    <span>₹65,240 spent</span>
                                    <span>₹100,000</span>
                                </div>
                            </div>

                            <Card className="bg-white/5 border-white/5 rounded-2xl p-4 flex items-center gap-4 group hover:bg-white/10 transition-colors">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                                    <CreditCard className="w-6 h-6 text-white" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-[10px] text-slate-500 font-black tracking-widest uppercase mb-1">Virtual Card</p>
                                    <p className="text-xs font-bold text-white tracking-widest">•••• 8291</p>
                                </div>
                                <ChevronRight className="w-4 h-4 text-slate-600 group-hover:translate-x-1 transition-transform" />
                            </Card>
                        </div>

                        <Button className="w-full mt-6 h-12 rounded-2xl bg-white text-slate-950 font-black uppercase text-[10px] tracking-widest hover:bg-slate-200 transition-all">
                            Manage Finances
                        </Button>
                    </Card>
                </div>
            </div>

            {/* Bottom Section: Charts & History */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-8 space-y-6">
                    <div className="glass-card rounded-[2.5rem] p-8">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-xl font-bold text-white tracking-tight">Spending Trends</h3>
                                <p className="text-xs text-slate-500 mt-1">Cashflow analysis for February 2026</p>
                            </div>
                            <div className="flex gap-2">
                                <Badge className="bg-white/5 border-white/5 text-slate-300 hover:bg-white/10 transition-colors px-3 py-1 rounded-full cursor-pointer">Week</Badge>
                                <Badge className="bg-teal-500/10 border-teal-500/20 text-teal-400 px-3 py-1 rounded-full cursor-pointer">Month</Badge>
                            </div>
                        </div>
                        <SpendingChart />
                    </div>

                    <Card className="glass-card rounded-[2.5rem] border-white/5 overflow-hidden shadow-2xl">
                        <CardHeader className="flex flex-row items-center justify-between p-8 pb-4">
                            <div>
                                <CardTitle className="text-xl font-black text-white tracking-tight">Recent Activity</CardTitle>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Live Transaction Stream</p>
                            </div>
                            <Button variant="ghost" size="sm" asChild className="text-teal-400 font-black uppercase tracking-widest text-[10px] hover:bg-teal-500/10">
                                <Link href="/transactions" className="flex items-center gap-1">Full Ledger <ChevronRight className="w-3.5 h-3.5" /></Link>
                            </Button>
                        </CardHeader>
                        <CardContent className="px-4 pb-8">
                            <div className="space-y-1">
                                {realTransactions.length > 0 ? (
                                    realTransactions.map((t, i) => (
                                        <div key={t.id} className="flex items-center gap-4 p-4 rounded-3xl hover:bg-white/5 transition-all group">
                                            <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-white/5 flex items-center justify-center flex-shrink-0 text-slate-400 font-black text-xs shadow-inner uppercase">{t.avatar}</div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-bold text-white truncate">{t.name}</p>
                                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{t.date} • Secured Payment</p>
                                            </div>
                                            <div className="text-right">
                                                <p className={`text-sm font-black tracking-tight ${t.type === "received" ? "text-teal-400" : "text-white"}`}>{t.type === "received" ? "+" : "-"}₹{Math.abs(t.amount).toLocaleString('en-IN')}</p>
                                                <Badge className={`text-[8px] font-black uppercase tracking-widest px-1.5 py-0 border-none ${t.type === "received" ? "bg-teal-500/20 text-teal-400" : "bg-white/5 text-slate-500"}`}>{t.type}</Badge>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="py-20 text-center opacity-40">
                                        <Zap className="w-10 h-10 text-slate-700 mx-auto mb-4" />
                                        <p className="text-xs font-black uppercase tracking-widest text-slate-500">Scanning for transactions...</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-4 space-y-6">
                    <UPILiteWidget balance={250.0} onTopUp={() => { }} onQuickPay={() => { }} />
                    <MarketNewsWidget />

                    {/* Security Tip Widget */}
                    <div className="p-6 rounded-[2rem] bg-gradient-to-br from-blue-600/10 to-transparent border border-blue-500/20">
                        <Shield className="w-8 h-8 text-blue-400 mb-4" />
                        <h4 className="text-sm font-bold text-white mb-2">Security Advisory</h4>
                        <p className="text-xs text-slate-500 leading-relaxed mb-4">You have 2 connected devices that haven't been verified. Review them in the Security Center.</p>
                        <Link href="/security" className="text-[10px] font-black uppercase tracking-widest text-blue-400 hover:text-blue-300 transition-colors">Resolve Now →</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Shield({ className }: { className?: string }) {
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
            <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 .76-.97l8-2a1 1 0 0 1 .48 0l8 2A1 1 0 0 1 20 6v7z" />
        </svg>
    );
}
