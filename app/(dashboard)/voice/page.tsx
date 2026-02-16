"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Mic, MicOff, X, Zap, User, ArrowRight, Loader2, CheckCircle, Volume2, Sparkles, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function VoicePage() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [state, setState] = useState<"idle" | "listening" | "processing" | "confirming" | "success">("idle");
  const [aiResponse, setAiResponse] = useState("");

  const startListening = () => {
    setIsListening(true);
    setState("listening");
    setTranscript("");

    // Simulate speech to text
    setTimeout(() => {
      setTranscript("Send ₹500 to Varun for dinner");
      setIsListening(false);
      setState("processing");

      setTimeout(() => {
        setAiResponse("Understood. Preparing a transfer of ₹500.00 to Varun Sharma.");
        setState("confirming");
      }, 1500);
    }, 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight">Voice Rails <span className="text-teal-500">.</span></h1>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-2">Natural Language Payment Processing</p>
        </div>
        <Badge className="bg-purple-500/20 text-purple-400 border-none font-black text-[8px] tracking-[0.2em] px-3 py-1 uppercase">AI Powered Engine</Badge>
      </div>

      <Card className="glass-card rounded-[3rem] border-white/5 overflow-hidden min-h-[500px] flex flex-col items-center justify-center p-12 relative">
        {/* Background Ambient Glow */}
        <div className={cn(
          "absolute inset-0 bg-gradient-to-t from-purple-500/5 to-transparent transition-opacity duration-1000",
          isListening ? "opacity-100" : "opacity-0"
        )} />

        {state === "idle" && (
          <div className="text-center space-y-10">
            <div className="relative inline-block">
              <button
                onClick={startListening}
                className="w-32 h-32 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center group hover:border-purple-500/50 transition-all shadow-2xl relative z-10"
              >
                <Mic className="w-12 h-12 text-slate-400 group-hover:text-purple-400 group-hover:scale-110 transition-all" />
              </button>
              <div className="absolute inset-0 rounded-full bg-purple-500/20 animate-ping opacity-20" />
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white">Tap to Speak</h3>
              <p className="text-slate-500 font-medium max-w-xs mx-auto text-sm">"Send ₹500 to Varun Sharma for lunch" or "Check my balance"</p>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="outline" className="border-white/10 text-slate-500 text-[8px] font-black uppercase tracking-widest px-3 py-1">Pay Bills</Badge>
              <Badge variant="outline" className="border-white/10 text-slate-500 text-[8px] font-black uppercase tracking-widest px-3 py-1">Check Balance</Badge>
              <Badge variant="outline" className="border-white/10 text-slate-500 text-[8px] font-black uppercase tracking-widest px-3 py-1">Buy Bitcoin</Badge>
            </div>
          </div>
        )}

        {state === "listening" && (
          <div className="text-center space-y-12">
            <div className="flex items-center justify-center gap-1 h-20">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
                <div
                  key={i}
                  className="w-1.5 bg-purple-500 rounded-full animate-voice-bar"
                  style={{
                    height: `${20 + Math.random() * 60}%`,
                    animationDelay: `${i * 0.1}s`
                  }}
                />
              ))}
            </div>
            <div className="space-y-4">
              <p className="text-purple-400 font-black uppercase tracking-[0.3em] text-[10px] animate-pulse">Awaiting Command...</p>
              <h2 className="text-xl font-bold text-slate-300 italic">"Go ahead, I'm listening..."</h2>
            </div>
            <Button variant="ghost" className="text-slate-500 hover:text-white" onClick={() => setState("idle")}>
              <X className="w-4 h-4 mr-2" /> Stop Listening
            </Button>
          </div>
        )}

        {(state === "processing" || state === "confirming") && (
          <div className="w-full max-w-md space-y-10 animate-scale-in">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-slate-400" />
                </div>
                <div className="bg-white/5 rounded-[1.5rem] rounded-tl-none p-5 flex-1">
                  <p className="text-sm font-medium text-white">"{transcript}"</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                  <Brain className="w-5 h-5 text-purple-400" />
                </div>
                <div className="bg-purple-500/5 border border-purple-500/10 rounded-[1.5rem] rounded-tl-none p-5 flex-1">
                  {state === "processing" ? (
                    <div className="flex gap-1 py-1">
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  ) : (
                    <p className="text-sm font-medium text-purple-200">{aiResponse}</p>
                  )}
                </div>
              </div>
            </div>

            {state === "confirming" && (
              <div className="space-y-4 animate-slide-up">
                <Button
                  onClick={() => {
                    setState("success");
                  }}
                  className="w-full h-16 bg-purple-500 hover:bg-purple-600 text-white font-black uppercase tracking-widest text-xs rounded-2xl shadow-xl shadow-purple-500/20"
                >
                  Confirm Payment
                </Button>
                <Button
                  variant="ghost"
                  className="w-full h-12 text-slate-500 font-bold uppercase text-[10px] tracking-widest"
                  onClick={() => setState("idle")}
                >
                  Cancel Command
                </Button>
              </div>
            )}
          </div>
        )}

        {state === "success" && (
          <div className="text-center space-y-8 animate-scale-in">
            <div className="w-24 h-24 rounded-full bg-teal-500 flex items-center justify-center mx-auto shadow-2xl shadow-teal-500/40">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-white">Processed</h2>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Payment of ₹500 executed by voice</p>
            </div>
            <Button asChild variant="outline" className="h-14 border-white/5 bg-white/5 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl px-10">
              <Link href="/dashboard">Back to Home</Link>
            </Button>
          </div>
        )}

        {/* Status Bar */}
        <div className="absolute bottom-10 left-10 right-10 flex items-center justify-between border-t border-white/5 pt-6">
          <div className="flex items-center gap-3">
            <Volume2 className="w-4 h-4 text-slate-600" />
            <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">NLU Model: v4.2.0-stable</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-teal-500" />
            <span className="text-[8px] font-black text-teal-500 uppercase tracking-widest">Neural Link Active</span>
          </div>
        </div>
      </Card>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
