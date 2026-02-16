import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Bell, Rocket } from "lucide-react";
import Link from "next/link";
import type { ComponentType } from "react";

interface ComingSoonProps {
    title: string;
    description?: string;
    badge?: string;
    icon?: ComponentType<{ className?: string }>;
}

export function ComingSoon({
    title,
    description = "We're crafting this feature with precision and care. Stay tuned for something amazing!",
    badge = "IN DEVELOPMENT",
    icon: Icon = Rocket
}: ComingSoonProps) {
    return (
        <div className="min-h-[60vh] flex items-center justify-center p-4 animate-fade-in">
            <Card className="w-full max-w-lg bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700/50 shadow-2xl relative overflow-hidden">
                {/* Background Effects */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                <CardContent className="p-8 sm:p-12 text-center relative z-10">
                    <div className="w-20 h-20 mx-auto bg-gradient-to-br from-slate-800 to-slate-700 rounded-3xl flex items-center justify-center mb-6 shadow-inner border border-slate-600/50 relative group">
                        <Icon className="w-10 h-10 text-teal-400 group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute -top-2 -right-2">
                            <span className="relative flex h-4 w-4">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-4 w-4 bg-teal-500"></span>
                            </span>
                        </div>
                    </div>

                    <Badge variant="outline" className="mb-4 border-teal-500/30 text-teal-400 bg-teal-500/10 tracking-wider">
                        {badge}
                    </Badge>

                    <h1 className="text-3xl font-bold text-white mb-3 tracking-tight">
                        {title}
                    </h1>

                    <p className="text-slate-400 mb-8 leading-relaxed">
                        {description}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Button className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white shadow-lg shadow-teal-500/20 group">
                            <Bell className="w-4 h-4 mr-2 group-hover:shake" />
                            Notify Me
                        </Button>
                        <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white" asChild>
                            <Link href="/">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Dashboard
                            </Link>
                        </Button>
                    </div>

                    {/* Progress Bar Simulation */}
                    <div className="mt-8">
                        <div className="flex justify-between text-xs text-slate-500 mb-2">
                            <span>Progress</span>
                            <span>75%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 w-[75%] rounded-full animate-pulse"></div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
