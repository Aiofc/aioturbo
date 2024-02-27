'use client';

import Link from 'next/link';

import { Github, Twitter } from 'lucide-react';
import { layoutConfig } from './config/layoutConfig';
import { CommandMenu } from './CommandMenu';
import { MainNav } from './MainNav';
import { MobileNav } from './MobileNav';
import ThemeToggle from './ThemeToggle/theme-toggle';
import { buttonVariants } from '../ui/button';
import { cn } from '../../lib/utils';
import { UserAccount } from './UserAccount';
import {usePathname} from "next/navigation";

export function RootHeader() {
  const pathname = usePathname()
  if( pathname === '/auth') {
    return <></>
  }
  return (
    <header className=" sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mr-10 ml-10 flex h-14 items-center">
        {/*菜单自适应组件*/}
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/*命令菜单快速直达页面功能*/}
            <CommandMenu />
          </div>
          <nav className="flex items-center">
            <Link
              href={layoutConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({
                    variant: 'ghost',
                  }),
                  'w-9 px-0 mr-2'
                )}
              >
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <Link
              href={layoutConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({
                    variant: 'ghost',
                  }),
                  'w-9 px-0 mr-2 '
                )}
              >
                <Twitter className="h-3 w-3 fill-current" />
                <span className="sr-only">Twitter</span>
              </div>
            </Link>
            <ThemeToggle />
            <UserAccount />
          </nav>
        </div>
      </div>
    </header>
  );
}
