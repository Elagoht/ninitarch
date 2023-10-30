import ScrollToTop from "@/components/ScrollToTop"
import Providers from "@/context/Providers"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { FC, ReactNode } from "react"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

interface IRootLayout {
  children: ReactNode
}

export const metadata: Metadata = {
  metadataBase: new URL('https://ninitarch.vercel.app/'),
  title: "NinitArch: Ninite for Arch Linux",
  description: "Select the apps you want, and NinitArch will create a script to install them all for you.",
  icons: [
    "android-chrome-192x192.png",
    "android-chrome-512x512.png",
    "apple-touch-icon.png",
    "favicon-16x16.png",
    "favicon-32x32.png",
    "favicon.ico",
  ],
  keywords: [
    "ninitarch", "arch linux", "paru", "yay", "pamac", "aur", "ninite", "ninite for arch linux", "ninite for arch", "ninite for linux", "ninite linux", "ninite arch",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ninitarch.vercel.app/",
    siteName: "NinitArch",
    title: "NinitArch: Ninite for Arch Linux",
    description: "Select the apps you want, and NinitArch will create a script to install them all for you."
  },
  authors: [{ name: "Furkan Baytekin", url: "https://github.com/Elagoht" }],
  creator: "Furkan Baytekin",
  publisher: "Furkan Baytekin",
  robots: "index, follow",
  abstract: "NinitArch is a tool that allows you to install multiple apps at once on Arch Linux.",
  applicationName: "NinitArch",
  bookmarks: "NinitArch",
  classification: "NinitArch",
  category: "Utilities",
}

const RootLayout: FC<IRootLayout> = ({ children }) => {
  return <html lang="en" >
    <body className={inter.className}>
      <Providers>
        {children}
      </Providers>
      <ScrollToTop />
    </body>
  </html >
}

export default RootLayout