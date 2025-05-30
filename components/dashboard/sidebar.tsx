"use client"

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useSidebar } from '@/components/dashboard/sidebar-context';
import { 
  LayoutDashboard, 
  Users, 
  FolderKanban, 
  ChevronLeft,
  ChevronRight,
  Settings,
  HelpCircle,
  BarChart4,
  LogOut,
  Code2,
  Home
} from 'lucide-react';

const links = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: 'Users',
    href: '/dashboard/users',
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: 'Projects',
    href: '/dashboard/projects',
    icon: <FolderKanban className="h-5 w-5" />,
  },
  {
    title: 'Analytics',
    href: '/dashboard/analytics',
    icon: <BarChart4 className="h-5 w-5" />,
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: <Settings className="h-5 w-5" />,
  },
  {
    title: 'Help & Support',
    href: '/dashboard/help',
    icon: <HelpCircle className="h-5 w-5" />,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebar();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLogout = () => {
    // Implement logout logic
    console.log('Logout clicked');
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed left-0 top-0 h-screen flex flex-col transition-all duration-300",
        "glass sidebar-gradient",
        "border-r border-border/20",
        collapsed ? "w-[80px]" : "w-[280px]",
        "z-50 shadow-2xl"
      )}
    >
      {/* Toggle button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-4 top-7 z-10 h-8 w-8 rounded-full glass-hover border border-blue-black-500/40 hidden md:flex hover:border-blue-500/50 transition-all duration-300 glow-subtle"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
        <span className="sr-only">Toggle Sidebar</span>
      </Button>

      {/* Logo */}
      <div className={cn(
        "flex h-20 items-center px-6",
        collapsed ? "justify-center" : "justify-start"
      )}>
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-black-600/40 to-blue-600/20 flex items-center justify-center glow-subtle border border-blue-black-500/30">
            <Code2 className="h-6 w-6 text-blue-black-300 drop-shadow-lg" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="font-semibold text-lg bg-gradient-to-r from-blue-black-300 to-blue-400 bg-clip-text text-transparent">Dashboard</h1>
              <p className="text-xs text-blue-black-400">Manage your portfolio</p>
            </div>
          )}
        </Link>
      </div>

      {/* Navigation links */}
      <ScrollArea className="flex-1 px-4 pb-4">
        <nav className="space-y-1">
          {links.map((link, index) => {
            const isActive = pathname === link.href || (link.href !== '/dashboard' && pathname.startsWith(link.href));
            
            return (
              <Link
                key={index}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-300 group relative overflow-hidden",
                  isActive
                    ? "glass border border-blue-black-500/40 text-blue-black-200 glow-subtle"
                    : "hover:bg-white/5 text-blue-black-400 hover:text-blue-black-200 hover:border hover:border-blue-black-500/30",
                  collapsed && "justify-center px-2"
                )}
              >
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-black-600/15 to-blue-600/8 blur-sm" />
                )}
                <div className={cn(
                  "transition-all duration-300 relative z-10",
                  isActive ? "text-blue-black-200 drop-shadow-lg scale-110 glow-subtle" : "group-hover:scale-110 group-hover:text-blue-black-300"
                )}>
                  {link.icon}
                </div>
                {!collapsed && <span className="relative z-10">{link.title}</span>}
                {!collapsed && isActive && (
                  <div className="ml-auto h-2 w-2 rounded-full bg-gradient-to-r from-blue-black-400 to-blue-400 glow-subtle animate-pulse" />
                )}
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      {/* User section */}
      <div className="p-4">
        <div className={cn(
          "rounded-xl glass p-3 border border-blue-black-600/30",
          collapsed ? "px-2" : ""
        )}>
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-black-600/50 to-blue-600/30 flex items-center justify-center flex-shrink-0 glow-subtle border border-blue-black-500/40">
              <span className="text-sm font-bold text-blue-black-200">K</span>
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate text-blue-black-200">Kavindu K.</p>
                <p className="text-xs text-blue-black-400 truncate">Admin</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom actions */}
      <div className="border-t border-blue-black-700/40 p-4 space-y-1">
        <Link
          href="/"
          className={cn(
            "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium group",
            "hover:bg-white/5 text-blue-black-400 hover:text-blue-black-200 transition-all duration-300 hover:border hover:border-blue-black-500/30",
            collapsed && "justify-center px-2"
          )}
        >
          <Home className="h-5 w-5 group-hover:scale-110 group-hover:text-blue-black-300 transition-all duration-300" />
          {!collapsed && <span>Back to Portfolio</span>}
        </Link>
        
        <Button
          variant="ghost"
          className={cn(
            "w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium justify-start group",
            "text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-300 hover:border hover:border-red-500/20",
            collapsed && "justify-center px-2"
          )}
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5 group-hover:scale-110 transition-all duration-300" />
          {!collapsed && <span>Logout</span>}
        </Button>
      </div>
    </div>
  );
}