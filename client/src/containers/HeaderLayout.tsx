import type { ReactNode } from "react";
import { useState } from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";

export default function HeaderLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col">
      <Header onMenuClick={() => setSidebarOpen(open => !open)} />
      <div className="flex flex-1">
        <SideBar open={sidebarOpen} />
        <main className="flex-1 p-4">
          {children}
        </main>
      </div>
    </div>
  );
}