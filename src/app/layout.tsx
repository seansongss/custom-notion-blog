import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import type { Metadata } from "next";
import localFont from 'next/font/local'

import "@/styles/globals.css";
// notion 테마 스타일링 (필수)
import 'react-notion-x/src/styles.css'
// used for code syntax highlighting (optional)
import 'prismjs/themes/prism-tomorrow.css'
// used for rendering equations (optional)
import 'katex/dist/katex.min.css'
import "@/styles/notion.css";

import { cn } from "@/lib/utils"
import Footer from "@/components/Footer";
import { getCategoryList } from "@/lib/get-notion-property";
import StickyHeader from "@/components/StickyHeader";
import { getSiteConfig } from "@/lib/get-config-value";

const maruBuri = localFont({
  src: [
    {
      path: 'fonts/MaruBuri-ExtraLight.otf',
      weight: '200',
      style: 'normal',
    },
    {
      path: 'fonts/MaruBuri-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: 'fonts/MaruBuri-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: 'fonts/MaruBuri-SemiBold.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: 'fonts/MaruBuri-Bold.otf',
      weight: '700',
      style: 'normal',
    }
  ],
  variable: '--font-maru-buri'
})

export const metadata: Metadata = {
  metadataBase: new URL(getSiteConfig('domain')),
  title: {
    template: `%s | ${getSiteConfig('name')}`,
    default: getSiteConfig('name')
  },
  description: getSiteConfig('description'),
  icons: {
    icon: "/icon.ico",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categoryList = await getCategoryList().then((category) =>
    category.map(({ label, slug }) => ({
      name: label,
      path: `/${slug}`,
    }))
  );

  return (
    <html lang="en">
      <SpeedInsights />
      <Analytics />
      <body
        className={cn(
          "flex flex-col min-h-svh bg-background font-maru-buri antialiased items-center",
          maruBuri.variable
        )}
      >
        <StickyHeader categoryList={categoryList} />
        <main className="flex-grow md:max-w-screen-md w-full md:w-fit mx-auto px-4 md:px-0">
          {children}
        </main>
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}