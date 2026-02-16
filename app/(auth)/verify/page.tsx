"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Wallet, ArrowRight, Loader2, CheckCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function VerifyEmailPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Move to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setIsVerified(true);
  };

  const isCodeComplete = code.every((digit) => digit !== "");

  if (isVerified) {
    return (
      <div className="animate-fade-in">
        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-xl shadow-2xl">
          <CardContent className="pt-12 pb-12 px-8 text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center mx-auto mb-6 animate-success">
              <CheckCircle className="w-10 h-10 text-slate-900" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">Email Verified!</h2>
            <p className="text-slate-400 mb-8 max-w-sm mx-auto">
              Your email has been successfully verified. You're now ready to start using FluxPay.
            </p>
            <Button
              asChild
              className="w-full h-12 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold rounded-xl"
            >
              <Link href="/">
                Go to Dashboard
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Logo */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center shadow-lg shadow-teal-500/20">
            <Wallet className="w-6 h-6 text-slate-900" />
          </div>
          <span className="text-2xl font-bold text-white">FluxPay</span>
        </div>
      </div>

      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-xl shadow-2xl">
        <CardHeader className="space-y-1 pb-6 text-center">
          <div className="w-14 h-14 rounded-full bg-teal-500/10 flex items-center justify-center mx-auto mb-4">
            <Mail className="w-7 h-7 text-teal-400" />
          </div>
          <CardTitle className="text-2xl font-bold text-white">
            Verify your email
          </CardTitle>
          <CardDescription className="text-slate-400">
            We've sent a 6-digit verification code to your email
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center gap-2">
              {code.map((digit, index) => (
                <Input
                  key={index}
                  ref={(el) => { inputRefs.current[index] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-14 text-center text-xl font-bold bg-slate-800/50 border-slate-600/50 text-white focus:border-teal-500 focus:ring-teal-500/20 rounded-lg"
                />
              ))}
            </div>

            <Button
              type="submit"
              disabled={isLoading || !isCodeComplete}
              className="w-full h-12 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-teal-500/20 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  Verify email
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          </form>

          <div className="text-center space-y-3">
            <p className="text-slate-400 text-sm">
              Didn't receive the code?{" "}
              <button className="font-medium text-teal-400 hover:text-teal-300 transition-colors">
                Resend
              </button>
            </p>
            <p className="text-slate-500 text-xs">
              Wrong email?{" "}
              <Link href="/signup" className="text-teal-400 hover:text-teal-300 transition-colors">
                Go back
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
