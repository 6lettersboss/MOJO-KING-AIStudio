
import React from 'react';

export const WatchIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="6" y="8" width="12" height="8" rx="2" />
    <path d="M12 2v6" />
    <path d="M12 16v6" />
    <path d="M18 7.5v-1a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v1" />
    <path d="M6 16.5v1a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-1" />
  </svg>
);
