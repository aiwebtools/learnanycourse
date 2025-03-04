
import React from 'react';
import { cn } from '@/lib/utils';

interface GlassMorphismProps {
  children: React.ReactNode;
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
  variant?: 'light' | 'dark';
}

const GlassMorphism: React.FC<GlassMorphismProps> = ({
  children,
  className,
  intensity = 'medium',
  variant = 'light',
}) => {
  const getIntensityClasses = () => {
    if (variant === 'dark') {
      switch (intensity) {
        case 'low':
          return 'bg-black/40 backdrop-blur-sm border border-gray-800 shadow-sm';
        case 'high':
          return 'bg-black/70 backdrop-blur-xl border border-gray-800 shadow-xl';
        case 'medium':
        default:
          return 'bg-black/50 backdrop-blur-md border border-gray-800 shadow-lg';
      }
    } else {
      switch (intensity) {
        case 'low':
          return 'bg-white/90 backdrop-blur-sm border border-gray-300 shadow-sm';
        case 'high':
          return 'bg-white/95 backdrop-blur-xl border border-gray-300 shadow-xl';
        case 'medium':
        default:
          return 'bg-white/90 backdrop-blur-md border border-gray-300 shadow-lg';
      }
    }
  };

  return (
    <div className={cn(getIntensityClasses(), 'rounded-xl', className)}>
      {children}
    </div>
  );
};

export default GlassMorphism;
