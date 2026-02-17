"use client";

import { useState, useEffect, Suspense } from "react";
import { Search, ArrowRight, Loader2, CheckCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { apiClient } from "@/lib/api-client";
import { useSearchParams } from "next/navigation";

function SendMoneyContent() {
  const searchParams = useSearchParams();
  interface BasicUser {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  }
  interface Beneficiary {
    id: string;
    name: string;
    email: string;
  }
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<BasicUser | null>(null);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [realUsers, setRealUsers] = useState<BasicUser[]>([]);
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);

  useEffect(() => {
    const run = async () => {
      try {
        const data = await apiClient.get("/beneficiary");
        setBeneficiaries(data);
      } catch (_err: unknown) {
      }
      const email = searchParams.get("email");
      if (email) {
        setSearchQuery(email);
        try {
          const data = await apiClient.get(`/user/search?query=${email}`);
          setRealUsers(data as BasicUser[]);
        } catch (_err: unknown) {
        }
      }
    };
    run();
  }, [searchParams]);

  const handleSearch = async (value: string) => {
    setSearchQuery(value);
    if (!value) {
      setRealUsers([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    try {
      const data = await apiClient.get(`/user/search?query=${value}`);
      setRealUsers(data as BasicUser[]);
    } catch (_err: unknown) {
    }

    if (selectedUser) {
      setSelectedUser(null);
    }
  };

  const handleSelectUser = (user: BasicUser) => {
    setSelectedUser({
      ...user,
      avatar: user.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()
    });
    setSearchQuery(user.email);
    setIsSearching(false);
    setRealUsers([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  const handleConfirmSend = async () => {
    setIsSending(true);
    try {
      const recipientEmail = selectedUser ? selectedUser.email : searchQuery;

      await apiClient.post("/transaction/send", {
        recipientEmail,
        amount: parseFloat(amount),
        note,
      });

      setIsSending(false);
      setShowConfirm(false);
      setIsSuccess(true);
    } catch (error: unknown) {
      const msg = (error as Error)?.message || "Transaction failed";
      alert(msg);
      setIsSending(false);
      setShowConfirm(false);
    }
  };

  const handleReset = () => {
    setSelectedUser(null);
    setSearchQuery("");
    setAmount("");
    setNote("");
    setIsSuccess(false);
  };

  if (isSuccess) {
    return (
      <div className="max-w-md mx-auto animate-fade-in">
        <Card className="glass-card premium-card border-amber-500/10">
          <CardContent className="pt-12 pb-12 px-8 text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-amber-500/20">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Money Sent!</h2>
            <p className="text-stone-400 mb-2">
              You&apos;ve successfully sent
            </p>
            <p className="text-3xl font-bold text-amber-400 mb-6">₹{parseFloat(amount).toFixed(2)}</p>
            <div className="bg-stone-800/50 rounded-xl p-4 mb-8 border border-white/5">
              <p className="text-stone-500 text-sm">To</p>
              <p className="text-white font-medium">{selectedUser?.name}</p>
              <p className="text-stone-500 text-sm">{selectedUser?.email}</p>
            </div>
            <div className="space-y-3">
              <Button
                onClick={handleReset}
                className="w-full h-12 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold rounded-xl"
              >
                Send Another Payment
              </Button>
              <Button
                variant="outline"
                className="w-full h-12 border-stone-700 text-stone-300 hover:bg-stone-800"
              >
                View Transaction
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Send Money</h1>
        <p className="text-stone-400 mt-1">Send money instantly to anyone</p>
      </div>

      <Card className="glass-card premium-card border-amber-500/10">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-white">Payment Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="recipient" className="text-stone-300">
                Recipient
              </Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-500" />
                <Input
                  id="recipient"
                  type="text"
                  placeholder="Search by name or email"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="h-12 pl-12 pr-10 bg-stone-800/50 border-white/5 text-white placeholder:text-stone-500 focus:border-amber-500 focus:ring-amber-500/20"
                  required
                />
                {selectedUser && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedUser(null);
                      setSearchQuery("");
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              {isSearching && realUsers.length > 0 && (
                <div className="mt-2 bg-stone-800 border border-white/5 rounded-xl overflow-hidden shadow-xl">
                  {realUsers.map((user: BasicUser) => (
                    <button
                      key={user.id}
                      type="button"
                      onClick={() => handleSelectUser(user)}
                      className="w-full flex items-center gap-3 p-3 hover:bg-stone-700/50 transition-colors text-left"
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-600/20 flex items-center justify-center border border-amber-500/20">
                        <span className="text-sm font-medium text-amber-400">
                          {user.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">{user.name}</p>
                        <p className="text-xs text-stone-500 truncate">{user.email}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {selectedUser && (
                <div className="mt-2 p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                    <span className="text-sm font-medium text-white">{selectedUser.avatar}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white">{selectedUser.name}</p>
                    <p className="text-xs text-amber-400">{selectedUser.email}</p>
                  </div>
                  <CheckCircle className="w-5 h-5 text-amber-400" />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount" className="text-stone-300">
                Amount
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 font-medium">₹</span>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  min="0.01"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="h-12 pl-8 bg-stone-800/50 border-white/5 text-white placeholder:text-stone-500 focus:border-amber-500 focus:ring-amber-500/20 text-lg font-semibold"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="note" className="text-stone-300">
                Note <span className="text-stone-500">(optional)</span>
              </Label>
              <Textarea
                id="note"
                placeholder="Add a message..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="min-h-[100px] bg-stone-800/50 border-white/5 text-white placeholder:text-stone-500 focus:border-amber-500 focus:ring-amber-500/20 resize-none"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {["100", "250", "500", "1000", "2500"].map((quickAmount) => (
                <Button
                  key={quickAmount}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setAmount(quickAmount)}
                  className="border-stone-700 text-stone-400 hover:bg-stone-800 hover:text-white"
                >
                  ₹{quickAmount}
                </Button>
              ))}
            </div>

            <Button
              type="submit"
              disabled={!amount}
              className="w-full h-12 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold rounded-xl shadow-lg shadow-amber-500/20 disabled:opacity-50"
            >
              Continue
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </form>
        </CardContent>
      </Card>

      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent className="bg-stone-900 border-stone-700/50 text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white">Confirm Payment</DialogTitle>
            <DialogDescription className="text-stone-400">
              Please review the details before sending
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="bg-stone-800/50 rounded-xl p-4 space-y-3 border border-white/5">
              <div className="flex justify-between items-center">
                <span className="text-stone-400">Recipient</span>
                <div className="text-right">
                  <p className="text-white font-medium">{selectedUser?.name}</p>
                  <p className="text-stone-500 text-sm">{selectedUser?.email}</p>
                </div>
              </div>
              <div className="border-t border-stone-700/50 pt-3 flex justify-between items-center">
                <span className="text-stone-400">Amount</span>
                <span className="text-2xl font-bold text-amber-400">
                  ₹{parseFloat(amount || "0").toFixed(2)}
                </span>
              </div>
              {note && (
                <div className="border-t border-stone-700/50 pt-3">
                  <span className="text-stone-400 text-sm">Note</span>
                  <p className="text-white mt-1">{note}</p>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowConfirm(false)}
                className="flex-1 h-12 border-stone-700 text-stone-300 hover:bg-stone-800"
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirmSend}
                disabled={isSending}
                className="flex-1 h-12 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold"
              >
                {isSending ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Payment
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function SendPage() {
  return (
    <Suspense fallback={<div className="max-w-2xl mx-auto mt-10 text-stone-400">Loading…</div>}>
      <SendMoneyContent />
    </Suspense>
  );
}
