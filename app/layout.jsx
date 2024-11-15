import "@styles/globals.css"
import Footer from "@components/Footer"
import Provider from "@components/Provider"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata = {
  title: 'Church-X',
  description: "A Chrch Management System By Jasphine"
}

const RootLayout = ({children}) => {
  return (
    <html>
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
        <body className="w-full bg-blue-50">
          <Provider>
            <main className="w-full">{children}</main>
            <Footer/>
          </Provider>
          <Analytics />
          <SpeedInsights />
        </body>
    </html>
  )
}

export default RootLayout