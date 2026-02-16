import React from 'react';
import { Newspaper, TrendingUp, Clock, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface NewsItem {
    id: number;
    title: string;
    category: string;
    time: string;
    trending?: boolean;
}

const topNews: NewsItem[] = [
    {
        id: 1,
        title: "RBI Announces New UPI Transaction Limits",
        category: "Policy",
        time: "2h ago",
        trending: true,
    },
    {
        id: 2,
        title: "Cryptocurrency Regulations Update 2026",
        category: "Crypto",
        time: "5h ago",
        trending: true,
    },
    {
        id: 3,
        title: "Digital Payments Surge 45% in India",
        category: "Market",
        time: "1d ago",
    },
];

export function MarketNewsWidget() {
    return (
        <Card className="glass-card hover:bg-white/10 transition-all">
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
                        <Newspaper className="w-5 h-5 text-blue-400" />
                        Market News
                    </CardTitle>
                    <Badge variant="outline" className="border-green-500/30 text-green-400 bg-green-500/10 animate-pulse">
                        LIVE
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="space-y-3">
                {topNews.map((news) => (
                    <div
                        key={news.id}
                        className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all cursor-pointer border border-white/5"
                    >
                        <div className="flex items-start justify-between gap-2 mb-2">
                            <h4 className="text-sm font-medium text-white line-clamp-2 flex-1">{news.title}</h4>
                            {news.trending && (
                                <TrendingUp className="w-4 h-4 text-red-400 flex-shrink-0" />
                            )}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                            <Badge variant="outline" className="border-slate-600 text-slate-400 text-xs px-2 py-0">
                                {news.category}
                            </Badge>
                            <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {news.time}
                            </span>
                        </div>
                    </div>
                ))}
                <Link href="/market-news">
                    <Button
                        variant="outline"
                        className="w-full h-9 border-blue-500/30 text-blue-400 hover:bg-blue-500/10 font-medium"
                    >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View All News
                    </Button>
                </Link>
            </CardContent>
        </Card>
    );
}
