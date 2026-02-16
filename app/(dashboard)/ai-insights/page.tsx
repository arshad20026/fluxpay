"use client";

import { useState } from "react";
import {
    Brain,
    TrendingUp,
    TrendingDown,
    Target,
    Lightbulb,
    Sparkles,
    PieChart,
    BarChart3,
    Calendar,
    ArrowUpRight,
    ArrowDownRight,
    Zap,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock AI insights data
const financialHealthScore = 78;

const aiInsights = [
    {
        id: 1,
        type: "savings",
        title: "Quick tip: Save ₹3.5K this month 💰",
        description: "We noticed you love eating out! Cut back just 20% and you'll have an extra ₹3,500 to play with",
        impact: "high",
        icon: Target,
    },
    {
        id: 2,
        type: "warning",
        title: "Netflix binge much? 📺",
        description: "Your entertainment spending jumped 45% - maybe time to chill on those subscriptions?",
        impact: "medium",
        icon: TrendingUp,
    },
    {
        id: 3,
        type: "achievement",
        title: "Grocery game strong! 🛒",
        description: "Nice! You saved 15% on groceries vs last month. Those coupons are paying off!",
        impact: "positive",
        icon: Sparkles,
    },
];

const budgetCategories = [
    { name: "Food & Dining", spent: 8500, budget: 10000, color: "from-orange-500 to-red-500" },
    { name: "Transportation", spent: 3200, budget: 5000, color: "from-blue-500 to-cyan-500" },
    { name: "Entertainment", spent: 4800, budget: 4000, color: "from-purple-500 to-pink-500" },
    { name: "Shopping", spent: 6200, budget: 8000, color: "from-green-500 to-teal-500" },
    { name: "Bills & Utilities", spent: 5500, budget: 6000, color: "from-yellow-500 to-orange-500" },
];

const predictions = [
    { month: "Next Month", income: 45000, expenses: 32000, savings: 13000 },
    { month: "2 Months", income: 45000, expenses: 30500, savings: 14500 },
    { month: "3 Months", income: 47000, expenses: 31000, savings: 16000 },
];

const savingsGoals = [
    { name: "Emergency Fund", current: 45000, target: 100000, deadline: "Dec 2026" },
    { name: "Vacation", current: 12000, target: 50000, deadline: "Jun 2026" },
    { name: "New Laptop", current: 35000, target: 80000, deadline: "Mar 2026" },
];

export default function AIInsightsPage() {
    const [selectedPeriod, setSelectedPeriod] = useState<"week" | "month" | "year">("month");

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
                        <Brain className="w-8 h-8 text-teal-400" />
                        AI Financial Insights
                    </h1>
                    <p className="text-slate-400 mt-1">Powered by machine learning • Personalized for you</p>
                </div>
                <Badge variant="outline" className="border-purple-500/30 text-purple-400 bg-purple-500/10 px-4 py-2 self-start sm:self-auto">
                    <Sparkles className="w-4 h-4 mr-2" />
                    AI Powered
                </Badge>
            </div>

            {/* Financial Health Score */}
            <Card className="bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-teal-500/10 border-purple-500/20 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-pulse" />
                <CardContent className="p-6 sm:p-8 relative">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                                    <Brain className="w-7 h-7 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">Financial Health Score</h3>
                                    <p className="text-sm text-slate-400">AI-calculated wellness metric</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-baseline gap-3">
                                    <span className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                                        {financialHealthScore}
                                    </span>
                                    <span className="text-2xl text-slate-400">/100</span>
                                    <Badge className="bg-teal-500/20 text-teal-400 border-teal-500/30">
                                        <TrendingUp className="w-3 h-3 mr-1" />
                                        +5 this month
                                    </Badge>
                                </div>
                                <Progress value={financialHealthScore} className="h-3" />
                                <p className="text-sm text-slate-300">
                                    <span className="text-teal-400 font-semibold">Good!</span> You're managing your finances well. Keep it up!
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 w-full lg:w-auto">
                            <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700/50">
                                <TrendingUp className="w-6 h-6 text-teal-400 mb-3" />
                                <p className="text-3xl font-bold text-white">₹13K</p>
                                <p className="text-xs text-slate-500 mt-1">Avg Monthly Savings</p>
                            </div>
                            <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700/50">
                                <Target className="w-6 h-6 text-purple-400 mb-3" />
                                <p className="text-3xl font-bold text-white">3/5</p>
                                <p className="text-xs text-slate-500 mt-1">Goals On Track</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* AI Insights Cards */}
            <div>
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-yellow-400" />
                    Smart Recommendations
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {aiInsights.map((insight) => (
                        <Card
                            key={insight.id}
                            className={`bg-slate-800/30 border-slate-700/50 hover:bg-slate-800/50 transition-all hover:-translate-y-1`}
                        >
                            <CardContent className="p-5">
                                <div className="flex items-start gap-3 mb-3">
                                    <div
                                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${insight.impact === "high"
                                            ? "bg-teal-500/10 text-teal-400"
                                            : insight.impact === "medium"
                                                ? "bg-amber-500/10 text-amber-400"
                                                : "bg-purple-500/10 text-purple-400"
                                            }`}
                                    >
                                        <insight.icon className="w-5 h-5" />
                                    </div>
                                    <Badge
                                        variant="outline"
                                        className={`text-xs ${insight.impact === "high"
                                            ? "border-teal-500/30 text-teal-400 bg-teal-500/10"
                                            : insight.impact === "medium"
                                                ? "border-amber-500/30 text-amber-400 bg-amber-500/10"
                                                : "border-purple-500/30 text-purple-400 bg-purple-500/10"
                                            }`}
                                    >
                                        {insight.type}
                                    </Badge>
                                </div>
                                <h4 className="text-sm font-semibold text-white mb-2">{insight.title}</h4>
                                <p className="text-xs text-slate-400 leading-relaxed">{insight.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            <Tabs defaultValue="budget" className="w-full">
                <TabsList className="bg-slate-800/50 border-slate-700/50">
                    <TabsTrigger value="budget" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">
                        <PieChart className="w-4 h-4 mr-2" />
                        Smart Budget
                    </TabsTrigger>
                    <TabsTrigger value="predictions" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        Predictions
                    </TabsTrigger>
                    <TabsTrigger value="goals" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">
                        <Target className="w-4 h-4 mr-2" />
                        Savings Goals
                    </TabsTrigger>
                </TabsList>

                {/* Smart Budget Tab */}
                <TabsContent value="budget" className="space-y-4 mt-6">
                    <Card className="bg-slate-800/30 border-slate-700/50">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold text-white">Category-wise Spending</CardTitle>
                            <CardDescription className="text-slate-400">AI-optimized budget allocation</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {budgetCategories.map((category, index) => {
                                const percentage = (category.spent / category.budget) * 100;
                                const isOverBudget = percentage > 100;
                                return (
                                    <div key={index} className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium text-white">{category.name}</span>
                                            <div className="flex items-center gap-2">
                                                <span className={`text-sm font-semibold ${isOverBudget ? "text-red-400" : "text-slate-300"}`}>
                                                    ₹{category.spent.toLocaleString()}
                                                </span>
                                                <span className="text-xs text-slate-500">/ ₹{category.budget.toLocaleString()}</span>
                                            </div>
                                        </div>
                                        <div className="relative h-2 bg-slate-700 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full bg-gradient-to-r ${category.color} rounded-full transition-all duration-500`}
                                                style={{ width: `${Math.min(percentage, 100)}%` }}
                                            />
                                        </div>
                                        <div className="flex items-center justify-between text-xs">
                                            <span className={isOverBudget ? "text-red-400" : "text-slate-500"}>
                                                {percentage.toFixed(0)}% used
                                            </span>
                                            {isOverBudget && (
                                                <Badge variant="outline" className="border-red-500/30 text-red-400 bg-red-500/10 text-xs">
                                                    Over budget
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Predictions Tab */}
                <TabsContent value="predictions" className="space-y-4 mt-6">
                    <Card className="bg-slate-800/30 border-slate-700/50">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold text-white">AI Financial Forecast</CardTitle>
                            <CardDescription className="text-slate-400">Predicted income, expenses, and savings</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {predictions.map((pred, index) => (
                                <div key={index} className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-sm font-semibold text-white flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-purple-400" />
                                            {pred.month}
                                        </span>
                                        <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                                            Predicted
                                        </Badge>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div>
                                            <p className="text-xs text-slate-500 mb-1">Income</p>
                                            <p className="text-lg font-bold text-teal-400 flex items-center gap-1">
                                                <ArrowUpRight className="w-4 h-4" />
                                                ₹{pred.income.toLocaleString()}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 mb-1">Expenses</p>
                                            <p className="text-lg font-bold text-red-400 flex items-center gap-1">
                                                <ArrowDownRight className="w-4 h-4" />
                                                ₹{pred.expenses.toLocaleString()}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 mb-1">Savings</p>
                                            <p className="text-lg font-bold text-white">₹{pred.savings.toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Savings Goals Tab */}
                <TabsContent value="goals" className="space-y-4 mt-6">
                    {savingsGoals.map((goal, index) => {
                        const progress = (goal.current / goal.target) * 100;
                        return (
                            <Card key={index} className="bg-slate-800/30 border-slate-700/50">
                                <CardContent className="p-5">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h4 className="text-sm font-semibold text-white mb-1">{goal.name}</h4>
                                            <p className="text-xs text-slate-500">Target: {goal.deadline}</p>
                                        </div>
                                        <Badge variant="outline" className="border-teal-500/30 text-teal-400 bg-teal-500/10">
                                            {progress.toFixed(0)}%
                                        </Badge>
                                    </div>
                                    <div className="space-y-2">
                                        <Progress value={progress} className="h-2" />
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-white font-semibold">₹{goal.current.toLocaleString()}</span>
                                            <span className="text-slate-500">₹{goal.target.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                    <Button className="w-full h-12 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold">
                        <Target className="w-5 h-5 mr-2" />
                        Create New Goal
                    </Button>
                </TabsContent>
            </Tabs>
        </div>
    );
}
