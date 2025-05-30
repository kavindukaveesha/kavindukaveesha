"use client"

import Sidebar from '@/components/dashboard/sidebar';
import Header from '@/components/dashboard/header';
import { SidebarProvider, useSidebar } from '@/components/dashboard/sidebar-context';

function DashboardContent({ children }: { children: React.ReactNode }) {
  const { collapsed } = useSidebar();
  
  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'var(--dashboard-bg)' }}>
      {/* Background gradient effect with blue-black mix (60%) and blue accents (40%) */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-black-600/8 via-transparent to-blue-600/4 pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-black-600/12 via-transparent to-transparent pointer-events-none" />
      
      <Sidebar />
      <main 
        className={`transition-all duration-300 relative z-10 ${
          collapsed ? 'ml-[80px]' : 'ml-[280px]'
        }`}
      >
        <div className="min-h-screen">
          <Header />
          
          <div className="px-8 py-6">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <DashboardContent>{children}</DashboardContent>
    </SidebarProvider>
  );
}