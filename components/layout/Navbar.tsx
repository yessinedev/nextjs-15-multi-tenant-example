'use client';

import Link from "next/link";
import { Globe } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-500 to-indigo-600 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link 
            href="/"
            className="flex items-center gap-2 text-white hover:text-blue-100 transition-colors"
          >
            <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold">Multi-tenant Next.js 15 Example</span>
          </Link>

          <div className="flex items-center gap-6">
            <Link 
              href="/"
              className="text-sm text-blue-100 hover:text-white transition-colors"
            >
              Home
            </Link>
            <a 
              href="https://github.com/ramichabchoub/nextjs-15-multi-tenant-example"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-100 hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a 
              href="https://github.com/ramichabchoub/nextjs-15-multi-tenant-example#readme"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm text-white bg-white/10 rounded-lg backdrop-blur-sm hover:bg-white/20 transition-colors"
            >
              Docs
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
} 