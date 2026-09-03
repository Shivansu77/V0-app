import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from 'sonner'
import { Geist, Geist_Mono } from 'next/font/google'
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
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {publishableKey ? (
          <ClerkProvider publishableKey={publishableKey}>{content}</ClerkProvider>
        ) : (
          content
        )}
      </body>
    </html>
  )
}
