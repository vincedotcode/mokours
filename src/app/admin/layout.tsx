'use client'
import { ReactNode } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { Separator } from '@/components/ui/separator'
import { ModeToggle } from '@/components/layout/mode-toggle'
import { TooltipProvider } from "@/components/ui/tooltip"



const TABS = [
  { label: 'Dashboard', href: '/admin' },
  { label: 'Users', href: '/admin/users' },
  { label: 'Courses', href: '/admin/courses' },
]

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <TooltipProvider>


      <div className="min-h-screen bg-background">
        {/* Top nav */}
        <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/50">
          <div className="mx-auto flex max-w-container items-center justify-between px-4 py-3">
            <h1 className="text-lg font-bold">Admin Panel</h1>
            <nav className="flex gap-2">
              {TABS.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'rounded-md px-3 py-1.5 text-sm font-medium transition-colors hover:bg-muted',
                    pathname === href && 'bg-primary text-primary-foreground hover:bg-primary'
                  )}
                >
                  {label}
                </Link>
              ))}
              <ModeToggle />
            </nav>

          </div>
        </header>

        <Separator />

        {/* routed content */}
        <main className="mx-auto w-full max-w-container px-4 py-6">{children}</main>
      </div>
    </TooltipProvider>
  )
}