import React from 'react';
import logoGarut from '../assets/logo-garut.svg';

interface LogoGarutProps {
  className?: string;
  alt?: string;
}

export const LogoGarut: React.FC<LogoGarutProps> = ({ 
  className = "h-11 sm:h-12 w-auto object-contain", 
  alt = "Lambang Kabupaten Garut" 
}) => {
  return (
    <img
      src={logoGarut}
      alt={alt}
      className={className}
      loading="eager"
      decoding="async"
    />
  );
};
