"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Wallet, ArrowRight, Loader2, CheckCircle, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { apiClient } from "@/lib/api-client";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<"form" | "success">("form");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    setIsLoading(true);
    try {
      const response = await apiClient.post("/auth/register", {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
      });
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      setStep("success");
    } catch (error: any) {
      alert(error.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  if (step === "success") {
    return (
      <div className="w-full animate-scale-in">
        <Card className="glass-card border-white/10 bg-white/5 backdrop-blur-xl rounded-[2rem] overflow-hidden">
          <CardContent className="pt-16 pb-12 px-10 text-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-teal-500/20">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">You&apos;re all set!</h2>
            <p className="text-slate-400 mb-10 leading-relaxed">
              Welcome to the future of finance. Your FluxPay account is ready. Let&apos;s start moving money at the speed of light.
            </p>
            <Button
              asChild
              className="w-full h-14 bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-bold rounded-2xl shadow-xl shadow-teal-500/20 transition-all active:scale-95"
            >
              <Link href="/dashboard" className="flex items-center justify-center gap-2">
                Launch Dashboard
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full space-y-8 animate-fade-in flex flex-col items-center">
      {/* Branding */}
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-indigo-500/20 transform -rotate-3 hover:rotate-0 transition-transform duration-500">
          <Wallet className="w-7 h-7 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2">
            FluxPay <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
          </h1>
          <p className="text-slate-500 font-medium">The digital wallet for tomorrow</p>
        </div>
      </div>

      <Card className="glass-card border-white/10 bg-white/5 backdrop-blur-2xl rounded-[2.5rem] overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] w-full">
        <CardHeader className="space-y-2 pt-10 px-8 text-center">
          <CardTitle className="text-3xl font-bold text-white tracking-tight">
            Create your account
          </CardTitle>
          <CardDescription className="text-slate-400">
            Join 2M+ users sending money globally
          </CardDescription>
        </CardHeader>

        <CardContent className="px-8 pb-10 space-y-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-300 text-xs font-bold uppercase tracking-wider ml-1">First Name</Label>
                <Input
                  placeholder="John"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus:border-blue-500/50 focus:ring-blue-500/20 rounded-xl transition-all"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300 text-xs font-bold uppercase tracking-wider ml-1">Last Name</Label>
                <Input
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus:border-blue-500/50 focus:ring-blue-500/20 rounded-xl transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300 text-xs font-bold uppercase tracking-wider ml-1">Email Address</Label>
              <Input
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus:border-blue-500/50 focus:ring-blue-500/20 rounded-xl transition-all"
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300 text-xs font-bold uppercase tracking-wider ml-1">Password</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus:border-blue-500/50 focus:ring-blue-500/20 rounded-xl pr-12 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300 text-xs font-bold uppercase tracking-wider ml-1">Confirm Password</Label>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus:border-blue-500/50 focus:ring-blue-500/20 rounded-xl pr-12 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-start space-x-3 pt-2">
              <Checkbox
                id="terms"
                checked={formData.agreeToTerms}
                onCheckedChange={(checked: boolean) =>
                  setFormData({ ...formData, agreeToTerms: checked as boolean })
                }
                className="border-white/20 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 mt-1"
                required
              />
              <Label htmlFor="terms" className="text-xs text-slate-400 cursor-pointer leading-relaxed">
                I agree to the <Link href="#" className="text-blue-400 hover:underline">Terms</Link> & <Link href="#" className="text-blue-400 hover:underline">Privacy Policy</Link>
              </Label>
            </div>

            <Button
              type="submit"
              disabled={isLoading || !formData.agreeToTerms}
              className="w-full h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-2xl shadow-xl shadow-blue-600/20 transition-all duration-300 disabled:opacity-30 active:scale-[0.98] mt-4"
            >
              {isLoading ? (
                <div className="flex items-center gap-3">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Securing Account...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span>Get Started</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              )}
            </Button>
          </form>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/10"></span>
            </div>
            <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest">
              <span className="bg-[#020617] px-3 text-slate-500">Fast Access</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="h-12 border-white/10 bg-white/5 hover:bg-white/10 text-white rounded-xl gap-3 transition-all hover:border-white/20"
              onClick={() => alert("Connecting to Google Security Services...")}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                <path fill="#4285F4" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <span className="text-sm font-bold">Google</span>
            </Button>
            <Button
              variant="outline"
              className="h-12 border-white/10 bg-white/5 hover:bg-white/10 text-white rounded-xl gap-3 transition-all hover:border-white/20"
              onClick={() => alert("Connecting to GitHub Developer APIs...")}
            >
              <Github className="w-5 h-5 text-white" />
              <span className="text-sm font-bold">GitHub</span>
            </Button>
          </div>

          <div className="text-center pt-2">
            <p className="text-sm text-slate-500">
              Already a user?{" "}
              <Link
                href="/login"
                className="font-black text-blue-400 hover:text-blue-300 transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Trust Footer */}
      <div className="flex items-center gap-6 opacity-40 grayscale group-hover:grayscale-0 transition-all duration-500">
        <span className="text-[10px] font-bold text-white tracking-widest uppercase">Secured by AES-256</span>
        <div className="h-1 w-1 rounded-full bg-slate-700"></div>
        <span className="text-[10px] font-bold text-white tracking-widest uppercase">PCI-DSS Compliant</span>
      </div>
    </div>
  );
}
