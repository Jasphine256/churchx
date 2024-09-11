import "@styles/globals.css"
import Header from "@components/Header"
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
        <body className="w-full bg-blue-50">
          <Provider>
            <Header/>
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