import type { Metadata } from "next";
import { IBM_Plex_Sans_KR, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { UnlockProvider } from "@/components/unlock";

const plexKr = IBM_Plex_Sans_KR({
  variable: "--font-plex-kr",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  weight: ["500"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "스펙북 — 완공 사진을 사양서로 연결하다",
  description:
    "건축가와 인테리어 디자이너의 스펙북을 열고, 완공 사진의 모든 요소를 제조사·모델·시공 사양으로 연결하는 전문가용 아카이브. 프로토타입 v0.1",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${plexKr.variable} ${plexMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <UnlockProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </UnlockProvider>
      </body>
    </html>
  );
}
