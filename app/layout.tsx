import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from 'sonner'
import { Geist, Geist_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/ui/theme-provider'
import Navbar from '@/modules/home/components/navbar'

import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Forge-UI — Build the next interface',
  description: 'A thoughtful workspace for building digital products.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ClerkProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            storageKey="forge-ui-theme"
            disableTransitionOnChange
          >
            <Navbar />
            <Toaster position="bottom-right" richColors />
            {children}
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}
