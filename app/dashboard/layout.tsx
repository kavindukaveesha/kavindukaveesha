import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Space Portfolio",
  description: "Manage your portfolio content",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-space-950">
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-space-900 border-r border-space-800">
        <div className="flex h-full flex-col px-3 py-4">
          <div className="mb-10 px-3">
            <h2 className="text-2xl font-bold text-neutron-200">Dashboard</h2>
          </div>
          
          <nav className="flex-1 space-y-2">
            <a href="/dashboard" className="flex items-center px-3 py-2 text-neutron-300 rounded-lg hover:bg-space-800 hover:text-neutron-100 transition-colors">
              <span>Overview</span>
            </a>
            <a href="/dashboard/projects" className="flex items-center px-3 py-2 text-neutron-300 rounded-lg hover:bg-space-800 hover:text-neutron-100 transition-colors">
              <span>Projects</span>
            </a>
            <a href="/dashboard/profile" className="flex items-center px-3 py-2 text-neutron-300 rounded-lg hover:bg-space-800 hover:text-neutron-100 transition-colors">
              <span>Profile</span>
            </a>
            <a href="/dashboard/analytics" className="flex items-center px-3 py-2 text-neutron-300 rounded-lg hover:bg-space-800 hover:text-neutron-100 transition-colors">
              <span>Analytics</span>
            </a>
            <a href="/dashboard/settings" className="flex items-center px-3 py-2 text-neutron-300 rounded-lg hover:bg-space-800 hover:text-neutron-100 transition-colors">
              <span>Settings</span>
            </a>
          </nav>
          
          <div className="border-t border-space-800 pt-4">
            <a href="/" className="flex items-center px-3 py-2 text-neutron-300 rounded-lg hover:bg-space-800 hover:text-neutron-100 transition-colors">
              <span>View Portfolio</span>
            </a>
            <button className="w-full flex items-center px-3 py-2 text-nova-400 rounded-lg hover:bg-space-800 hover:text-nova-300 transition-colors">
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
      
      <main className="ml-64">
        <div className="p-4">
          {children}
        </div>
      </main>
    </div>
  );
}