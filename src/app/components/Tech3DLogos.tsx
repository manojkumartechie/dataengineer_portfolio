import React from 'react';

// Apache Spark 3D Logo
export const Spark3D = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 64 64" {...props} role="img" aria-label="Apache Spark 3D logo">
    <defs>
      <radialGradient id="sparkOrange" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#fff3e0" />
        <stop offset="100%" stopColor="#ff9800" />
      </radialGradient>
      <filter id="sparkShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#000" floodOpacity="0.3"/>
      </filter>
    </defs>
    <polygon points="32,6 38,26 58,26 42,38 48,58 32,46 16,58 22,38 6,26 26,26" fill="url(#sparkOrange)" filter="url(#sparkShadow)"/>
    <circle cx="32" cy="32" r="6" fill="#fffde7" opacity="0.7"/>
  </svg>
);

// Docker 3D Logo
export const Docker3D = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 64 64" {...props} role="img" aria-label="Docker 3D logo">
    <defs>
      <linearGradient id="dockerBlue" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00c6fb" />
        <stop offset="100%" stopColor="#005bea" />
      </linearGradient>
      <filter id="dockerShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#000" floodOpacity="0.3"/>
      </filter>
    </defs>
    <rect x="10" y="36" width="44" height="12" rx="6" fill="url(#dockerBlue)" filter="url(#dockerShadow)"/>
    <rect x="18" y="28" width="8" height="8" rx="2" fill="#fff" opacity="0.8"/>
    <rect x="28" y="28" width="8" height="8" rx="2" fill="#fff" opacity="0.8"/>
    <rect x="38" y="28" width="8" height="8" rx="2" fill="#fff" opacity="0.8"/>
    <ellipse cx="32" cy="44" rx="20" ry="6" fill="#0093e9" opacity="0.2"/>
    <circle cx="54" cy="36" r="4" fill="#00c6fb"/>
  </svg>
);

// Kubernetes 3D Logo
export const Kubernetes3D = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 64 64" {...props} role="img" aria-label="Kubernetes 3D logo">
    <defs>
      <linearGradient id="k8sBlue" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#43cea2" />
        <stop offset="100%" stopColor="#185a9d" />
      </linearGradient>
      <filter id="k8sShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#000" floodOpacity="0.3"/>
      </filter>
    </defs>
    <polygon points="32,8 56,20 56,44 32,56 8,44 8,20" fill="url(#k8sBlue)" filter="url(#k8sShadow)"/>
    <circle cx="32" cy="32" r="8" fill="#fff" opacity="0.8"/>
    <rect x="30" y="16" width="4" height="16" fill="#185a9d"/>
    <rect x="30" y="32" width="4" height="16" fill="#185a9d" transform="rotate(60 32 40)"/>
    <rect x="30" y="32" width="4" height="16" fill="#185a9d" transform="rotate(-60 32 40)"/>
  </svg>
);

// AWS 3D Logo
export const AWS3D = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 64 64" {...props} role="img" aria-label="AWS 3D logo">
    <defs>
      <linearGradient id="awsOrange" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f7971e" />
        <stop offset="100%" stopColor="#ffd200" />
      </linearGradient>
      <filter id="awsShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#000" floodOpacity="0.3"/>
      </filter>
    </defs>
    <ellipse cx="32" cy="40" rx="20" ry="8" fill="url(#awsOrange)" filter="url(#awsShadow)"/>
    <rect x="16" y="20" width="32" height="16" rx="8" fill="#fffde7" opacity="0.8"/>
    <rect x="24" y="12" width="16" height="8" rx="4" fill="#ffd200"/>
  </svg>
);

// MySQL 3D Logo
export const MySQL3D = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 64 64" {...props} role="img" aria-label="MySQL 3D logo">
    <defs>
      <linearGradient id="mysqlBlue" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0072b1" />
        <stop offset="100%" stopColor="#00c6fb" />
      </linearGradient>
      <filter id="mysqlShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#000" floodOpacity="0.3"/>
      </filter>
    </defs>
    <ellipse cx="32" cy="44" rx="18" ry="8" fill="url(#mysqlBlue)" filter="url(#mysqlShadow)"/>
    <rect x="18" y="24" width="28" height="16" rx="8" fill="#fff" opacity="0.8"/>
    <ellipse cx="32" cy="24" rx="14" ry="6" fill="#0072b1" opacity="0.7"/>
  </svg>
);

// Add more logos as needed following this pattern. 