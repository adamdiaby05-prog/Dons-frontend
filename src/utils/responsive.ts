// Utilitaires pour la gestion responsive

export const breakpoints = {
  mobile: '480px',
  tablet: '768px',
  desktop: '1024px',
  large: '1200px'
};

export const isMobile = (): boolean => {
  return window.innerWidth <= 480;
};

export const isTablet = (): boolean => {
  return window.innerWidth > 480 && window.innerWidth <= 768;
};

export const isDesktop = (): boolean => {
  return window.innerWidth > 768;
};

// Fonction pour ajuster la taille des éléments selon l'écran
export const getResponsiveSize = (mobile: number, tablet: number, desktop: number): number => {
  if (isMobile()) return mobile;
  if (isTablet()) return tablet;
  return desktop;
};

// Fonction pour ajuster le padding selon l'écran
export const getResponsivePadding = (): string => {
  if (isMobile()) return '1rem';
  if (isTablet()) return '1.5rem';
  return '2rem';
};

// Fonction pour ajuster la taille de police selon l'écran
export const getResponsiveFontSize = (base: number): number => {
  if (isMobile()) return base * 0.8;
  if (isTablet()) return base * 0.9;
  return base;
};
