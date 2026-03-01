import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Blog - 记录思考、分享技术、探索设计",
  description: "一个极简风格的个人博客，关于技术、设计和生活的思考。",
  keywords: ["博客", "技术", "设计", "Next.js", "Notion"],
  authors: [{ name: "My Name" }],
  openGraph: {
    title: "My Blog",
    description: "记录思考、分享技术、探索设计",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
