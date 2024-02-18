"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { layoutConfig } from './config/layoutConfig';
import { cn } from '../../lib/utils';
import { TentTree } from 'lucide-react';
import { menuConfig } from './config/menuConfig';

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <TentTree className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">
          {layoutConfig.name}
        </span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        { menuConfig.mainNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname === item.href ? "text-foreground" : "text-foreground/60"
            )}
          >
            {item.title}
          </Link>
        )
        )}
      </nav>
    </div>
  )
}
