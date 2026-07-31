import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
import {
  resolveAnalyticsRuntime,
  type AnalyticsRuntimeInput,
} from "@/lib/analytics-config";

export function AnalyticsScripts(input: AnalyticsRuntimeInput) {
  const runtime = resolveAnalyticsRuntime(input);

  if (!runtime.enabled) {
    return null;
  }

  return (
    <>
      {runtime.gaMeasurementId ? (
        <GoogleAnalytics gaId={runtime.gaMeasurementId} />
      ) : null}
      {runtime.clarityProjectId ? (
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window,document,"clarity","script","${runtime.clarityProjectId}");
          `}
        </Script>
      ) : null}
    </>
  );
}
