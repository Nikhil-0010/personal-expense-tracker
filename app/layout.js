import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

export const metadata = {
  title: "Personal Expense Tracker",
  description: "A personal expense tracker for daily use.",
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
