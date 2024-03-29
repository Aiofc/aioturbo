import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import IntegrationProviders from "../components/layout/integration-providers";
import { RootHeader } from "../components/layout/RootHeader";
import { RootFooter } from "../components/layout/RootFooter";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Turborepo",
  description: "Generated by create turbo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className}>
        <IntegrationProviders>
          <div className='relative flex min-h-screen flex-col'>
            <RootHeader />
            <div className='flex-1'>{children}</div>
            <RootFooter />
          </div>
        </IntegrationProviders>
      </body>
    </html>
  );
}
