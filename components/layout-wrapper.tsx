"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import StarsCanvas from "@/components/main/StarBackground";
import Navbar from "@/components/main/Navbar";
import Footer from "@/components/main/Footer";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/dashboard');

  useEffect(() => {
    // Update body background based on current page
    if (isDashboard) {
      document.body.style.backgroundColor = 'hsl(0 0% 3.9%)'; // Modern dark background
      document.body.classList.remove('bg-[#030014]');
      document.body.classList.add('bg-background');
    } else {
      document.body.style.backgroundColor = '#030014';
      document.body.classList.remove('bg-background');
      document.body.classList.add('bg-[#030014]');
    }
  }, [isDashboard]);

  return (
    <>
      {!isDashboard && <StarsCanvas />}
      {!isDashboard && <Navbar />}
      {children}
      {!isDashboard && <Footer />}
    </>
  );
}