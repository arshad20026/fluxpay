"use client";

import { useState, useEffect, useMemo } from "react";
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
    CreditCard,
    Bell,
    Sparkles,
    Zap,
    ChevronRight,
    Hexagon,
    WalletCards,
    PiggyBank,
    Receipt,
    ArrowUpDown,
    Wifi,
    WifiOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import dynamic from "next/dynamic";
import { apiClient } from "@/lib/api-client";
import { useWebSocket } from "@/lib/use-websocket";

const SpendingChart = dynamic(() => import("@/components/spending-chart").then((mod) => mod.SpendingChart), {
    ssr: false,
    loading: () => <div className="h-[300px] w-full glass-card animate-pulse" />,
});

const quickActions = [
    { icon: Send, label: "Send", href: "/send", gradient: "from-amber-500 to-orange-600", shadow: "shadow-amber-500/20" },
    { icon: QrCode, label: "Scan", href: "/scan", gradient: "from-violet-500 to-purple-600", shadow: "shadow-violet-500/20" },
    { icon: Plus, label: "Add Funds", href: "/add-funds", gradient: "from-emerald-500 to-teal-600", shadow: "shadow-emerald-500/20" },
    { icon: ArrowUpDown, label: "Swap", href: "/swap", gradient: "from-pink-500 to-rose-600", shadow: "shadow-pink-500/20" },
];

interface TransactionAPIResponse {
    id: string;
    senderId: string;
    receiverId: string;
    amount: string;
    status: string;
    createdAt: string;
    sender: { name: string; email: string };
    receiver: { name: string; email: string };
}

export default function DashboardPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [balanceVisible, setBalanceVisible] = useState(true);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [userData, setUserData] = useState<{ id: string; email: string; name: string } | null>(null);
    const [realBalance, setRealBalance] = useState<number | null>(null);
    const [realTransactions, setRealTransactions] = useState<Array<{ id: string; amount: number; type: string; date: string; name?: string; status?: string; recipientName?: string; category?: string }>>([]);
    const [showNotification, setShowNotification] = useState(false);
    const [lastNotification, setLastNotification] = useState<{ type: string; payload: { type: string; amount: number; otherParty: string } } | null>(null);
    
    const { isConnected, balance: wsBalance, notifications } = useWebSocket();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    useEffect(() => {
        if (wsBalance !== null) {
            setRealBalance(wsBalance);
        }
    }, [wsBalance]);

    useEffect(() => {
        if (notifications.length > 0) {
            const latest = notifications[0];
            if (latest.type === 'NEW_TRANSACTION') {
                setLastNotification(latest as { type: string; payload: { type: string; amount: number; otherParty: string } });
                setShowNotification(true);
                setTimeout(() => setShowNotification(false), 5000);
            }
        }
    }, [notifications]);

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

                const transformed = historyRes.slice(0, 5).map((t: TransactionAPIResponse) => {
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
            } catch (err: unknown) {
                if (err && typeof err === 'object' && 'status' in err && err.status === 401) return;
                console.error("Failed to fetch dashboard data", err);
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
            const transformed = historyRes.slice(0, 5).map((t: TransactionAPIResponse) => {
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

    const formattedDate = currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

    const stats = [
        { label: "Monthly Spending", value: "₹45,230", change: "+12%", trend: "up" },
        { label: "Active Cards", value: "3", change: "Active", trend: "neutral" },
        { label: "Rewards Points", value: "2,450", change: "+150", trend: "up" },
    ];

    return (
        <div className="space-y-8 animate-fade-in pb-10">
            {/* Real-time Notification Toast */}
            {showNotification && lastNotification && (
                <div className="fixed top-20 right-6 z-50 animate-slide-up">
                    <div className="glass-card premium-card border-amber-500/30 rounded-2xl p-4 shadow-xl shadow-amber-500/20 max-w-sm">
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center">
                                {lastNotification.payload.type === 'received' ? (
                                    <ArrowDownLeft className="w-5 h-5 text-white" />
                                ) : (
                                    <ArrowUpRight className="w-5 h-5 text-white" />
                                )}
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-bold text-white">
                                    {lastNotification.payload.type === 'received' ? 'Money Received!' : 'Money Sent!'}
                                </p>
                                <p className="text-xs text-stone-400">
                                    {lastNotification.payload.type === 'received' ? 'You received' : 'You sent'} ₹{lastNotification.payload.amount} {lastNotification.payload.type === 'received' ? 'from' : 'to'} {lastNotification.payload.otherParty}
                                </p>
                            </div>
                            <button onClick={() => setShowNotification(false)} className="text-stone-500 hover:text-white">
                                <Sparkles className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="animate-slide-up">
                    <p className="text-amber-500/60 font-medium tracking-widest text-[10px] mb-2 uppercase">{formattedDate}</p>
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                        Welcome back<span className="text-amber-500">,</span>
                    </h1>
                    <p className="text-stone-400 mt-2 font-medium">{userData?.name?.split(' ')[0] || 'Member'}</p>
                </div>
                <div className="flex items-center gap-3 animate-slide-up delay-100">
                    {/* Connection Status */}
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border ${isConnected ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
                        {isConnected ? (
                            <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                            <WifiOff className="w-3.5 h-3.5 text-red-400" />
                        )}
                        <span className={`text-[10px] font-medium ${isConnected ? 'text-emerald-400' : 'text-red-400'}`}>
                            {isConnected ? 'Live' : 'Offline'}
                        </span>
                    </div>
                    <Button
                        variant="ghost"
                        onClick={handleRefresh}
                        className="bg-stone-800/50 hover:bg-stone-800 text-stone-300 font-medium px-5 h-11 rounded-xl transition-all border border-white/5"
                    >
                        <Clock className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                        {isLoading ? 'Syncing...' : 'Refresh'}
                    </Button>
                    <button className="relative w-11 h-11 rounded-xl bg-stone-800/50 flex items-center justify-center hover:bg-stone-800 transition-all border border-white/5 group">
                        <Bell className="w-5 h-5 text-stone-400 group-hover:text-white" />
                        <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-amber-500 rounded-full" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <Card className="lg:col-span-8 glass-card premium-card rounded-3xl overflow-hidden relative group border-amber-500/10">
                    <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-amber-500/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                    <CardContent className="p-8 sm:p-10 relative">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-10">
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-lg bg-amber-500/20 flex items-center justify-center">
                                        <Wallet className="w-3.5 h-3.5 text-amber-400" />
                                    </div>
                                    <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Total Balance</span>
                                </div>

                                <div className="space-y-1">
                                    <div className="flex items-center gap-4">
                                        {balanceVisible ? (
                                            <h2 className="text-5xl sm:text-6xl font-black text-white tracking-tight">
                                                ₹{realBalance !== null ? realBalance.toLocaleString('en-IN') : "0.00"}
                                            </h2>
                                        ) : (
                                            <h2 className="text-5xl sm:text-6xl font-black text-stone-700 tracking-tight">••••••••</h2>
                                        )}
                                        <button
                                            onClick={() => setBalanceVisible(!balanceVisible)}
                                            className="w-10 h-10 rounded-xl bg-stone-800 flex items-center justify-center hover:bg-stone-700 transition-colors border border-white/5"
                                        >
                                            {balanceVisible ? (
                                                <Wallet className="w-5 h-5 text-stone-400" />
                                            ) : (
                                                <Sparkles className="w-5 h-5 text-stone-400" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-1.5 px-3 py--em1.5 bgerald-500/10 rounded-full border border-emerald-500/20">
                                        <TrendingUp className="w-3 h-3 text-emerald-400" />
                                        <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">+4.2%</span>
                                    </div>
                                    <p className="text-[10px] text-stone-500 font-medium">{userData?.email}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <p className="text-[10px] text-stone-500 font-bold uppercase tracking-widest mb-1">Your QR Code</p>
                                    <div className="w-28 h-28 p-3 bg-stone-800/80 rounded-2xl border border-white/10 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-stone-800 transition-all hover:scale-105">
                                        <QrCode className="w-14 h-14 text-white" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {quickActions.map((action, i) => (
                                <Link key={action.label} href={action.href}>
                                    <div className={`h-24 flex flex-col items-center justify-center gap-2 rounded-2xl bg-stone-800/40 border border-white/5 hover:bg-stone-800/60 transition-all duration-300 group/btn shadow-xl ${action.shadow} hover:-translate-y-1`}>
                                        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${action.gradient} flex items-center justify-center shadow-lg transform group-hover/btn:scale-110 transition-transform`}>
                                            <action.icon className="w-5 h-5 text-white" />
                                        </div>
                                        <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider">{action.label}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <div className="lg:col-span-4 space-y-4 animate-slide-up delay-200">
                    <Card className="glass-card premium-card rounded-3xl border-amber-500/10 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Quick Stats</h3>
                            <button className="text-stone-500 hover:text-white transition-colors"><MoreHorizontal className="w-5 h-5" /></button>
                        </div>

                        <div className="space-y-5">
                            {stats.map((stat, i) => (
                                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-stone-800/30 border border-white/5">
                                    <div>
                                        <p className="text-[10px] text-stone-500 font-medium uppercase tracking-wider mb-1">{stat.label}</p>
                                        <p className="text-lg font-bold text-white">{stat.value}</p>
                                    </div>
                                    <div className={`text-xs font-bold px-2 py-1 rounded-lg ${
                                        stat.trend === 'up' ? 'bg-emerald-500/10 text-emerald-400' : 
                                        stat.trend === 'down' ? 'bg-red-500/10 text-red-400' : 
                                        'bg-stone-700 text-stone-400'
                                    }`}>
                                        {stat.change}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Button className="w-full mt-6 h-11 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold text-sm hover:from-amber-600 hover:to-orange-700 transition-all shadow-lg shadow-amber-500/20">
                            View Full Report
                        </Button>
                    </Card>

                    <Card className="glass-card premium-card rounded-3xl border-amber-500/10 p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                                <WalletCards className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-white">Your Cards</p>
                                <p className="text-[10px] text-stone-500">2 Virtual • 1 Physical</p>
                            </div>
                        </div>
                        <div className="h-20 rounded-xl bg-gradient-to-br from-stone-800 to-stone-900 border border-white/10 p-4 flex flex-col justify-between relative overflow-hidden">
                            <div className="absolute -right-4 -top-4 w-20 h-20 bg-amber-500/10 rounded-full blur-xl" />
                            <div className="flex justify-between items-start">
                                <span className="text-[10px] text-stone-400 font-medium">FluxPay</span>
                                <CreditCard className="w-5 h-5 text-stone-500" />
                            </div>
                            <span className="text-sm font-mono text-stone-300">•••• 4829</span>
                        </div>
                    </Card>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-8 space-y-6">
                    <div className="glass-card premium-card rounded-3xl p-8 border-amber-500/10">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-xl font-bold text-white tracking-tight">Spending Overview</h3>
                                <p className="text-xs text-stone-500 mt-1">Your financial activity this month</p>
                            </div>
                            <div className="flex gap-2">
                                <button className="px-4 py-2 rounded-xl text-xs font-medium text-stone-400 hover:text-white hover:bg-stone-800 transition-all">Week</button>
                                <button className="px-4 py-2 rounded-xl text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">Month</button>
                                <button className="px-4 py-2 rounded-xl text-xs font-medium text-stone-400 hover:text-white hover:bg-stone-800 transition-all">Year</button>
                            </div>
                        </div>
                        <SpendingChart />
                    </div>

                    <Card className="glass-card premium-card rounded-3xl border-amber-500/10 overflow-hidden shadow-2xl">
                        <CardHeader className="flex flex-row items-center justify-between p-8 pb-4">
                            <div>
                                <CardTitle className="text-xl font-bold text-white tracking-tight">Recent Transactions</CardTitle>
                                <p className="text-[10px] text-stone-500 font-medium uppercase tracking-widest mt-1">Your latest activity</p>
                            </div>
                            <Button variant="ghost" size="sm" asChild className="text-amber-400 font-semibold text-xs hover:bg-amber-500/10">
                                <Link href="/transactions" className="flex items-center gap-1">View All <ChevronRight className="w-3.5 h-3.5" /></Link>
                            </Button>
                        </CardHeader>
                        <CardContent className="px-4 pb-8">
                            <div className="space-y-1">
                                {realTransactions.length > 0 ? (
                                    realTransactions.map((t, i) => (
                                        <div key={t.id} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-stone-800/40 transition-all group">
                                            <div className="w-12 h-12 rounded-xl bg-stone-800 border border-white/5 flex items-center justify-center flex-shrink-0">
                                                {t.type === "received" ? (
                                                    <ArrowDownLeft className="w-5 h-5 text-emerald-400" />
                                                ) : (
                                                    <ArrowUpRight className="w-5 h-5 text-rose-400" />
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-semibold text-white truncate">{t.name}</p>
                                                <p className="text-[10px] text-stone-500 font-medium">{t.date} • {t.status}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className={`text-sm font-bold tracking-tight ${t.type === "received" ? "text-emerald-400" : "text-white"}`}>
                                                    {t.type === "received" ? "+" : "-"}₹{Math.abs(t.amount).toLocaleString('en-IN')}
                                                </p>
                                                <Badge className={`text-[8px] font-medium uppercase tracking-wider px-2 py-0.5 border-none ${t.type === "received" ? "bg-emerald-500/10 text-emerald-400" : "bg-stone-700 text-stone-400"}`}>
                                                    {t.type}
                                                </Badge>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="py-20 text-center opacity-40">
                                        <Receipt className="w-10 h-10 text-stone-600 mx-auto mb-4" />
                                        <p className="text-xs font-medium text-stone-500">No transactions yet</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-4 space-y-6">
                    <Card className="glass-card premium-card rounded-3xl border-amber-500/10 p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
                                <PiggyBank className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-white">Savings Goal</p>
                                <p className="text-[10px] text-stone-500">₹50,000 / ₹1,00,000</p>
                            </div>
                        </div>
                        <div className="h-2 w-full bg-stone-800 rounded-full overflow-hidden">
                            <div className="h-full w-[50%] bg-gradient-to-r from-pink-500 to-rose-500 rounded-full" />
                        </div>
                        <p className="text-[10px] text-stone-500 mt-3 font-medium">50% completed • 5 months left</p>
                    </Card>

                    <Card className="glass-card premium-card rounded-3xl border-amber-500/10 p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                                <Zap className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-white">Quick Transfer</p>
                                <p className="text-[10px] text-stone-500">Send to favorite contacts</p>
                            </div>
                        </div>
                        <div className="flex -space-x-3 mb-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-10 h-10 rounded-full bg-stone-700 border-2 border-stone-900 flex items-center justify-center text-xs font-bold text-white">
                                    {String.fromCharCode(64 + i)}
                                </div>
                            ))}
                            <button className="w-10 h-10 rounded-full bg-stone-800 border-2 border-stone-900 flex items-center justify-center">
                                <Plus className="w-4 h-4 text-stone-400" />
                            </button>
                        </div>
                        <Button className="w-full h-10 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-medium text-sm transition-all border border-white/5">
                            Send to Someone New
                        </Button>
                    </Card>
                </div>
            </div>
        </div>
    );
}
