
import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  as: React.ElementType;
}

export const Icon: React.FC<IconProps> = ({ as: Component, ...props }) => {
  return <Component {...props} />;
};
