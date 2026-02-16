"use client";

import { useEffect, useState } from "react";
import LandingPage from "./landing/page";
import { useRouter } from "next/navigation";

export default function RootPage() {
    const [isAuth] = useState<boolean | null>(() => {
        if (typeof window === "undefined") {
            return null;
        }
        const token = localStorage.getItem("token");
        return token ? true : false;
    });
    const router = useRouter();

    useEffect(() => {
        if (isAuth) {
            router.push("/dashboard");
        }
    }, [isAuth, router]);

    if (isAuth === null) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-teal-500/20 border-t-teal-500 rounded-full animate-spin" />
            </div>
        );
    }

    return <LandingPage />;
}
