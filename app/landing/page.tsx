"use client";

import Link from "next/link";
import { Wallet, ArrowRight, Shield, Zap, Smartphone, ChevronRight, Play, Hexagon, Lock, CreditCard, Globe, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function LandingPage() {
    return (
        <div className="flex flex-col min-h-screen overflow-hidden bg-transparent">
            <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#0c0a09]/80 backdrop-blur-2xl">
                <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3 group cursor-pointer">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
                            <Hexagon className="w-5 h-5 text-white fill-white/20" />
                        </div>
                        <div>
                            <span className="text-xl font-bold text-white tracking-tight uppercase">FluxPay</span>
                            <p className="text-[8px] text-amber-500/60 font-medium tracking-widest uppercase">Digital Wallet</p>
                        </div>
                    </div>

                    <div className="hidden md:flex items-center gap-8">
                        <Link href="#features" className="text-xs font-medium text-stone-400 hover:text-white transition-colors">Features</Link>
                        <Link href="#security" className="text-xs font-medium text-stone-400 hover:text-white transition-colors">Security</Link>
                        <Link href="#pricing" className="text-xs font-medium text-stone-400 hover:text-white transition-colors">Pricing</Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link href="/login" className="text-xs font-medium text-stone-400 hover:text-white transition-colors">Sign In</Link>
                        <Button asChild className="bg-white text-stone-950 hover:bg-stone-200 rounded-xl px-6 font-semibold text-xs transition-all active:scale-95">
                            <Link href="/signup">Get Started</Link>
                        </Button>
                    </div>
                </div>
            </nav>

            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-40">
                <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full">
                    <div className="absolute top-0 left-1/4 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px]" />
                    <div className="absolute top-40 right-1/4 w-48 h-48 bg-violet-500/10 rounded-full blur-[60px]" />
                </div>

                <div className="container mx-auto px-6 relative">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-stone-800/50 border border-white/5 mb-8">
                            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                            <span className="text-xs font-medium text-stone-300">Trusted by 2M+ users worldwide</span>
                        </div>

                        <h1 className="text-5xl lg:text-7xl font-black text-white mb-6 leading-tight animate-slide-up">
                            The future of <br />
                            <span className="text-gradient-gold">digital payments</span>
                        </h1>

                        <p className="text-lg text-stone-400 mb-10 leading-relaxed max-w-2xl mx-auto animate-slide-up delay-100 font-medium">
                            Experience seamless transactions with FluxPay. Send money instantly, manage your finances, and earn rewards — all in one beautiful app.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up delay-200">
                            <Button asChild size="lg" className="h-13 px-10 bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:from-amber-600 hover:to-orange-700 rounded-2xl font-bold text-sm group shadow-xl shadow-amber-500/20">
                                <Link href="/signup" className="flex items-center">
                                    Create Free Account
                                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </Button>
                            <Button variant="ghost" size="lg" className="h-13 px-8 rounded-2xl border border-white/10 font-medium text-sm text-white hover:bg-white/5 group">
                                <Play className="w-4 h-4 mr-2 fill-white" />
                                Watch Demo
                            </Button>
                        </div>

                        <div className="mt-16 flex flex-wrap justify-center gap-8 opacity-30 grayscale">
                            <div className="flex items-center gap-2">
                                <Globe className="w-6 h-6" />
                                <span className="text-lg font-bold">Visa</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CreditCard className="w-6 h-6" />
                                <span className="text-lg font-bold">Mastercard</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Shield className="w-6 h-6" />
                                <span className="text-lg font-bold">Razorpay</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Zap className="w-6 h-6" />
                                <span className="text-lg font-bold">UPI</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="features" className="py-32 relative">
                <div className="container mx-auto px-6">
                    <div className="mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">Everything you need</h2>
                        <p className="text-stone-400 max-w-xl font-medium">Powerful features to manage your money with ease and security.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="group p-8 rounded-3xl glass-card border-white/5 hover:bg-stone-800/50 transition-all duration-500 hover:-translate-y-2">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-600/20 flex items-center justify-center mb-6 border border-amber-500/20 group-hover:scale-110 transition-transform duration-500">
                                <Zap className="w-7 h-7 text-amber-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Instant Transfers</h3>
                            <p className="text-stone-400 leading-relaxed font-medium text-sm">Send money to anyone, anywhere in seconds. No waiting, no hassle.</p>
                        </div>

                        <div className="group p-8 rounded-3xl glass-card border-white/5 hover:bg-stone-800/50 transition-all duration-500 hover:-translate-y-2">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500/20 to-purple-600/20 flex items-center justify-center mb-6 border border-violet-500/20 group-hover:scale-110 transition-transform duration-500">
                                <Shield className="w-7 h-7 text-violet-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Bank-Grade Security</h3>
                            <p className="text-stone-400 leading-relaxed font-medium text-sm">Your money is protected with AES-256 encryption and biometric authentication.</p>
                        </div>

                        <div className="group p-8 rounded-3xl glass-card border-white/5 hover:bg-stone-800/50 transition-all duration-500 hover:-translate-y-2">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-600/20 flex items-center justify-center mb-6 border border-emerald-500/20 group-hover:scale-110 transition-transform duration-500">
                                <CreditCard className="w-7 h-7 text-emerald-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Virtual Cards</h3>
                            <p className="text-stone-400 leading-relaxed font-medium text-sm">Create virtual cards for online shopping. Control spending with custom limits.</p>
                        </div>

                        <div className="group p-8 rounded-3xl glass-card border-white/5 hover:bg-stone-800/50 transition-all duration-500 hover:-translate-y-2">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500/20 to-rose-600/20 flex items-center justify-center mb-6 border border-pink-500/20 group-hover:scale-110 transition-transform duration-500">
                                <Smartphone className="w-7 h-7 text-pink-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">QR Payments</h3>
                            <p className="text-stone-400 leading-relaxed font-medium text-sm">Scan and pay at millions of merchants with instant QR code payments.</p>
                        </div>

                        <div className="group p-8 rounded-3xl glass-card border-white/5 hover:bg-stone-800/50 transition-all duration-500 hover:-translate-y-2">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-600/20 flex items-center justify-center mb-6 border border-blue-500/20 group-hover:scale-110 transition-transform duration-500">
                                <Lock className="w-7 h-7 text-blue-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Expense Tracking</h3>
                            <p className="text-stone-400 leading-relaxed font-medium text-sm">Track every expense with detailed analytics and smart categorization.</p>
                        </div>

                        <div className="group p-8 rounded-3xl glass-card border-white/5 hover:bg-stone-800/50 transition-all duration-500 hover:-translate-y-2">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/20 to-red-600/20 flex items-center justify-center mb-6 border border-rose-500/20 group-hover:scale-110 transition-transform duration-500">
                                <Star className="w-7 h-7 text-rose-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Rewards Program</h3>
                            <p className="text-stone-400 leading-relaxed font-medium text-sm">Earn points on every transaction and redeem for exciting rewards.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-32 relative">
                <div className="container mx-auto px-6">
                    <div className="glass-card rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                        
                        <div className="relative">
                            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">Start your journey today</h2>
                            <p className="text-stone-400 text-lg mb-10 max-w-xl mx-auto font-medium">Join millions of users who have already upgraded their financial experience with FluxPay.</p>
                            <Button asChild size="lg" className="h-14 px-12 bg-white text-stone-950 hover:bg-stone-200 rounded-2xl font-bold text-sm shadow-2xl">
                                <Link href="/signup">Create Free Account</Link>
                            </Button>
                            <p className="text-xs text-stone-500 mt-6 font-medium">No credit card required • Free forever plan</p>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="py-16 border-t border-white/5">
                <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center">
                            <Hexagon className="w-4 h-4 text-white fill-white/20" />
                        </div>
                        <span className="text-lg font-bold text-white uppercase">FluxPay</span>
                    </div>

                    <p className="text-[10px] font-medium text-stone-600 uppercase tracking-widest">© 2026 FluxPay Inc.</p>

                    <div className="flex gap-8">
                        <Link href="#" className="text-xs font-medium text-stone-500 hover:text-white transition-colors">Privacy</Link>
                        <Link href="#" className="text-xs font-medium text-stone-500 hover:text-white transition-colors">Terms</Link>
                        <Link href="#" className="text-xs font-medium text-stone-500 hover:text-white transition-colors">Support</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
