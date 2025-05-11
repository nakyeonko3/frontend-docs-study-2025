import Header from "@/components/Header";
import "@/styles/tickets.css";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Wild Tickets",
  description: "Wild Coding Tickets App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
