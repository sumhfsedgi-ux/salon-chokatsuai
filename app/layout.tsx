import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI腸内タイプ診断 | 下腹・くびれ・便秘の原因をAIがチェック",
  description:
    "10の質問に答えるだけで、AIがあなたの腸内タイプを診断。ぽっこり下腹・くびれ不足・便秘の根本原因がわかります。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-neutral-100 font-sans text-neutral-900">
        <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col bg-gradient-to-b from-rose-50 via-white to-white shadow-xl">
          {children}
        </div>
      </body>
    </html>
  );
}
