import { ModeToggle } from "@/components/layout/mode-toggle"

export const metadata = {
  title: "mokours - Authentication",
  description: "A place where you can authenticate to have access to mokours",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background antialiased relative">
        <div className="fixed top-4 right-4 z-50">
          <ModeToggle />
        </div>
        {children}
      </body>
    </html>
  )
}
