import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import Header from "@/components/header";

export const metadata = {
  title: "Job Tracker",
  description: "Track your job applications in one place",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        <AuthProvider>
          <Header />
          <main className="mx-auto max-w-5xl px-4 py-6">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
