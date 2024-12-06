import type { Metadata } from "next";
import "@/styles/globals.css";
import styles from "@/styles/layout.module.css";
import Logo from "@/components/Logo";

export const metadata: Metadata = {
  title: "Do It!",
  description: "To DO List",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/gh/moonspam/NanumSquare@2.0/nanumsquare.css"
        />
      </head>
      <body className={styles.container}>
        <nav>
          <div>
            <Logo />
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
