import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
} from "@/components/ui/sidebar";
import { UserProvider } from "@/contexts/UserProvider";
import Header from "@/components/layout/Header";
import { getBasicUser } from "@/lib/user";
import { LeftSidebar, RightSidebar } from "@/components/layout/app-sidebar";
import { PreferencesProvider } from "@/app/providers/PreferencesProvider";
import { getPreferences } from "@/app/queries";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getBasicUser();
  const preferences = await getPreferences();

  return (
    <html lang="en">
      <PreferencesProvider initialPreferences={preferences}>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background`}
          >
            <UserProvider initialUser={user}>
              <Header />
              <div className="wrapper flex w-full h-full flex-col md:flex-row">
                {/* Left Sidebar */}
                <SidebarProvider side="left">
                  <div className="left-sidebar w-full md:w-1/4">
                    <LeftSidebar />
                  </div>
                </SidebarProvider>

                {/* Main Content */}
                <main className="w-full md:w-2/4">{children}</main>

                {/* Right Sidebar */}
                <SidebarProvider side="right">
                  <div className="right-sidebar w-full md:w-1/4">
                    <RightSidebar />
                  </div>
                </SidebarProvider>
              </div>
            </UserProvider>
          </body>
        </ThemeProvider>
      </PreferencesProvider>
    </html>
  );
}
