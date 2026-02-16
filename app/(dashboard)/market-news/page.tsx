"use client";

import { useState } from "react";
import {
    TrendingUp,
    Newspaper,
    Lightbulb,
    Clock,
    Bookmark,
    Share2,
    ExternalLink,
    Sparkles,
    Target,
    AlertCircle,
    CheckCircle,
    ArrowUpRight,
    ArrowDownRight,
    Zap,
    Brain,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock news data
const financialNews = [
    {
        id: 1,
        title: "RBI just bumped up UPI limits - here's what changed",
        summary: "Good news! You can now send up to ₹5 lakh via UPI for healthcare and education. Finally!",
        category: "Policy",
        source: "Economic Times",
        time: "2 hours ago",
        trending: true,
        image: "📰",
    },
    {
        id: 2,
        title: "Crypto rules are changing (again) 🙄",
        summary: "Govt's cooking up new crypto tax rules. Looks like we'll know more by mid-2026. Stay tuned!",
        category: "Crypto",
        source: "Bloomberg",
        time: "5 hours ago",
        trending: true,
        image: "💰",
    },
    {
        id: 3,
        title: "Everyone's going cashless - 12 billion UPI payments last month!",
        summary: "Digital payments are exploding, especially in smaller cities. India's really going all-in on UPI.",
        category: "Market",
        source: "Mint",
        time: "1 day ago",
        trending: false,
        image: "📊",
    },
    {
        id: 4,
        title: "AI in Fintech: The Next Revolution",
        summary: "How artificial intelligence is transforming personal finance management and fraud detection in digital wallets.",
        category: "Technology",
        source: "TechCrunch",
        time: "1 day ago",
        trending: false,
        image: "🤖",
    },
];

// Mock trading tips
const tradingTips = [
    {
        id: 1,
        type: "bullish",
        title: "Bitcoin's holding strong at ₹72L 💪",
        description: "BTC keeps bouncing back from ₹72L - happened 3 times this week. Charts looking pretty good for a move up.",
        confidence: "High",
        timeframe: "Next 1-2 weeks",
        action: "Maybe grab some on the dips",
        icon: ArrowUpRight,
        color: "teal",
    },
    {
        id: 2,
        type: "neutral",
        title: "ETH stuck in a range - patience needed 🤔",
        description: "Ethereum's just chilling between ₹2.8L and ₹3.2L. Let's wait and see which way it breaks.",
        confidence: "Medium",
        timeframe: "Give it 2-4 weeks",
        action: "Just watch for now",
        icon: Target,
        color: "amber",
    },
    {
        id: 3,
        type: "bearish",
        title: "Profit Booking Expected in Tech Stocks",
        description: "After recent rally, tech stocks showing signs of exhaustion. Consider booking partial profits and maintaining stop losses.",
        confidence: "Medium",
        timeframe: "Short-term (1 week)",
        action: "Book partial profits",
        icon: ArrowDownRight,
        color: "red",
    },
];

// AI insights
const aiInsights = [
    {
        id: 1,
        title: "Diversification Opportunity",
        description: "Your portfolio is 80% concentrated in crypto. Consider adding traditional assets for better risk management.",
        priority: "high",
        icon: AlertCircle,
    },
    {
        id: 2,
        title: "Optimal Entry Point",
        description: "Based on historical patterns, current market conditions favor accumulation of blue-chip assets.",
        priority: "medium",
        icon: Lightbulb,
    },
    {
        id: 3,
        title: "Risk Alert",
        description: "Market volatility expected to increase next week due to policy announcements. Adjust position sizes accordingly.",
        priority: "high",
        icon: AlertCircle,
    },
];

// Market movers
const marketMovers = [
    { name: "Bitcoin", change: 3.45, price: "₹72,50,000", volume: "High" },
    { name: "Ethereum", change: -1.23, price: "₹3,20,000", volume: "Medium" },
    { name: "Nifty 50", change: 0.87, price: "21,450", volume: "High" },
    { name: "Gold", change: 2.1, price: "₹62,500/10g", volume: "Low" },
];

export default function TradingNewsPage() {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [bookmarkedNews, setBookmarkedNews] = useState<number[]>([]);

    const toggleBookmark = (newsId: number) => {
        setBookmarkedNews((prev) =>
            prev.includes(newsId) ? prev.filter((id) => id !== newsId) : [...prev, newsId]
        );
    };

    const filteredNews =
        selectedCategory === "all"
            ? financialNews
            : financialNews.filter((news) => news.category.toLowerCase() === selectedCategory);

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
                        <Newspaper className="w-8 h-8 text-blue-400" />
                        Trading Tips & News
                    </h1>
                    <p className="text-slate-400 mt-1">Stay informed with AI-powered insights and market updates</p>
                </div>
                <Badge variant="outline" className="border-blue-500/30 text-blue-400 bg-blue-500/10 px-4 py-2 self-start sm:self-auto">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Live Updates
                </Badge>
            </div>

            {/* Market Movers */}
            <Card className="bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-teal-500/10 border-blue-500/20 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-pulse" />
                <CardContent className="p-6 relative">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-blue-400" />
                        Market Movers
                    </h3>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {marketMovers.map((mover, index) => {
                            const isPositive = mover.change > 0;
                            return (
                                <div key={index} className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                                    <p className="text-xs text-slate-500 mb-1">{mover.name}</p>
                                    <p className="text-lg font-bold text-white mb-1">{mover.price}</p>
                                    <div className="flex items-center justify-between">
                                        <Badge
                                            variant="outline"
                                            className={`text-xs ${isPositive
                                                ? "border-teal-500/30 text-teal-400 bg-teal-500/10"
                                                : "border-red-500/30 text-red-400 bg-red-500/10"
                                                }`}
                                        >
                                            {isPositive ? "+" : ""}
                                            {mover.change}%
                                        </Badge>
                                        <span className="text-xs text-slate-500">{mover.volume}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>

            <Tabs defaultValue="news" className="w-full">
                <TabsList className="bg-slate-800/50 border-slate-700/50">
                    <TabsTrigger value="news" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
                        <Newspaper className="w-4 h-4 mr-2" />
                        News
                    </TabsTrigger>
                    <TabsTrigger value="tips" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
                        <Lightbulb className="w-4 h-4 mr-2" />
                        Trading Tips
                    </TabsTrigger>
                    <TabsTrigger value="ai" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
                        <Brain className="w-4 h-4 mr-2" />
                        AI Insights
                    </TabsTrigger>
                </TabsList>

                {/* News Tab */}
                <TabsContent value="news" className="space-y-4 mt-6">
                    {/* Category Filter */}
                    <div className="flex gap-2 flex-wrap">
                        {["all", "policy", "crypto", "market", "technology"].map((category) => (
                            <Button
                                key={category}
                                variant={selectedCategory === category ? "default" : "outline"}
                                size="sm"
                                onClick={() => setSelectedCategory(category)}
                                className={
                                    selectedCategory === category
                                        ? "bg-blue-500 hover:bg-blue-600 text-white"
                                        : "border-slate-600 text-slate-400 hover:bg-slate-700/50"
                                }
                            >
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </Button>
                        ))}
                    </div>

                    {/* News Cards */}
                    <div className="space-y-4">
                        {filteredNews.map((news) => (
                            <Card key={news.id} className="bg-slate-800/30 border-slate-700/50 hover:bg-slate-800/50 transition-all">
                                <CardContent className="p-5">
                                    <div className="flex items-start gap-4">
                                        <div className="text-4xl">{news.image}</div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2 mb-2">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <h4 className="text-base font-semibold text-white">{news.title}</h4>
                                                        {news.trending && (
                                                            <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">
                                                                <Zap className="w-3 h-3 mr-1" />
                                                                Trending
                                                            </Badge>
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-slate-400 leading-relaxed mb-3">{news.summary}</p>
                                                    <div className="flex items-center gap-4 text-xs text-slate-500">
                                                        <span className="flex items-center gap-1">
                                                            <Clock className="w-3 h-3" />
                                                            {news.time}
                                                        </span>
                                                        <Badge variant="outline" className="border-slate-600 text-slate-400 text-xs">
                                                            {news.category}
                                                        </Badge>
                                                        <span>{news.source}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 mt-3">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => toggleBookmark(news.id)}
                                                    className={`border-slate-600 text-slate-400 hover:bg-slate-700/50 ${bookmarkedNews.includes(news.id) ? "text-yellow-400 border-yellow-500/30" : ""
                                                        }`}
                                                >
                                                    <Bookmark className="w-3 h-3 mr-1" />
                                                    {bookmarkedNews.includes(news.id) ? "Saved" : "Save"}
                                                </Button>
                                                <Button variant="outline" size="sm" className="border-slate-600 text-slate-400 hover:bg-slate-700/50">
                                                    <Share2 className="w-3 h-3 mr-1" />
                                                    Share
                                                </Button>
                                                <Button variant="outline" size="sm" className="border-slate-600 text-slate-400 hover:bg-slate-700/50">
                                                    <ExternalLink className="w-3 h-3 mr-1" />
                                                    Read More
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                {/* Trading Tips Tab */}
                <TabsContent value="tips" className="space-y-4 mt-6">
                    {tradingTips.map((tip) => (
                        <Card
                            key={tip.id}
                            className={`bg-slate-800/30 border-slate-700/50 hover:bg-slate-800/50 transition-all border-l-4 ${tip.color === "teal"
                                ? "border-l-teal-500"
                                : tip.color === "amber"
                                    ? "border-l-amber-500"
                                    : "border-l-red-500"
                                }`}
                        >
                            <CardContent className="p-5">
                                <div className="flex items-start gap-4">
                                    <div
                                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${tip.color === "teal"
                                            ? "bg-teal-500/10 text-teal-400"
                                            : tip.color === "amber"
                                                ? "bg-amber-500/10 text-amber-400"
                                                : "bg-red-500/10 text-red-400"
                                            }`}
                                    >
                                        <tip.icon className="w-6 h-6" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between gap-2 mb-2">
                                            <h4 className="text-base font-semibold text-white">{tip.title}</h4>
                                            <Badge
                                                variant="outline"
                                                className={`text-xs ${tip.confidence === "High"
                                                    ? "border-teal-500/30 text-teal-400 bg-teal-500/10"
                                                    : "border-amber-500/30 text-amber-400 bg-amber-500/10"
                                                    }`}
                                            >
                                                {tip.confidence} Confidence
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-slate-400 leading-relaxed mb-3">{tip.description}</p>
                                        <div className="grid grid-cols-2 gap-3 mb-3">
                                            <div className="bg-slate-800/50 rounded-lg p-3">
                                                <p className="text-xs text-slate-500 mb-1">Timeframe</p>
                                                <p className="text-sm font-semibold text-white">{tip.timeframe}</p>
                                            </div>
                                            <div className="bg-slate-800/50 rounded-lg p-3">
                                                <p className="text-xs text-slate-500 mb-1">Recommended Action</p>
                                                <p className="text-sm font-semibold text-white">{tip.action}</p>
                                            </div>
                                        </div>
                                        <Badge
                                            className={`${tip.type === "bullish"
                                                ? "bg-teal-500/20 text-teal-400 border-teal-500/30"
                                                : tip.type === "neutral"
                                                    ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
                                                    : "bg-red-500/20 text-red-400 border-red-500/30"
                                                }`}
                                        >
                                            {tip.type.toUpperCase()}
                                        </Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </TabsContent>

                {/* AI Insights Tab */}
                <TabsContent value="ai" className="space-y-4 mt-6">
                    <Card className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-purple-500/20">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
                                <Brain className="w-5 h-5 text-purple-400" />
                                AI-Powered Investment Insights
                            </CardTitle>
                            <CardDescription className="text-slate-400">
                                Personalized recommendations based on your portfolio and market analysis
                            </CardDescription>
                        </CardHeader>
                    </Card>

                    {aiInsights.map((insight) => (
                        <Card key={insight.id} className="bg-slate-800/30 border-slate-700/50">
                            <CardContent className="p-5">
                                <div className="flex items-start gap-4">
                                    <div
                                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${insight.priority === "high"
                                            ? "bg-red-500/10 text-red-400"
                                            : "bg-blue-500/10 text-blue-400"
                                            }`}
                                    >
                                        <insight.icon className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between gap-2 mb-2">
                                            <h4 className="text-sm font-semibold text-white">{insight.title}</h4>
                                            <Badge
                                                variant="outline"
                                                className={`text-xs ${insight.priority === "high"
                                                    ? "border-red-500/30 text-red-400 bg-red-500/10"
                                                    : "border-blue-500/30 text-blue-400 bg-blue-500/10"
                                                    }`}
                                            >
                                                {insight.priority}
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-slate-400">{insight.description}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </TabsContent>
            </Tabs>
        </div>
    );
}
