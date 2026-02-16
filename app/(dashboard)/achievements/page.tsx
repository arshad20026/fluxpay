"use client";

import RewardsPage from "../rewards/page";
import { useState, useEffect } from "react";

// This is a wrapper to show the achievements tab by default
export default function AchievementsPage() {
    return <RewardsPage defaultTab="achievements" />;
}
