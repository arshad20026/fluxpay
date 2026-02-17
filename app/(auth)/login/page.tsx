"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Eye, EyeOff, Wallet, ArrowRight, Loader2, Fingerprint,
  Smartphone, Shield, Lock, Mail, Key, Github, RefreshCcw,
  ChevronLeft, CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { apiClient } from "@/lib/api-client";
import { cn } from "@/lib/utils";

type LoginStep = "identifier" | "password" | "otp" | "mfa" | "biometric";

export default function LoginPage() {
  const [step, setStep] = useState<LoginStep>("identifier");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [mfaCode, setMfaCode] = useState(["", "", "", "", "", ""]);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const mfaRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleIdentifierSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep("password");
    }, 800);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await apiClient.post("/auth/login", {
        email: identifier,
        password: password,
      });

      // Simulate MFA Requirement
      if (identifier.includes("2fa")) {
        setStep("mfa");
      } else {
        completeLogin(response);
      }
    } catch (error: any) {
      alert(error.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const completeLogin = (response: any) => {
    localStorage.setItem("token", response.token);
    localStorage.setItem("user", JSON.stringify(response.user));
    window.location.href = "/dashboard";
  };

  const handleOtpChange = (index: number, value: string, refs: any, state: any, setState: any) => {
    if (value.length > 1) return;
    const newState = [...state];
    newState[index] = value;
    setState(newState);
    if (value && index < 5) refs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent, refs: any, state: any) => {
    if (e.key === "Backspace" && !state[index] && index > 0) {
      refs.current[index - 1]?.focus();
    }
  };

  const handleMfaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // In real app, verify with server. Here we just redirect since it's a mock.
      window.location.href = "/dashboard";
    }, 1500);
  };

  const socialLogin = (provider: string) => {
    setIsLoading(true);
    setTimeout(() => {
      alert(`Connecting to ${provider}...`);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="w-full space-y-8 animate-fade-in flex flex-col items-center">
      {/* Brand Header */}
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="relative">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-indigo-500/20 transform rotate-3 hover:rotate-0 transition-transform duration-500">
            <Wallet className="w-7 h-7 text-white" />
          </div>
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-teal-500 border-2 border-slate-950 rounded-full flex items-center justify-center animate-pulse">
            <Shield className="w-2.5 h-2.5 text-white" />
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2">
            FluxPay <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
          </h1>
          <p className="text-slate-500 font-medium uppercase tracking-widest text-[10px]">Secure Gateway</p>
        </div>
      </div>

      <Card className="glass-card border-white/10 bg-white/5 backdrop-blur-2xl rounded-[2.5rem] overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] w-full relative">
          <div className="absolute top-4 right-6">
          <Badge variant="outline" className="text-[10px] border-amber-500/20 text-amber-400 bg-amber-500/5 font-bold tracking-widest px-2">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mr-1.5 animate-pulse" />
            SECURE
          </Badge>
        </div>

        <CardHeader className="text-center pt-10 px-8">
          <div className="flex items-center absolute left-6 top-5">
            {step !== "identifier" && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setStep("identifier")}
                className="text-slate-400 hover:text-white hover:bg-white/5 rounded-full"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
            )}
          </div>
          <CardTitle className="text-3xl font-bold text-white tracking-tight">
            {step === "identifier" && "Welcome back"}
            {step === "password" && "Enter password"}
            {step === "otp" && "Verify Phone"}
            {step === "mfa" && "Security Check"}
            {step === "biometric" && "Passkey Auth"}
          </CardTitle>
          <CardDescription className="text-slate-400">
            {step === "identifier" && "Continue with your digital identity"}
            {step === "password" && `Authenticating your account`}
            {step === "otp" && "Confirm the 6-digit code we sent"}
            {step === "mfa" && "Standard multi-factor verification"}
            {step === "biometric" && "Touch/Face ID secure login"}
          </CardDescription>
        </CardHeader>

        <CardContent className="px-8 pb-10 space-y-8">
          {/* IDENTIFIER STEP */}
          {step === "identifier" && (
            <div className="space-y-8 animate-fade-in">
              <form onSubmit={handleIdentifierSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label className="text-slate-300 text-xs font-bold uppercase tracking-wider ml-1">Identity</Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <Input
                      placeholder="Email or Phone Number"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      className="h-14 pl-12 bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus:border-blue-500/50 focus:ring-blue-500/20 rounded-2xl transition-all font-medium"
                      required
                    />
                  </div>
                </div>
                <Button className="w-full h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-black rounded-2xl shadow-xl shadow-blue-600/20 transition-all active:scale-[0.98] group">
                  Continue
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>

              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
                <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest"><span className="bg-[#020617] px-3 text-slate-500">Fast Connect</span></div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" onClick={() => socialLogin('Google')} className="h-12 border-white/10 bg-white/5 hover:bg-white/10 text-white rounded-xl gap-3 transition-all hover:border-white/20">
                  <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#EA4335" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" /><path fill="#4285F4" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                  <span className="text-sm font-bold">Google</span>
                </Button>
                <Button variant="outline" onClick={() => socialLogin('GitHub')} className="h-12 border-white/10 bg-white/5 hover:bg-white/10 text-white rounded-xl gap-3 transition-all hover:border-white/20">
                  <Github className="w-5 h-5 text-white" />
                  <span className="text-sm font-bold">GitHub</span>
                </Button>
              </div>

              <div className="flex justify-center gap-4">
                <Button variant="ghost" className="text-slate-500 hover:text-blue-400 text-[10px] font-black uppercase tracking-widest px-0" onClick={() => setStep("biometric")}>
                  <Fingerprint className="w-3.5 h-3.5 mr-1.5" />
                  Passkey
                </Button>
                <div className="w-1 h-1 rounded-full bg-slate-800 self-center" />
                <Button variant="ghost" className="text-slate-500 hover:text-blue-400 text-[10px] font-black uppercase tracking-widest px-0" onClick={() => setStep("otp")}>
                  <Smartphone className="w-3.5 h-3.5 mr-1.5" />
                  OTP Login
                </Button>
              </div>
            </div>
          )}

          {/* PASSWORD STEP */}
          {step === "password" && (
            <form onSubmit={handleLogin} className="space-y-6 animate-slide-up">
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-slate-500 text-[10px] font-black tracking-widest uppercase">Logged in as</p>
                    <p className="text-white font-bold truncate">{identifier}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setStep("identifier")} className="text-slate-500 hover:text-white">
                    <RefreshCcw className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-300 text-xs font-bold uppercase tracking-wider ml-1">Secure Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-14 pl-12 pr-12 bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus:border-blue-500/50 focus:ring-blue-500/20 rounded-2xl transition-all"
                      required
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors">
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between px-1">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" className="border-white/10 data-[state=checked]:bg-blue-600" />
                  <label htmlFor="remember" className="text-xs text-slate-500 cursor-pointer">Remember device</label>
                </div>
                <Link href="/forgot-password" className="text-xs text-blue-400 font-black uppercase tracking-widest hover:text-blue-300 transition-colors opacity-100">Recover</Link>
              </div>

              <Button type="submit" disabled={isLoading} className="w-full h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-black rounded-2xl shadow-xl shadow-blue-600/20 transition-all active:scale-[0.98]">
                {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                  <div className="flex items-center gap-2">
                    <span>Access Wallet</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}
              </Button>
            </form>
          )}

          {/* MFA STEP */}
          {step === "mfa" && (
            <form onSubmit={handleMfaSubmit} className="space-y-8 animate-slide-up">
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mx-auto mb-4 border border-blue-500/20">
                  <Key className="w-8 h-8 text-blue-400" />
                </div>
                <p className="text-xs text-slate-400 leading-relaxed uppercase tracking-widest font-black">Authentication Code</p>
              </div>
              <div className="flex justify-center gap-3">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <input
                    key={i}
                    ref={(el) => { mfaRefs.current[i] = el; }}
                    type="text"
                    maxLength={1}
                    value={mfaCode[i]}
                    onChange={(e) => handleOtpChange(i, e.target.value, mfaRefs, mfaCode, setMfaCode)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e, mfaRefs, mfaCode)}
                    className="w-10 h-14 text-center text-2xl font-black bg-white/5 border border-white/10 rounded-xl text-blue-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all shadow-inner"
                  />
                ))}
              </div>
              <Button type="submit" className="w-full h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-black rounded-2xl">
                Authorize Session
              </Button>
              <div className="text-center">
                <button type="button" className="text-[10px] text-slate-500 hover:text-blue-400 font-black uppercase tracking-widest transition-colors">
                  Lost device? Use Recovery Code
                </button>
              </div>
            </form>
          )}

          {/* OTP STEP */}
          {step === "otp" && (
            <form onSubmit={handleMfaSubmit} className="space-y-8 animate-slide-up">
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-teal-500/10 flex items-center justify-center mx-auto mb-4 border border-teal-500/20">
                  <Smartphone className="w-8 h-8 text-teal-400" />
                </div>
                <p className="text-[10px] text-slate-400 leading-relaxed uppercase tracking-widest font-black">SMS Verification</p>
              </div>
              <div className="flex justify-center gap-3">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <input
                    key={i}
                    ref={(el) => { otpRefs.current[i] = el; }}
                    type="text"
                    maxLength={1}
                    value={otp[i]}
                    onChange={(e) => handleOtpChange(i, e.target.value, otpRefs, otp, setOtp)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e, otpRefs, otp)}
                    className="w-10 h-14 text-center text-2xl font-black bg-white/5 border border-white/10 rounded-xl text-teal-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all shadow-inner"
                  />
                ))}
              </div>
              <Button type="submit" className="w-full h-14 bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-black rounded-2xl">
                Verify & Sign In
              </Button>
              <button type="button" className="w-full text-[10px] text-slate-500 hover:text-teal-400 font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-colors">
                <RefreshCcw className="w-3 h-3" />
                Resend Code (45s)
              </button>
            </form>
          )}

          {/* BIOMETRIC STEP */}
          {step === "biometric" && (
            <div className="py-12 text-center animate-scale-in">
              <div className="relative inline-block mb-10">
                <div className="w-28 h-28 rounded-full bg-blue-500/5 flex items-center justify-center border-2 border-dashed border-blue-500/20">
                  <Fingerprint className="w-14 h-14 text-blue-500 animate-pulse" />
                </div>
                <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping-slow opacity-25" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Secure Passkey</h3>
              <p className="text-slate-500 text-sm mb-10 max-w-[200px] mx-auto leading-relaxed">Touch or scan to authorize your FluxPay access</p>
              <Button variant="ghost" onClick={() => setStep("identifier")} className="text-slate-500 hover:text-white font-black uppercase tracking-widest text-[10px]">
                Cancel & Use Password
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="text-center space-y-4">
        <p className="text-slate-500 text-sm font-medium">
          New to FluxPay?{" "}
          <Link href="/signup" className="text-blue-400 font-black hover:text-blue-300 transition-colors uppercase tracking-widest text-xs border-b border-blue-500/20 pb-0.5">
            Create Identity
          </Link>
        </p>
      </div>

      <div className="flex items-center justify-center gap-6 text-[10px] text-slate-700 font-black uppercase tracking-widest opacity-60">
        <span className="flex items-center gap-1.5"><Shield className="w-3 h-3" /> AES-256</span>
        <div className="w-1 h-1 rounded-full bg-slate-800" />
        <span className="flex items-center gap-1.5"><Lock className="w-3 h-3" /> PCI-DSS</span>
        <div className="w-1 h-1 rounded-full bg-slate-800" />
        <span className="flex items-center gap-1.5"><Smartphone className="w-3 h-3" /> MFA REQUIRED</span>
      </div>
    </div>
  );
}
