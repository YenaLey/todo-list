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
        {/* 네비게이션 바 */}
        <nav>
          <div>
            {/* 로고 컴포넌트 */}
            <Logo />
          </div>
        </nav>
        {/* 페이지의 메인 콘텐츠 */}
        <main>{children}</main>
      </body>
    </html>
  );
}
