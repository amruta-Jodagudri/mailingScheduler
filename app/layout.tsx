import "./globals.css"
import { Inter } from "next/font/google"
import { Providers } from "./providers"
import type React from "react" // Added import for React

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Mailing Scheduler",
  description: "Schedule and manage your email campaigns",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen bg-cover bg-center`}
        style={{ backgroundImage: "url('/background.jpeg')" }}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

