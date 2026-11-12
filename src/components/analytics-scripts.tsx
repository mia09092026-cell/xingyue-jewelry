import Script from "next/script";

const DEFAULT_CLARITY_PROJECT_ID = "xuvn5qafkq";

function isValidGaMeasurementId(value: string | undefined): value is string {
  return Boolean(value && /^G-[A-Z0-9]+$/.test(value));
}

function isValidClarityProjectId(value: string | undefined): value is string {
  return Boolean(value && /^[a-z0-9]+$/.test(value));
}

/**
 * Client-side analytics tags. Never use headers()/cookies() here: the root
 * layout must stay static so content pages remain CDN-cacheable.
 *
 * Production only by default; preview/dev can opt in with
 * NEXT_PUBLIC_ANALYTICS_QA_ENABLED=true.
 */
export function AnalyticsScripts() {
  const isProduction = process.env.VERCEL_ENV === "production";
  const qaEnabled = process.env.NEXT_PUBLIC_ANALYTICS_QA_ENABLED === "true";

  if (!isProduction && !qaEnabled) {
    return null;
  }

  const clarityProjectId =
    process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || DEFAULT_CLARITY_PROJECT_ID;
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <>
      {isValidClarityProjectId(clarityProjectId) ? (
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${clarityProjectId}");`}
        </Script>
      ) : null}
      {isValidGaMeasurementId(gaMeasurementId) ? (
        <>
          <Script
            id="ga4-src"
            src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag("js",new Date());gtag("config","${gaMeasurementId}");`}
          </Script>
        </>
      ) : null}
    </>
  );
}
