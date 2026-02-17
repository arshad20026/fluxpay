"use client";

import { useEffect } from "react";
import LandingPage from "./landing/page";
import { useRouter } from "next/navigation";

export default function RootPage() {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            router.replace("/dashboard");
        }
    }, [router]);

    return <LandingPage />;
}
