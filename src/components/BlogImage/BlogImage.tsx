import React from 'react';

import fallbackImg from '@/assets/imageBlogLokal.png';

export const BlogImage: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = ({
  src,
  ...props
}) => {
  const finalSrc = src ? src : fallbackImg;

  return (
    <img
      {...props}
      src={finalSrc}
      alt='Blog Image'
      onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = fallbackImg;
      }}
    />
  );
};
