import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Adithya U — Full Stack Developer & AI Enthusiast",
  description:
    "Portfolio of Adithya U, a Full Stack Developer and AI Enthusiast from Madurai, India, building intelligent web applications, automation systems, and real-world software solutions.",
  keywords: [
    "Adithya U",
    "Full Stack Developer",
    "AI Enthusiast",
    "Web Developer Madurai",
    "Software Engineer Portfolio",
  ],
  authors: [{ name: "Adithya U" }],
  openGraph: {
    title: "Adithya U — Full Stack Developer & AI Enthusiast",
    description:
      "Building smart digital solutions — modern web apps, intelligent automation, and real-world software.",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className="antialiased bg-background text-foreground"
      >
        {children}
      </body>
    </html>
  );
}
