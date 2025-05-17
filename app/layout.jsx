"use client";
import { Figtree } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import TanstackQueryProvider from "@/TanstackQuery/TanstackQueryhProvider";
import { configure } from "mobx";
import { Provider } from "mobx-react";
import rootStore from "../stores/root";
import TopLoader from "@/components/shared/TopLoader";
import Script from "next/script";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const figtree = Figtree({ subsets: ["latin"] });

configure({
  enforceActions: "always",
});

function FacebookPageView() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window.fbq !== "undefined") {
      window.fbq("track", "PageView");
    }
  }, [pathname]);

  return null;
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="facebook-domain-verification"
          content="pe7angcbyi0y7n7mn6mh0b2xc09ntr"
        />
        <title>
          BDHalalBazar | Online Grocery Shop in Pabna | Fresh & Halal Essentials
        </title>
        <meta
          name="description"
          content="Shop fresh, halal, and affordable groceries online from BDHalalBazar – Pabna's most trusted online grocery store. Enjoy same-day delivery of meat, fish, fruits, vegetables, and daily essentials at your doorstep."
        />
        <meta
          name="keywords"
          content="pabna grocery delivery, online grocery store pabna, BDHalalBazar, halal groceries pabna, fresh meat pabna, fruits and vegetables delivery, pabna food delivery, online halal shop Bangladesh, daily essentials pabna, halal food pabna, online grocery shop in pabna, grocery shop near me, halal online shopping, same-day delivery groceries, online grocery shop pabna, online bazar pabna, online bazar delivery pabna"
        />

        {/* Meta Pixel */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '664588003120839');
            fbq('track', 'PageView');
          `}
        </Script>

        {/* Google Analytics */}
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
        {/* GTM NoScript */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `
              <iframe src="https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}"
              height="0" width="0" style="display:none;visibility:hidden"></iframe>
            `,
          }}
        />

        {/* Meta Pixel NoScript */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=664588003120839&ev=PageView&noscript=1"
          />
        </noscript>

        {/* FB PageView Tracker for route changes */}
        <FacebookPageView />

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
