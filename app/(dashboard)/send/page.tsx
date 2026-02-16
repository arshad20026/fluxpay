"use client";

import { useState, useEffect, Suspense } from "react";
import { Search, ArrowRight, Loader2, CheckCircle, X, User } from "lucide-react";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [realUsers, setRealUsers] = useState<any[]>([]);
  const [beneficiaries, setBeneficiaries] = useState<any[]>([]);

  useEffect(() => {
    const fetchBeneficiaries = async () => {
      try {
        const data = await apiClient.get("/beneficiary");
        setBeneficiaries(data);
      } catch (error) {
        console.error("Failed to fetch beneficiaries", error);
      }
    };
    fetchBeneficiaries();

    const email = searchParams.get("email");
    if (email) {
      setSearchQuery(email);
      handleSearch(email);
    }
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
      setRealUsers(data);
    } catch (error) {
      console.error("Search failed", error);
    }

    if (selectedUser) {
      setSelectedUser(null);
    }
  };

  const handleSelectUser = (user: any) => {
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
      // Use selectedUser.email or search query (if user just typed email)
      const recipientEmail = selectedUser ? selectedUser.email : searchQuery;

      await apiClient.post("/transaction/send", {
        recipientEmail,
        amount: parseFloat(amount),
        note, // Backend controller doesn't use note yet but good to have
      });

      setIsSending(false);
      setShowConfirm(false);
      setIsSuccess(true);
    } catch (error: any) {
      alert(error.message || "Transaction failed");
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
        <Card className="bg-slate-800/30 border-slate-700/50">
          <CardContent className="pt-12 pb-12 px-8 text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center mx-auto mb-6 animate-success">
              <CheckCircle className="w-10 h-10 text-slate-900" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Money Sent!</h2>
            <p className="text-slate-400 mb-2">
              You've successfully sent
            </p>
            <p className="text-3xl font-bold text-teal-400 mb-6">₹{parseFloat(amount).toFixed(2)}</p>
            <div className="bg-slate-700/50 rounded-lg p-4 mb-8">
              <p className="text-slate-400 text-sm">To</p>
              <p className="text-white font-medium">{selectedUser?.name}</p>
              <p className="text-slate-500 text-sm">{selectedUser?.email}</p>
            </div>
            <div className="space-y-3">
              <Button
                onClick={handleReset}
                className="w-full h-12 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold rounded-xl"
              >
                Send Another Payment
              </Button>
              <Button
                variant="outline"
                className="w-full h-12 border-slate-600 text-slate-300 hover:bg-slate-700/50"
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
        <p className="text-slate-400 mt-1">Send money to anyone with an email address</p>
      </div>

      <Card className="bg-slate-800/30 border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-white">Payment Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Recipient Search */}
            <div className="space-y-2">
              <Label htmlFor="recipient" className="text-slate-300">
                Recipient
              </Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                <Input
                  id="recipient"
                  type="text"
                  placeholder="Search by name or email"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="h-12 pl-12 pr-10 bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-500 focus:border-teal-500 focus:ring-teal-500/20"
                  required
                />
                {selectedUser && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedUser(null);
                      setSearchQuery("");
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Search Results */}
              {isSearching && realUsers.length > 0 && (
                <div className="mt-2 bg-slate-800 border border-slate-700/50 rounded-xl overflow-hidden shadow-lg">
                  {realUsers.map((user: any) => (
                    <button
                      key={user.id}
                      type="button"
                      onClick={() => handleSelectUser(user)}
                      className="w-full flex items-center gap-3 p-3 hover:bg-slate-700/50 transition-colors text-left"
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center">
                        <span className="text-sm font-medium text-slate-300">
                          {user.name.split(' ').map((n: any) => n[0]).join('').toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">{user.name}</p>
                        <p className="text-xs text-slate-500 truncate">{user.email}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Selected User */}
              {selectedUser && (
                <div className="mt-2 p-3 bg-teal-500/10 border border-teal-500/20 rounded-xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center">
                    <span className="text-sm font-medium text-white">{selectedUser.avatar}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white">{selectedUser.name}</p>
                    <p className="text-xs text-teal-400">{selectedUser.email}</p>
                  </div>
                  <CheckCircle className="w-5 h-5 text-teal-400" />
                </div>
              )}
            </div>

            {/* Amount */}
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-slate-300">
                Amount
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">₹</span>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  min="0.01"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="h-12 pl-8 bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-500 focus:border-teal-500 focus:ring-teal-500/20 text-lg font-semibold"
                  required
                />
              </div>
            </div>

            {/* Note */}
            <div className="space-y-2">
              <Label htmlFor="note" className="text-slate-300">
                Note <span className="text-slate-500">(optional)</span>
              </Label>
              <Textarea
                id="note"
                placeholder="Add a message..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="min-h-[100px] bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-500 focus:border-teal-500 focus:ring-teal-500/20 resize-none"
              />
            </div>

            {/* Quick Amount Buttons */}
            <div className="flex flex-wrap gap-2">
              {["10", "25", "50", "100", "250"].map((quickAmount) => (
                <Button
                  key={quickAmount}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setAmount(quickAmount)}
                  className="border-slate-600 text-slate-400 hover:bg-slate-700/50 hover:text-white"
                >
                  ₹{quickAmount}
                </Button>
              ))}
            </div>

            <Button
              type="submit"
              disabled={!selectedUser || !amount}
              className="w-full h-12 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg shadow-teal-500/20 disabled:opacity-50"
            >
              Continue
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Confirmation Modal */}
      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent className="bg-slate-900 border-slate-700/50 text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white">Confirm Payment</DialogTitle>
            <DialogDescription className="text-slate-400">
              Please review the details before sending
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="bg-slate-800/50 rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Recipient</span>
                <div className="text-right">
                  <p className="text-white font-medium">{selectedUser?.name}</p>
                  <p className="text-slate-500 text-sm">{selectedUser?.email}</p>
                </div>
              </div>
              <div className="border-t border-slate-700/50 pt-3 flex justify-between items-center">
                <span className="text-slate-400">Amount</span>
                <span className="text-2xl font-bold text-teal-400">
                  ₹{parseFloat(amount || "0").toFixed(2)}
                </span>
              </div>
              {note && (
                <div className="border-t border-slate-700/50 pt-3">
                  <span className="text-slate-400 text-sm">Note</span>
                  <p className="text-white mt-1">{note}</p>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowConfirm(false)}
                className="flex-1 h-12 border-slate-600 text-slate-300 hover:bg-slate-700/50"
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirmSend}
                disabled={isSending}
                className="flex-1 h-12 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold"
              >
                {isSending ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Payment"
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
