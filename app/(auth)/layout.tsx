import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden bg-[#020617]">
      {/* Cinematic Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/40 via-[#020617] to-purple-950/40 pointer-events-none" />

      {/* Ambient Glowing Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-500/10 blur-[140px] rounded-full pointer-events-none animate-pulse" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-purple-500/10 blur-[140px] rounded-full pointer-events-none animate-pulse" />

      <div className="w-full max-w-md relative z-10 animate-fade-in flex flex-col items-center">
        {children}
      </div>
    </div>
  );
}
