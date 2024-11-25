"use client";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { useState, useEffect } from "react";

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  const [mounted, setMounted] = useState(false);

  // Wait until the client is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <></>; // Don't render anything until the theme is loaded
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true}>
      <SessionProvider>{children}</SessionProvider>
    </ThemeProvider>
  );
}
