import Header from "@/components/ui/Header";
import Sidebar from "@/components/ui/Sidebar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex">
        {/* Fixed Sidebar */}
        <Sidebar />

        {/* Main content area */}
        <div className="flex-1 ml-64 flex flex-col">
          <Header />
          <main className="p-6 bg-gray-100 h-max">{children}</main>
        </div>
      </body>
    </html>
  );
}
