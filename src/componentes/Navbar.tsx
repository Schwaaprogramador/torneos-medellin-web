"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`sticky top-0 w-full z-50 transition-all duration-300 bg-black`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-yellow-400 font-bold text-xl">
              Torneos Medellín
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link 
                href="/nuevo"
                className={`px-3 py-2 rounded-md text-sm font-medium ${scrolled 
                  ? "text-white hover:bg-gray-700" 
                  : "text-white hover:bg-gray-900/30"}`}
              >
                Nuevo
              </Link>
              <Link 
                href="http://localhost:3000"
                className={`px-3 py-2 rounded-md text-sm font-medium ${scrolled 
                  ? "text-white hover:bg-gray-700" 
                  : "text-white hover:bg-gray-900/30"}`}
              >
                Iniciar
              </Link>
              <Link 
                href="/escenarios"
                className={`px-3 py-2 rounded-md text-sm font-medium ${scrolled 
                  ? "text-white hover:bg-gray-700" 
                  : "text-white hover:bg-gray-900/30"}`}
              >
                Escenarios
              </Link>
              
              <Link 
                href="/torneos"
                className={`px-3 py-2 rounded-md text-sm font-medium ${scrolled 
                  ? "text-white hover:bg-gray-700" 
                  : "text-white hover:bg-gray-900/30"}`}
              >
                Torneos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}