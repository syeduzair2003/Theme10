import { extractScriptAndNoscript } from '@/constants/hooks';
import { Widget } from '@/services/dataTypes';
import React from 'react'
import FacebookPixel from './Scripts/FacebookPixel';
import Inspectlet from './Scripts/Inspectlet';
import { GoogleTagManager } from '@next/third-parties/google';

interface Props {
    scripts: Widget[];
}

const BodyTopScriptsComponent = ({ scripts }: Props) => {
    return scripts.map((item, index) => {
    if (item.type === 'FACEBOOK_PIXEL' && typeof item.data === "string") {
      return <FacebookPixel key={`fb-${index}`} pixelId={item.data || ''} />;
    }
    if (item.type === 'GOOGLE_TAG_MANAGER' && typeof item.data === "string") {
      return <GoogleTagManager key={`gtm-${index}`} gtmId={item.data || ''} />;
    }
    if (item.type === 'INSPECTLET' && typeof item.data === "string") {
      return <Inspectlet key={`insp-${index}`} wid={item.data || ''} />;
    }

    const rawData = item.type === 'CUSTOM' ? item.data : '';
    const scriptDataArray = Array.isArray(rawData) ? rawData : [rawData];
    const { scriptContents, noScriptContents } = extractScriptAndNoscript(scriptDataArray);

    return (
      <React.Fragment key={index}>
        {scriptContents.srcTagged.map((srcScript, idx) => (
          <div key={`external-bottom-${idx}`} dangerouslySetInnerHTML={{ __html: srcScript }} />
        ))}

        {scriptContents.inline.map((inlineCode, idx) => (
          <script key={`inline-bottom-${idx}`} dangerouslySetInnerHTML={{ __html: inlineCode }} />
        ))}

        {noScriptContents.map((noScript, idx) => (
          <noscript key={`noscript-bottom-${idx}`} dangerouslySetInnerHTML={{ __html: noScript }} />
        ))}
      </React.Fragment>
    );
  });
};

const BodyTopScripts = React.memo(BodyTopScriptsComponent);
BodyTopScripts.displayName = "BodyTopScripts";

export default BodyTopScripts
