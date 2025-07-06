import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

export const metadata = {
  title: "Personal Finance Tracker",
  description: "A personal finance tracker for daily use.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
