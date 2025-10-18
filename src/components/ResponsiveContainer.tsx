import React from 'react';
import './ResponsiveContainer.css';

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
}

const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({ children, className = '' }) => {
  return (
    <div className={`responsive-container ${className}`}>
      {children}
    </div>
  );
};

export default ResponsiveContainer;
