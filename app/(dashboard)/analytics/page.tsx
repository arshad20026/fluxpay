"use client";

import { useState } from "react";
import {
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Filter,
  Download,
  PieChart as PieIcon,
  Activity,
  DollarSign,
  Target,
  Zap
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie
} from "recharts";

const performanceData = [
  { month: "Jan", income: 4500, spending: 3200 },
  { month: "Feb", income: 5200, spending: 3800 },
  { month: "Mar", income: 4800, spending: 4100 },
  { month: "Apr", income: 6100, spending: 3900 },
  { month: "May", income: 5900, spending: 4200 },
  { month: "Jun", income: 7200, spending: 4800 },
];

const categoryData = [
  { name: "Shopping", value: 35, color: "#14b8a6" },
  { name: "Food", value: 25, color: "#3b82f6" },
  { name: "Rent", value: 20, color: "#8b5cf6" },
  { name: "Others", value: 20, color: "#64748b" },
];

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("6M");

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight">Intelligence <span className="text-teal-500">.</span></h1>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-2">Predictive Spending & Asset Velocity</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-white/5 rounded-xl p-1 flex items-center gap-1 border border-white/5">
            {["1M", "3M", "6M", "1Y"].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={cn(
                  "px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                  timeRange === range ? "bg-white text-slate-950 shadow-lg" : "text-slate-500 hover:text-white"
                )}
              >
                {range}
              </button>
            ))}
          </div>
          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl bg-white/5 border border-white/5 text-slate-400">
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Net velocity" value="₹2,45,290" trend="+12.5%" icon={<TrendingUp className="w-5 h-5" />} positive />
        <MetricCard title="Avg daily burn" value="₹1,240" trend="-4.2%" icon={<Activity className="w-5 h-5" />} positive={false} />
        <MetricCard title="Savings rate" value="32.4%" trend="+2.1%" icon={<Target className="w-5 h-5" />} positive />
        <MetricCard title="Capital efficiency" value="94.2" trend="+5.8" icon={<Zap className="w-5 h-5" />} positive />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main chart */}
        <Card className="lg:col-span-8 glass-card border-white/5 rounded-[2rem] overflow-hidden">
          <CardHeader className="p-8 pb-0">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-black text-white uppercase tracking-widest">Financial Trajectory</CardTitle>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Income vs Expenditure (Calculated in Real-time)</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-teal-500" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Inflow</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Outflow</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8 h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorIn" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorOut" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748b', fontSize: 10, fontWeight: 700 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748b', fontSize: 10, fontWeight: 700 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderRadius: '16px',
                    border: '1px solid rgba(255,255,255,0.05)',
                    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
                  }}
                  itemStyle={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}
                />
                <Area
                  type="monotone"
                  dataKey="income"
                  stroke="#14b8a6"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorIn)"
                />
                <Area
                  type="monotone"
                  dataKey="spending"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorOut)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Distribution */}
        <Card className="lg:col-span-4 glass-card border-white/5 rounded-[2rem] overflow-hidden flex flex-col">
          <CardHeader className="p-8 pb-0">
            <CardTitle className="text-lg font-black text-white uppercase tracking-widest">Asset Allocation</CardTitle>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Categorical Breakdown</p>
          </CardHeader>
          <CardContent className="p-8 flex-1 flex flex-col justify-center">
            <div className="h-[200px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={10}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-black text-white tracking-tighter">₹84k</span>
                <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Spent</span>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              {categoryData.map((cat) => (
                <div key={cat.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{cat.name}</span>
                  </div>
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">{cat.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function MetricCard({ title, value, trend, icon, positive }: { title: string, value: string, trend: string, icon: React.ReactNode, positive: boolean }) {
  return (
    <Card className="glass-card border-white/5 rounded-3xl group overflow-hidden relative">
      <div className={`absolute top-0 left-0 w-1 h-full ${positive ? 'bg-teal-500' : 'bg-red-500'}`} />
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 group-hover:bg-white/10 transition-colors">
            {icon}
          </div>
          <Badge variant="outline" className={cn(
            "text-[8px] font-black tracking-widest px-2 py-0 border-none",
            positive ? 'bg-teal-500/10 text-teal-400' : 'bg-red-500/10 text-red-500'
          )}>
            {trend}
          </Badge>
        </div>
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">{title}</p>
        <h3 className="text-2xl font-black text-white tracking-tighter">{value}</h3>
      </CardContent>
    </Card>
  );
}

function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(' ');
}
