import imageNull from '@/assets/imageNull.png';
import React from 'react';

type AvatarImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  withBaseUrl?: boolean;
};

export const AvatarImage: React.FC<AvatarImageProps> = ({
  src,
  withBaseUrl = true,
  ...props
}) => {
  const finalSrc = src
    ? withBaseUrl
      ? `https://truthful-simplicity-production.up.railway.app${src}`
      : src
    : imageNull;

  return (
    <img
      {...props}
      src={finalSrc}
      alt='Avatar'
      onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = imageNull;
      }}
    />
  );
};
