import FacebookPixel from "./FacebookPixel";
import GoogleAnalytic from "./GoogleAnalytic";
import GTM from "./GTM";
import Inspectlet from "./Inspectlet";
import { GoogleTagManager, GoogleAnalytics } from '@next/third-parties/google'

export default function RenderPredefinedScript({ type, value }: { type: string, value: string }) {
  switch (type) {
    case 'GOOGLE_ANALYTICS':
      // return <GoogleAnalytics gaId={value} />;
      return <GoogleAnalytic gaId={value} />;
    case 'FACEBOOK_PIXEL':
      return <FacebookPixel pixelId={value} />;
    case 'GOOGLE_TAG_MANAGER':
      // return <GoogleTagManager gtmId={value} />;
      return <GTM gtmId={value} />;
    case 'INSPECTLET':
      return <Inspectlet wid={value} />;
    default:
      return null;
  }
}
