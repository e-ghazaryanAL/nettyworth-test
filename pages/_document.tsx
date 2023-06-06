import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html translate='no'>
      <Head>
        {/* Google tag (gtag.js) */}
        <Script src='https://www.googletagmanager.com/gtag/js?id=G-3Z1XHKWC0V' />
        <Script
          id='gtag'
          dangerouslySetInnerHTML={{
            __html: `
          window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-3Z1XHKWC0V');
          `,
          }}
        />
        {/* Twitter conversion tracking base code */}
        <Script
          id='twitter'
          dangerouslySetInnerHTML={{
            __html: `!function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
  },s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='https://static.ads-twitter.com/uwt.js',
  a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
  twq('config','oczi1');`,
          }}
        />
        {/* End Twitter conversion tracking base code */}
        <Script
          id='tracking'
          dangerouslySetInnerHTML={{
            __html: ` !function (w, d, t) {
              w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
              ttq.load('CDMMNGBC77U9BMO6VGF0');
              ttq.page();
            }(window, document, 'ttq');`,
          }}
        />
        <Script src='https://tools.luckyorange.com/core/lo.js?site-id=86bf8383'></Script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
