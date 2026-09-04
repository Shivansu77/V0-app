import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from 'sonner'
import Navbar from '@/modules/home/components/navbar'
import { ThemeProvider } from '@/components/ui/theme-provider'

import './globals.css'

export const metadata: Metadata = {
  title: 'Forge-UI — Build the next interface',
  description: 'A thoughtful workspace for building digital products.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

  const content = (
    <>
      {publishableKey ? <Navbar /> : null}
      <Toaster position="bottom-right" richColors />
      {children}
    </>
  )

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {publishableKey ? (
            <ClerkProvider publishableKey={publishableKey}>{content}</ClerkProvider>
          ) : (
            content
          )}
        </ThemeProvider>
      </body>
    </html>
  )
}
