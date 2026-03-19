"use client";
import React, { useEffect } from 'react';

interface Props {
  slug: string | undefined;
}

const MerchantDetailsCSScripts = ({ slug }: Props) => {
  useEffect(() => {
    const showMore = document.getElementById(`show-more-link-${slug}`);
    const showLess = document.getElementById(`show-less-link-${slug}`);
    const collapsed = document.getElementById(`collapsed-text-${slug}`);
    const expanded = document.getElementById(`expanded-text-${slug}`);

    const handleShowMore = (e: Event) => {
      e.preventDefault();
      if (collapsed && expanded) {
        collapsed.style.display = 'none';
        expanded.style.display = 'block';
      }
    };

    const handleShowLess = (e: Event) => {
      e.preventDefault();
      if (collapsed && expanded) {
        collapsed.style.display = 'block';
        expanded.style.display = 'none';
      }
    };

    showMore?.addEventListener('click', handleShowMore);
    showLess?.addEventListener('click', handleShowLess);

    return () => {
      showMore?.removeEventListener('click', handleShowMore);
      showLess?.removeEventListener('click', handleShowLess);
    };
  }, [slug]);

  return null;
};

export default MerchantDetailsCSScripts;
