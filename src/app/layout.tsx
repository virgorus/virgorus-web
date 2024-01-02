import type { Metadata } from 'next'
import {Providers} from "./providers";
import Loading from "@/components/Loading";

import {Inter, Playfair_Display,Poppins, Roboto } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter' 
})

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
	weight: ['100', '300', '400', '500', '700', '900'],
	style: ['italic', 'normal']
})

const efco = localFont({
  src: '../assets/fonts/EFCO_Brookshire_Regular.ttf',
  display: 'swap',
  variable: '--font-efco'
})

const playfairDisplay = Playfair_Display({ 
	subsets: ['latin'],
	variable: '--font-playfair'
});

const poppins = Poppins({ 
	subsets: ['latin'],
	variable: '--font-poppins',
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
	style: ['italic', 'normal']
});


export const metadata: Metadata = {
  title: 'Virgorus',
  description: 'EXPLORE | DISCOVER | WANDER',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${efco.variable} ${inter.className} ${roboto.variable} ${playfairDisplay.variable} ${poppins.variable} bg-white`}>
        <Providers>
          {children}
          <Loading />
        </Providers>
      </body>
    </html>
  )
}