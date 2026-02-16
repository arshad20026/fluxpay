"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  ArrowDownLeft,
  Search,
  Filter,
  Download,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useEffect } from "react";
import { apiClient } from "@/lib/api-client";

const ITEMS_PER_PAGE = 8;

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | "sent" | "received">("all");
  const [dateFilter, setDateFilter] = useState<"all" | "today" | "week" | "month">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [allTransactions, setAllTransactions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await apiClient.get("/transaction/history");
        // Transform backend data to fit UI if needed
        const currentUserId = JSON.parse(localStorage.getItem("user") || "{}").id;

        const transformed = data.map((t: any) => {
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
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  // Filter transactions
  const filteredTransactions = allTransactions.filter((transaction) => {
    const matchesSearch =
      transaction.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || transaction.type === typeFilter;
    return matchesSearch && matchesType;
  });

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-slide-up">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Transactions</h1>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            <p className="text-slate-400 mt-1">View and manage your payment history</p>
          </div>
        </div>
        <Button
          variant="outline"
          className="border-slate-700/50 text-slate-300 hover:bg-slate-800/50 hover:text-white self-start sm:self-auto"
        >
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Filters */}
      <Card className="bg-slate-800/30 border-slate-700/50 animate-slide-up delay-100">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
              <Input
                type="text"
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-12 h-12 bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-500 focus:border-teal-500"
              />
            </div>

            {/* Type Filter */}
            <Select
              value={typeFilter}
              onValueChange={(value: "all" | "sent" | "received") => {
                setTypeFilter(value);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-full lg:w-[180px] h-12 bg-slate-800/50 border-slate-600/50 text-white">
                <Filter className="w-4 h-4 mr-2 text-slate-500" />
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="all" className="text-white hover:bg-slate-700">All Transactions</SelectItem>
                <SelectItem value="sent" className="text-white hover:bg-slate-700">Sent</SelectItem>
                <SelectItem value="received" className="text-white hover:bg-slate-700">Received</SelectItem>
              </SelectContent>
            </Select>

            {/* Date Filter */}
            <Select
              value={dateFilter}
              onValueChange={(value: "all" | "today" | "week" | "month") => {
                setDateFilter(value);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-full lg:w-[180px] h-12 bg-slate-800/50 border-slate-600/50 text-white">
                <SelectValue placeholder="Filter by date" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="all" className="text-white hover:bg-slate-700">All Time</SelectItem>
                <SelectItem value="today" className="text-white hover:bg-slate-700">Today</SelectItem>
                <SelectItem value="week" className="text-white hover:bg-slate-700">This Week</SelectItem>
                <SelectItem value="month" className="text-white hover:bg-slate-700">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card className="bg-slate-800/30 border-slate-700/50 overflow-hidden animate-slide-up delay-200">
        <CardContent className="p-0">
          {/* Desktop Table */}
          <div className="hidden md:block">
            <table className="w-full">
              <thead className="bg-slate-900/50 border-b border-slate-700/50">
                <tr>
                  <th className="text-left py-4 px-6 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Transaction
                  </th>
                  <th className="text-left py-4 px-6 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="text-left py-4 px-6 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-right py-4 px-6 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="py-4 px-6 w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {paginatedTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-medium text-slate-300">{transaction.avatar}</span>
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-white truncate">{transaction.name}</p>
                          <p className="text-xs text-slate-500 truncate">{transaction.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-sm text-slate-400">
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
                          ? "border-teal-500/30 text-teal-400 bg-teal-500/10"
                          : "border-amber-500/30 text-amber-400 bg-amber-500/10"
                          }`}
                      >
                        {transaction.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <p
                        className={`text-sm font-semibold ${transaction.type === "received" ? "text-teal-400" : "text-white"
                          }`}
                      >
                        {transaction.type === "received" ? "+" : ""}
                        ₹{Math.abs(transaction.amount).toFixed(2)}
                      </p>
                      <p className="text-xs text-slate-500">{transaction.type}</p>
                    </td>
                    <td className="py-4 px-6">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-slate-300">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-4 animate-slide-up delay-200">
            {paginatedTransactions.map((transaction) => (
              <Card key={transaction.id} className="bg-slate-800/30 border-slate-700/50 hover-card-premium">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-medium text-slate-300">{transaction.avatar}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white truncate">{transaction.name}</p>
                        <p className="text-xs text-slate-500">{transaction.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-semibold ${transaction.type === "received" ? "text-teal-400" : "text-white"}`}>
                        {transaction.type === "received" ? "+" : ""}
                        ₹{Math.abs(transaction.amount).toFixed(2)}
                      </p>
                      <p className="text-xs text-slate-500 capitalize">{transaction.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
                    <p className="text-xs text-slate-500">
                      {new Date(transaction.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                    <Badge
                      variant="outline"
                      className={`text-xs ${transaction.status === "completed"
                        ? "border-teal-500/30 text-teal-400 bg-teal-500/10"
                        : "border-amber-500/30 text-amber-400 bg-amber-500/10"
                        }`}
                    >
                      {transaction.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {
            paginatedTransactions.length === 0 && (
              <div className="py-12 text-center">
                <p className="text-slate-400">No transactions found</p>
              </div>
            )
          }
        </CardContent >
      </Card >

      {/* Pagination */}
      {
        totalPages > 1 && (
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-400">
              Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
              {Math.min(currentPage * ITEMS_PER_PAGE, filteredTransactions.length)} of{" "}
              {filteredTransactions.length} transactions
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="border-slate-700/50 text-slate-300 hover:bg-slate-800/50 disabled:opacity-50"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>
              <span className="text-sm text-slate-400 px-2">
                {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="border-slate-700/50 text-slate-300 hover:bg-slate-800/50 disabled:opacity-50"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        )
      }
    </div >
  );
}
