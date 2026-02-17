"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Download,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownLeft,
  Receipt,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { apiClient } from "@/lib/api-client";

const ITEMS_PER_PAGE = 8;

interface Transaction {
  id: string;
  name: string;
  email: string;
  amount: number;
  type: "sent" | "received";
  date: string;
  status: string;
  avatar: string;
}

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | "sent" | "received">("all");
  const [dateFilter, setDateFilter] = useState<"all" | "today" | "week" | "month">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await apiClient.get("/transaction/history");
        const currentUserId = JSON.parse(localStorage.getItem("user") || "{}").id;

        const transformed = data.map((t: { id: string; senderId: string; receiver: { name: string; email: string }; sender: { name: string; email: string }; amount: string; createdAt: string; status: string }) => {
          const isSent = t.senderId === currentUserId;
          const otherUser = isSent ? t.receiver : t.sender;
          return {
            id: t.id,
            name: otherUser.name,
            email: otherUser.email,
            amount: isSent ? -parseFloat(t.amount) : parseFloat(t.amount),
            type: isSent ? "sent" : "received",
            date: t.createdAt,
            status: t.status.toLowerCase(),
            avatar: otherUser.name.split(' ').map((n: string) => n[0]).join(''),
          };
        });

        setAllTransactions(transformed);
      } catch (error) {
        console.error("Failed to fetch transactions", error);
      }
    };

    fetchTransactions();
  }, []);

  const filteredTransactions = allTransactions.filter((transaction) => {
    const matchesSearch =
      transaction.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || transaction.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-slide-up">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Transactions</h1>
          <p className="text-stone-400 mt-1">View and manage your payment history</p>
        </div>
        <Button
          variant="outline"
          className="border-stone-700 text-stone-300 hover:bg-stone-800 hover:text-white self-start sm:self-auto"
        >
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>

      <Card className="glass-card premium-card border-amber-500/10 animate-slide-up delay-100">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-500" />
              <Input
                type="text"
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-12 h-12 bg-stone-800/50 border-white/5 text-white placeholder:text-stone-500 focus:border-amber-500"
              />
            </div>

            <Select
              value={typeFilter}
              onValueChange={(value: "all" | "sent" | "received") => {
                setTypeFilter(value);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-full lg:w-[180px] h-12 bg-stone-800/50 border-white/5 text-white">
                <Filter className="w-4 h-4 mr-2 text-stone-500" />
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent className="bg-stone-900 border-stone-700">
                <SelectItem value="all" className="text-white hover:bg-stone-800">All Transactions</SelectItem>
                <SelectItem value="sent" className="text-white hover:bg-stone-800">Sent</SelectItem>
                <SelectItem value="received" className="text-white hover:bg-stone-800">Received</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={dateFilter}
              onValueChange={(value: "all" | "today" | "week" | "month") => {
                setDateFilter(value);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-full lg:w-[180px] h-12 bg-stone-800/50 border-white/5 text-white">
                <SelectValue placeholder="Filter by date" />
              </SelectTrigger>
              <SelectContent className="bg-stone-900 border-stone-700">
                <SelectItem value="all" className="text-white hover:bg-stone-800">All Time</SelectItem>
                <SelectItem value="today" className="text-white hover:bg-stone-800">Today</SelectItem>
                <SelectItem value="week" className="text-white hover:bg-stone-800">This Week</SelectItem>
                <SelectItem value="month" className="text-white hover:bg-stone-800">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card premium-card border-amber-500/10 overflow-hidden animate-slide-up delay-200">
        <CardContent className="p-0">
          <div className="hidden md:block">
            <table className="w-full">
              <thead className="bg-stone-900/50 border-b border-white/5">
                <tr>
                  <th className="text-left py-4 px-6 text-xs font-medium text-stone-500 uppercase tracking-wider">Transaction</th>
                  <th className="text-left py-4 px-6 text-xs font-medium text-stone-500 uppercase tracking-wider">Date</th>
                  <th className="text-left py-4 px-6 text-xs font-medium text-stone-500 uppercase tracking-wider">Status</th>
                  <th className="text-right py-4 px-6 text-xs font-medium text-stone-500 uppercase tracking-wider">Amount</th>
                  <th className="py-4 px-6 w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {paginatedTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-stone-800/40 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-stone-800 border border-white/5 flex items-center justify-center flex-shrink-0">
                          {transaction.type === "received" ? (
                            <ArrowDownLeft className="w-5 h-5 text-emerald-400" />
                          ) : (
                            <ArrowUpRight className="w-5 h-5 text-rose-400" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-white truncate">{transaction.name}</p>
                          <p className="text-xs text-stone-500 truncate">{transaction.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-sm text-stone-400">
                        {new Date(transaction.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </td>
                    <td className="py-4 px-6">
                      <Badge
                        variant="outline"
                        className={`text-xs ${transaction.status === "completed"
                          ? "border-emerald-500/30 text-emerald-400 bg-emerald-500/10"
                          : "border-amber-500/30 text-amber-400 bg-amber-500/10"
                          }`}
                      >
                        {transaction.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <p className={`text-sm font-semibold ${transaction.type === "received" ? "text-emerald-400" : "text-white"}`}>
                        {transaction.type === "received" ? "+" : "-"}₹{Math.abs(transaction.amount).toFixed(2)}
                      </p>
                      <p className="text-xs text-stone-500">{transaction.type}</p>
                    </td>
                    <td className="py-4 px-6">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-stone-500 hover:text-white">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-4 p-4">
            {paginatedTransactions.map((transaction) => (
              <Card key={transaction.id} className="bg-stone-800/30 border-white/5">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-stone-800 border border-white/5 flex items-center justify-center">
                        {transaction.type === "received" ? (
                          <ArrowDownLeft className="w-5 h-5 text-emerald-400" />
                        ) : (
                          <ArrowUpRight className="w-5 h-5 text-rose-400" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white truncate">{transaction.name}</p>
                        <p className="text-xs text-stone-500">{transaction.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-semibold ${transaction.type === "received" ? "text-emerald-400" : "text-white"}`}>
                        {transaction.type === "received" ? "+" : "-"}₹{Math.abs(transaction.amount).toFixed(2)}
                      </p>
                      <p className="text-xs text-stone-500 capitalize">{transaction.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <p className="text-xs text-stone-500">
                      {new Date(transaction.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </p>
                    <Badge variant="outline" className="text-xs border-emerald-500/30 text-emerald-400 bg-emerald-500/10">
                      {transaction.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {paginatedTransactions.length === 0 && (
            <div className="py-12 text-center">
              <Receipt className="w-12 h-12 text-stone-600 mx-auto mb-4" />
              <p className="text-stone-400">No transactions found</p>
            </div>
          )}
        </CardContent>
      </Card>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-stone-400">
            Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, filteredTransactions.length)} of {filteredTransactions.length} transactions
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className="border-stone-700 text-stone-300 hover:bg-stone-800 disabled:opacity-50">
              <ChevronLeft className="w-4 h-4 mr-1" />Previous
            </Button>
            <span className="text-sm text-stone-400 px-2">{currentPage} of {totalPages}</span>
            <Button variant="outline" size="sm" onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="border-stone-700 text-stone-300 hover:bg-stone-800 disabled:opacity-50">
              Next<ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
