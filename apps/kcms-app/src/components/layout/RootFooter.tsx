'use client';
import { usePathname } from 'next/navigation'
import { layoutConfig } from "./config/layoutConfig"

export function RootFooter() {
  const pathname = usePathname()
  if( pathname === '/chat') {
    return <></>
  }

  return (
    <footer className="py-6 md:px-8 md:py-0 bg-gray-100">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built by{" "}
          <a
            href={layoutConfig.links.twitter}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            Fangce
          </a>
          .The source code is available on{" "}
          <a
            href={layoutConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </footer>
  )
}
