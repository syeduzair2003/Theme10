"use client"

import { useEffect, useState } from 'react';
import P3 from '@/components/Theme-3/comp/Loader';
// import P1 from '@/components/Theme-1/comp/Loader';
// import P2 from '@/components/Theme-2/comp/Loader';

interface Props {
  redirectUrl: string;
  theme?: string;
}

const OutRedirect = ({ redirectUrl, theme }: Props) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.location.href = redirectUrl;
  }, [redirectUrl]);

  const renderThemeLoader = () => {
    switch (theme?.toLowerCase()) {
      // case 'theme 1':
      //   return <P1 />;
      // case 'theme 2':
      //   return <P2 />;
      case 'theme 3':
        return <P3 />;
      default:
        return <P3 />;
    }
  };

  return (
    <>
      {loading && renderThemeLoader()}
    </>
  );
};

export default OutRedirect;
