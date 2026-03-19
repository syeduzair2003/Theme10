import Script from 'next/script';
import React from 'react'

const GoogleAnalytic = ({ gaId }: { gaId: string }) => {
    if (!gaId) return null;
    return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      
      <script id="ga-init">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </script>
    </>
  );
}

export default GoogleAnalytic
