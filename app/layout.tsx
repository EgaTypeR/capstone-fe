import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NavBar from "./components/navBar";
import Footer from "./components/footer";
import { Notify } from "./components/notify";
import { Providers } from "@/store/provider";
import NotificationWebSocket from "./components/notificationWebsocket";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Force AI",
  description: "Criminal Detection",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased scrollbar-custom overflow-auto`}
      >
        <div className="flex flex-col min-h-screen">
            <Providers>
              <NavBar/>
                <main className="flex-grow">
                  <NotificationWebSocket/>
                  <Notify/>
                    {children}
                </main>
              <Footer/>
            </Providers>
        </div>
      </body>
    </html>
  );
}
