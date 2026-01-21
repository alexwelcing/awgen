import React, { useEffect } from 'react';
import { SEO_JSON_LD } from '../constants';

export const SEOMetadata: React.FC = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(SEO_JSON_LD);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
};