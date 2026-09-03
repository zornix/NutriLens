import React from 'react';

interface VitoMascotProps {
  size?: 'sm' | 'md' | 'lg' | 'hero';
  className?: string;
  animate?: boolean;
}

export const VitoMascot: React.FC<VitoMascotProps> = ({
  size = 'md',
  className = '',
  animate = true
}) => {
  const sizeClasses = {
    sm: 'w-7 h-7',
    md: 'w-12 h-12',
    lg: 'w-24 h-24',
    hero: 'w-36 h-36 md:w-44 md:h-44'
  };

  const imageSrc =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAs-Dbwc4WgoyrQLzfG0XF2_V0LkPvZ8YaH76j8qsoiT7QZ0QShqHR6-KN_y6ZIoJI9Al7rSN8S1aOm3bBcUteqyOoOMw7bnZf8GGSaA9lxYu4oRphNZ3IZHTJg0qyqdYGKybrLYjIPf3kHgfQKDhBLEgoTg_VqGL0Vq-Ju8eh2g2wJ0VIGKxILE5whFbk4DOoI54G5aCNcoSMtNy2Dcs1JVe0KEdPUoFHu0_Dp2oU5eGtEffX0RPWpPw';

  return (
    <div
      className={`relative inline-flex items-center justify-center flex-shrink-0 ${
        animate ? 'mascot-float' : ''
      } ${className}`}
    >
      <img
        src={imageSrc}
        alt="Vito the NutriLens Mascot"
        className={`${sizeClasses[size]} object-contain drop-shadow-[0_10px_18px_rgba(2,40,81,0.18)] transition-transform duration-300`}
        onError={(e) => {
          // Fallback if network blocked
          const target = e.currentTarget;
          target.onerror = null;
          target.src =
            'https://lh3.googleusercontent.com/aida/AEtjO1XQI_4ZumbWOlwt5_cPsFeBuXRAAnNIqRsP38AisoTVP-KbT9qO8PIPqzQEYSas9GwsTGjOsQK6wBJk3zqfX_lEBur1xxSk_f-Brc4zlgbpm3WjU-ofD8yNUXZofHZO-pXkrWbQwn1SKt9QdCqQBP01CJGbqADHrNz90bsH1X4aRn60ZmOz1F65cTfZ4UuWuJTo_u4Uy7GwpYfthU2JCO9e5A4RQPqbBKdQO1mCKHsTMPnS2xBc40lovoM';
        }}
      />
    </div>
  );
};
