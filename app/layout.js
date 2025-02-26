export const metadata = {
  title: 'QuestNest Multi-Tenant Demo',
  description: 'A demonstration of multi-tenant routing with Traefik and PowerDNS',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <header className="bg-white border-b p-4">
          <div className="container mx-auto">
            <h1 className="text-2xl font-bold text-gray-800">QuestNest</h1>
          </div>
        </header>
        {children}
      </body>
    </html>
  )
}