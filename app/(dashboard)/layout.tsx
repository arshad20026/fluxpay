import { ReactNode } from "react";
import { Sidebar } from "@/app/components/sidebar";
import { Header } from "@/app/components/header";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex relative overflow-x-hidden">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:block w-72 fixed inset-y-0 left-0 z-50">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-72 flex flex-col min-h-screen relative z-0">
        <Header />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
