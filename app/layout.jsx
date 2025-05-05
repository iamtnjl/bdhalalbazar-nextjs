"use client";
import { Figtree } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import TanstackQueryProvider from "@/TanstackQuery/TanstackQueryhProvider";
import { configure } from "mobx";
import { Provider } from "mobx-react";
import rootStore from "../stores/root";
import TopLoader from "@/components/shared/TopLoader";
import dynamic from "next/dynamic";
import Script from "next/script";

const FcmNotificationProvider = dynamic(
  () => import("@/providers/FcmNotificationProvider"),
  { ssr: false }
);

const figtree = Figtree({ subsets: ["latin"] });

configure({
  enforceActions: "always",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>BDHalalBazar.com</title>
        <meta
          name="description"
          content="HalalBazar.net is your go-to online marketplace for halal products, offering a wide range of certified items for all your needs."
        />

        {/* Google Analytics (GA4) */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />

        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
            `,
          }}
        />
      </head>
      <body
        className={`${figtree.className} max-w-3xl mx-auto bg-primary-bg pb-[80px] overflow-y-scroll`}
      >
        {/* GTM NoScript Fallback */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `
              <iframe src="https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}"
              height="0" width="0" style="display:none;visibility:hidden"></iframe>
            `,
          }}
        />
        <Provider rootStore={rootStore} meStore={rootStore.meStore}>
          <TanstackQueryProvider>
            <Toaster
              toastOptions={{
                className: "",
                style: {
                  border: "1px solid #ddd",
                  padding: "8px",
                  color: "#333",
                },
              }}
            />
            {children}
            <TopLoader />
          </TanstackQueryProvider>
        </Provider>
      </body>
    </html>
  );
}
