// src/components/Navbar.tsx
import Navigation from "../../ui/navigation"
import { Button, type ButtonProps } from "../../ui/button"
import {
  Navbar as NavbarComponent,
  NavbarLeft,
  NavbarRight,
} from "../../ui/navbar"
import { Sheet, SheetContent, SheetTrigger } from "../../ui/sheet"
import { Menu } from "lucide-react"
import LaunchUI from "../../logos/launch-ui"
import { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/layout/mode-toggle"
import { useAuth } from "@/context/auth-content"
import { SignOutButton } from '@clerk/nextjs'         

// -------------------- Types --------------------
interface NavbarLink {
  text: string
  href: string
}

interface NavbarActionProps {
  text: string
  href: string
  variant?: ButtonProps["variant"]
  icon?: ReactNode
  iconRight?: ReactNode
  isButton?: boolean
}

interface NavbarProps {
  logo?: ReactNode
  name?: string
  homeUrl?: string
  mobileLinks?: NavbarLink[]
  /**
   * Actions shown when the user is _signed‑out_.
   * When the user is signed‑in they are replaced by a “Dashboard” button.
   */
  actions?: NavbarActionProps[]
  showNavigation?: boolean
  customNavigation?: ReactNode
  className?: string
}

// -------------------- Component --------------------
export default function Navbar({
  logo = <LaunchUI />,
  name = "Launch UI",
  homeUrl = "https://www.launchuicomponents.com/",
  mobileLinks = [
    { text: "Getting Started", href: "https://www.launchuicomponents.com/" },
    { text: "Components", href: "https://www.launchuicomponents.com/" },
    { text: "Documentation", href: "https://www.launchuicomponents.com/" },
  ],
  /** Default actions if the user is NOT signed in */
  actions = [
    { text: "Sign in", href: "/auth/sign-in", isButton: false },
    {
      text: "Get Started",
      href: "/auth/sign-up",
      isButton: true,
      variant: "default",
    },
  ],
  showNavigation = true,
  customNavigation,
  className,
}: NavbarProps) {
  const { isSignedIn } = useAuth()

  // Determine which set of actions to render
  const renderedActions: NavbarActionProps[] = isSignedIn
    ? [
        {
          text: "Dashboard",
          href: "/dashboard",
          isButton: true,
          variant: "default",
        },
      ]
    : actions

  // -------------------- JSX --------------------
  return (
    <header className={cn("sticky top-0 z-50 -mb-4 px-4 pb-4", className)}>
      {/* translucent gradient behind the navbar */}
      <div className="fade-bottom bg-background/15 absolute left-0 h-24 w-full backdrop-blur-lg" />

      <div className="max-w-container relative mx-auto">
        <NavbarComponent>
          {/* ---------- Left side ---------- */}
          <NavbarLeft>
            <a href={homeUrl} className="flex items-center gap-2 text-xl font-bold">
              {logo}
              {name}
            </a>
            {showNavigation && (customNavigation || <Navigation />)}
          </NavbarLeft>

          {/* ---------- Right side ---------- */}
          <NavbarRight>
            {/* desktop actions */}
            {renderedActions.map((action, idx) =>
              action.isButton ? (
                <Button key={idx} variant={action.variant} asChild>
                  <a href={action.href} className="flex items-center gap-1">
                    {action.icon}
                    {action.text}
                    {action.iconRight}
                  </a>
                </Button>
              ) : (
                <a key={idx} href={action.href} className="hidden text-sm md:block">
                  {action.text}
                </a>
              ),
            )}
  {/* NEW ── Sign‑out (desktop) */}
  {isSignedIn && (
              <SignOutButton redirectUrl="/">
                <Button variant="outline" className="ml-2 hidden md:inline-flex">
                  Sign out
                </Button>
              </SignOutButton>
            )}
                  <ModeToggle />
            {/* mobile hamburger */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="shrink-0 md:hidden">
                  <Menu className="size-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="grid gap-6 text-lg font-medium">
                  <a href={homeUrl} className="flex items-center gap-2 text-xl font-bold">
                    {name}
                  </a>
                  {mobileLinks.map((link, idx) => (
                    <a key={idx} href={link.href} className="text-muted-foreground hover:text-foreground">
                      {link.text}
                    </a>
                  ))}

                  {/* mobile actions */}
                  <div className="mt-6 flex flex-col gap-4">
                    {renderedActions.map((action, idx) => (
                      <Button
                        key={idx}
                        asChild
                        variant={action.isButton ? action.variant : "ghost"}
                      >
                        <a href={action.href} className="w-full justify-center">
                          {action.text}
                        </a>
                      </Button>
                    ))}

{isSignedIn && (
              <SignOutButton redirectUrl="/">
                <Button variant="outline" className="ml-2 hidden md:inline-flex">
                  Sign out
                </Button>
              </SignOutButton>
            )}
                  </div>
                </nav>
            
              </SheetContent>
            </Sheet>

           
      
          </NavbarRight>
        </NavbarComponent>
      </div>
    </header>
  )
}
