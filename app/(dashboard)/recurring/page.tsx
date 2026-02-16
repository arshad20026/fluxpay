"use client";
import { ComingSoon } from "@/components/coming-soon";
import { Repeat } from "lucide-react";

export default function RecurringPage() {
  return (
    <ComingSoon
      title="Recurring Payments"
      description="Manage subscriptions and recurring bills in one place. Never miss a payment date again."
      icon={Repeat}
      badge="PLANNED"
    />
  );
}
