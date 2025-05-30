"use client"

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Bell, 
  Settings, 
  User, 
  ChevronDown,
  Menu,
  Sun,
  Moon,
  HelpCircle,
  LogOut
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

interface HeaderProps {
  title?: string;
}

export default function Header({ title }: HeaderProps) {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications] = useState(3); // Mock notification count

  // Get page title from pathname if not provided
  const getPageTitle = () => {
    if (title) return title;
    
    const pathSegments = pathname.split('/').filter(Boolean);
    const lastSegment = pathSegments[pathSegments.length - 1];
    
    if (!lastSegment || lastSegment === 'dashboard') return 'Dashboard';
    
    return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-blue-black-700/40 glass backdrop-blur-xl">
      <div className="px-6 py-4 flex items-center justify-between">
        {/* Left side - Title and breadcrumb */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold bg-gradient-to-r from-blue-black-300 to-blue-400 bg-clip-text text-transparent">
              {getPageTitle()}
            </h1>
            {pathname !== '/dashboard' && (
              <Badge variant="outline" className="text-xs border-blue-black-500/40 text-blue-black-300">
                Active
              </Badge>
            )}
          </div>
        </div>

        {/* Center - Search */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-black-400" />
            <Input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="modern-input pl-10 bg-white/5 border-blue-black-600/40 focus:border-blue-black-500/60 focus:bg-white/10"
            />
          </div>
        </div>

        {/* Right side - Actions and user menu */}
        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="rounded-lg glass-hover border border-gray-600/20 hover:border-blue-500/30 transition-all duration-300"
          >
            <Sun className="h-4 w-4 text-blue-black-400 hover:text-blue-black-300 transition-colors" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative rounded-lg glass-hover border border-gray-600/20 hover:border-blue-500/30 transition-all duration-300"
              >
                <Bell className="h-4 w-4 text-gray-400 hover:text-blue-400 transition-colors" />
                {notifications > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-red-500 text-white border-none"
                  >
                    {notifications}
                  </Badge>
                )}
                <span className="sr-only">Notifications</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 glass border-gray-600/30">
              <DropdownMenuLabel className="text-gray-200">Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-600/30" />
              <DropdownMenuItem className="text-gray-300 hover:bg-blue-500/10 focus:bg-blue-500/10">
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium">New project created</p>
                  <p className="text-xs text-gray-400">2 minutes ago</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-gray-300 hover:bg-blue-500/10 focus:bg-blue-500/10">
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium">User registration pending</p>
                  <p className="text-xs text-gray-400">1 hour ago</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-gray-300 hover:bg-blue-500/10 focus:bg-blue-500/10">
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium">System update available</p>
                  <p className="text-xs text-gray-400">3 hours ago</p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Help */}
          <Button
            variant="ghost"
            size="icon"
            className="rounded-lg glass-hover border border-gray-600/20 hover:border-blue-500/30 transition-all duration-300"
          >
            <HelpCircle className="h-4 w-4 text-gray-400 hover:text-blue-400 transition-colors" />
            <span className="sr-only">Help</span>
          </Button>

          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="flex items-center gap-3 px-3 py-2 rounded-lg glass-hover border border-gray-600/20 hover:border-blue-500/30 transition-all duration-300"
              >
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-600/40 to-purple-600/40 flex items-center justify-center glow-blue border border-blue-500/30">
                  <span className="text-sm font-bold text-blue-400">K</span>
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-200">Kavindu K.</p>
                  <p className="text-xs text-gray-400">Admin</p>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 glass border-gray-600/30">
              <DropdownMenuLabel className="text-gray-200">My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-600/30" />
              <DropdownMenuItem className="text-gray-300 hover:bg-blue-500/10 focus:bg-blue-500/10">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-gray-300 hover:bg-blue-500/10 focus:bg-blue-500/10">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-600/30" />
              <DropdownMenuItem className="text-red-400 hover:bg-red-500/10 focus:bg-red-500/10">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}