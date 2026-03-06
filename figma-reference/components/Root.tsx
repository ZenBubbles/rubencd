import React, { useState, useEffect } from "react";
import { Outlet } from "react-router";
import { Nav } from "./Nav";
import { MobileMenu } from "./MobileMenu";

export const Root = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      body { background-color: #FAFAF8; color: #1a1a1a; margin: 0; padding: 0; }
      .font-serif { font-family: 'Merriweather', serif; }
      .font-sans { font-family: 'Inter', sans-serif; }
      ::selection { background-color: #12271d; color: white; }
      html { scroll-behavior: smooth; }
      ::-webkit-scrollbar { width: 8px; }
      ::-webkit-scrollbar-track { background: #FAFAF8; }
      ::-webkit-scrollbar-thumb { background: #E5E5E5; border-radius: 4px; }
      ::-webkit-scrollbar-thumb:hover { background: #12271d; }
    `;
    document.head.appendChild(style);
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return (
    <div
      className="flex min-h-screen flex-col font-sans antialiased"
      style={{ backgroundColor: "#FAFAF8", color: "#1a1a1a" }}
    >
      <Nav mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};
