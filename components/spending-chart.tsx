"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown } from "lucide-react";

const data = [
    { name: 'Mon', spending: 120, income: 200 },
    { name: 'Tue', spending: 180, income: 150 },
    { name: 'Wed', spending: 95, income: 300 },
    { name: 'Thu', spending: 220, income: 180 },
    { name: 'Fri', spending: 160, income: 250 },
    { name: 'Sat', spending: 280, income: 100 },
    { name: 'Sun', spending: 140, income: 220 },
];

type TooltipPayloadItem = {
    value: number;
    payload: {
        name: string;
    };
};

interface CustomTooltipProps {
    active?: boolean;
    payload?: TooltipPayloadItem[];
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-slate-950/90 backdrop-blur-md border border-white/10 rounded-xl p-3 shadow-2xl">
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">{payload[0].payload.name}</p>
                <div className="space-y-1">
                    <p className="text-teal-400 text-xs font-bold flex items-center gap-2">
                        <TrendingUp className="w-3 h-3" />
                        Income: ₹{payload[1]?.value}
                    </p>
                    <p className="text-rose-400 text-xs font-bold flex items-center gap-2">
                        <TrendingDown className="w-3 h-3" />
                        Spending: ₹{payload[0]?.value}
                    </p>
                </div>
            </div>
        );
    }
    return null;
};

export function SpendingChart() {
    return (
        <div className="w-full">
            <div className="h-[280px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorSpending" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.2} />
                                <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.2} />
                                <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                        <XAxis
                            dataKey="name"
                            stroke="rgba(255,255,255,0.3)"
                            axisLine={false}
                            tickLine={false}
                            style={{ fontSize: '10px', fontWeight: 'bold' }}
                        />
                        <YAxis
                            stroke="rgba(255,255,255,0.3)"
                            axisLine={false}
                            tickLine={false}
                            style={{ fontSize: '10px', fontWeight: 'bold' }}
                            tickFormatter={(value) => `₹${value}`}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }} />
                        <Area
                            type="monotone"
                            dataKey="spending"
                            stroke="#f43f5e"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorSpending)"
                            animationDuration={1500}
                        />
                        <Area
                            type="monotone"
                            dataKey="income"
                            stroke="#14b8a6"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorIncome)"
                            animationDuration={1500}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-6 mt-6 px-1">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-teal-400"></div>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Equity Income</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-rose-400"></div>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Outgoing Flux</span>
                </div>
            </div>
        </div>
    );
}
