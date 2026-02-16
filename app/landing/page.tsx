"use client";

import Link from "next/link";
import { Wallet, ArrowRight, Shield, Zap, Smartphone, ChevronRight, Play, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function LandingPage() {
    return (
        <div className="flex flex-col min-h-screen overflow-hidden bg-transparent">
            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#020617]/60 backdrop-blur-2xl">
                <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3 group cursor-pointer">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center shadow-lg shadow-teal-500/20 group-hover:rotate-6 transition-transform">
                            <Wallet className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-black text-white tracking-tight uppercase">FluxPay</span>
                    </div>

                    <div className="hidden md:flex items-center gap-8">
                        <Link href="#features" className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors">Features</Link>
                        <Link href="#security" className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors">Security</Link>
                        <Link href="#developers" className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors">Alpha</Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link href="/login" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors">Sign In</Link>
                        <Button asChild className="bg-white text-slate-950 hover:bg-slate-200 rounded-xl px-6 font-black uppercase tracking-widest text-[10px] h-10 transition-all active:scale-95">
                            <Link href="/signup">Join Now</Link>
                        </Button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-40">
                {/* Background Gradients */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-full bg-teal-500/10 blur-[120px] rounded-full pointer-events-none opacity-40" />

                <div className="container mx-auto px-6 relative">
                    <div className="max-w-4xl mx-auto text-center">
                        <Badge variant="outline" className="mb-8 px-4 py-2 border-white/10 bg-white/5 text-teal-400 animate-fade-in font-bold tracking-widest text-[10px] uppercase">
                            <Sparkles className="w-3.5 h-3.5 mr-2" />
                            The New Standard for Digital Value
                        </Badge>

                        <h1 className="text-6xl lg:text-8xl font-black text-white tracking-tighter mb-8 leading-[0.9] animate-slide-up">
                            Move value at the <br /> <span className="text-teal-500">speed of thought.</span>
                        </h1>

                        <p className="text-lg text-slate-500 mb-10 leading-relaxed max-w-2xl mx-auto animate-slide-up delay-100 font-medium">
                            Experience the future of peer-to-peer equity transfers. Secure, instant, and wrapped in a world-class interface.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up delay-200">
                            <Button asChild size="lg" className="h-14 px-10 bg-gradient-to-r from-teal-500 to-blue-600 text-white hover:from-teal-600 hover:to-blue-700 rounded-2xl font-black uppercase tracking-widest text-xs group shadow-xl shadow-teal-500/20">
                                <Link href="/signup" className="flex items-center">
                                    Claim your identity
                                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </Button>
                            <Button variant="ghost" size="lg" className="h-14 px-8 rounded-2xl border border-white/10 font-black uppercase tracking-widest text-[10px] text-white hover:bg-white/5 group">
                                <Play className="w-4 h-4 mr-2 fill-teal-500 stroke-teal-500 group-hover:scale-110 transition-transform" />
                                Interactive Demo
                            </Button>
                        </div>

                        {/* Financial Network Icons */}
                        <div className="mt-20 pt-20 border-t border-white/5 flex flex-wrap justify-center gap-12 opacity-20 grayscale hover:opacity-40 hover:grayscale-0 transition-all duration-700">
                            <span className="text-2xl font-black tracking-tighter">VISA</span>
                            <span className="text-2xl font-black tracking-tighter">STRIPE</span>
                            <span className="text-2xl font-black tracking-tighter">APPLE PAY</span>
                            <span className="text-2xl font-black tracking-tighter">BITCOIN</span>
                            <span className="text-2xl font-black tracking-tighter">PLAD</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Display */}
            <section id="features" className="py-32 relative">
                <div className="container mx-auto px-6">
                    <div className="mb-20">
                        <h2 className="text-4xl font-black text-white mb-4 tracking-tight">Engineered for the elite.</h2>
                        <p className="text-slate-500 max-w-xl font-medium">Modern utilities designed to provide a seamless financial experience across all your digital assets.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <FeatureCard
                            icon={<Zap className="w-6 h-6 text-teal-400" />}
                            title="Zero Latency"
                            description="Transfer value globally in under 400ms. Our distributed ledger ensures instant finality with zero friction."
                        />
                        <FeatureCard
                            icon={<Shield className="w-6 h-6 text-blue-400" />}
                            title="AES-256 Vault"
                            description="Your assets are stored in hardware-secured vaults with multi-sig biometric authorization."
                        />
                        <FeatureCard
                            icon={<Smartphone className="w-6 h-6 text-purple-400" />}
                            title="Unified Rails"
                            description="Connect any bank account, crypto wallet, or digital asset to a single unified interface."
                        />
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-32 relative">
                <div className="container mx-auto px-6">
                    <div className="glass-card rounded-[3rem] p-12 lg:p-24 text-center relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:bg-teal-500/20 transition-all duration-700" />
                        <h2 className="text-5xl lg:text-7xl font-black text-white mb-8 tracking-tighter leading-[0.9]">Start your financial <br /> evolution today.</h2>
                        <p className="text-slate-500 text-lg mb-12 max-w-xl mx-auto font-medium">Join 2M+ users who have כבר upgraded their financial stack to FluxPay.</p>
                        <Button asChild size="lg" className="h-16 px-12 bg-white text-slate-950 hover:bg-slate-200 rounded-[1.5rem] font-black uppercase tracking-widest text-sm shadow-2xl">
                            <Link href="/signup">Open Infinite Account</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-20 border-t border-white/5">
                <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
                            <Wallet className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-lg font-black text-white uppercase tracking-tighter">FluxPay</span>
                    </div>

                    <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">© 2026 FLUXPAY INC. PROTOCOL VER 4.0.2</p>

                    <div className="flex gap-8">
                        <Link href="#" className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors">Privacy</Link>
                        <Link href="#" className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors">Terms</Link>
                        <Link href="#" className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors">Security</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <div className="p-10 rounded-[2.5rem] glass-card border-white/5 group hover:bg-white/10 transition-all duration-500 hover:-translate-y-2">
            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/5 group-hover:scale-110 transition-transform duration-500 shadow-inner">
                {icon}
            </div>
            <h3 className="text-xl font-black text-white mb-4 tracking-tight">{title}</h3>
            <p className="text-slate-500 leading-relaxed font-medium text-sm">{description}</p>
            <div className="mt-8">
                <Link href="#" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-teal-400 hover:text-white transition-all group/link">
                    Protocol Details <ChevronRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                </Link>
            </div>
        </div>
    );
}
