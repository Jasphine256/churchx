import "@styles/globals.css"
import Provider from "@components/Provider"
import TopNavigation from "@components/TopNavigation"

export const metadata = {
  title: 'Church-X',
  description: "A Chrch Management System By Jasphine"
}

const DashboardLayout = ({children}) => {
  return (
    <html>
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
        <body className="w-full bg-blue-50">
            <Provider>
                <TopNavigation/>
                <main className="w-full">{children}</main>
            </Provider>
        </body>
    </html>
  )
}

export default DashboardLayout