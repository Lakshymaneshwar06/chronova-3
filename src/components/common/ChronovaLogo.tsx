import React from 'react';

interface ChronovaLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'compact' | 'mark';
  className?: string;
  onClick?: () => void;
  showSubtitle?: boolean;
}

export const ChronovaLogo: React.FC<ChronovaLogoProps> = ({
  size = 'md',
  variant = 'full',
  className = '',
  onClick,
  showSubtitle = true
}) => {
  // Dimension tokens
  const dimensions = {
    xs: { icon: 24, text: 'text-sm', sub: 'text-[9px]' },
    sm: { icon: 30, text: 'text-base', sub: 'text-[9px]' },
    md: { icon: 38, text: 'text-xl', sub: 'text-[10px]' },
    lg: { icon: 48, text: 'text-2xl', sub: 'text-xs' },
    xl: { icon: 64, text: 'text-3xl', sub: 'text-sm' }
  }[size];

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-2.5 select-none ${
        onClick ? 'cursor-pointer hover:opacity-95 transition-opacity' : ''
      } ${className}`}
    >
      {/* Vector Emblem: Chrono (Time/Orbit/C) + Nova (Starlight Spark) */}
      <div
        className="relative shrink-0 flex items-center justify-center rounded-2xl p-1 bg-gradient-to-tr from-pastel-lavender via-pastel-periwinkle to-pastel-sky border border-pastel-lavender/80 shadow-xs"
        style={{ width: dimensions.icon, height: dimensions.icon }}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-xs"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Soft Pastel Gradient for Outer Crescent C */}
            <linearGradient id="chronovaCrescentGrad" x1="10%" y1="0%" x2="90%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="50%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>

            {/* Glowing Nova Star Gradient */}
            <linearGradient id="chronovaNovaGrad" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#f43f5e" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#fbbf24" />
            </linearGradient>

            {/* Subtle orbital pastel glow */}
            <linearGradient id="chronovaOrbitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c084fc" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {/* Background subtle orbital ring */}
          <circle
            cx="50"
            cy="50"
            r="42"
            stroke="url(#chronovaOrbitGrad)"
            strokeWidth="3"
            strokeDasharray="4 6"
            className="animate-spin-slow origin-center opacity-60"
          />

          {/* Outer Stylized 'C' Emblem (The Chrono Arc) */}
          <path
            d="M 68 24
               C 62 18, 54 14, 45 14
               C 25 14, 14 29, 14 50
               C 14 71, 25 86, 45 86
               C 55 86, 63 81, 70 74
               L 61 65
               C 56 70, 50 74, 44 74
               C 31 74, 25 63, 25 50
               C 25 37, 31 26, 44 26
               C 50 26, 56 30, 60 34
               Z"
            fill="url(#chronovaCrescentGrad)"
          />

          {/* The Inner Nova Sparkle Star (4-point Diamond Star with Secondary Diagonals) */}
          {/* Main vertical & horizontal diamond beam */}
          <path
            d="M 58 50
               Q 68 50, 74 50
               Q 68 50, 58 50
               Q 58 40, 58 34
               Q 58 40, 58 50
               Q 58 60, 58 66
               Q 58 60, 58 50
               Q 48 50, 42 50
               Q 48 50, 58 50
               Z"
            fill="none"
          />
          {/* Curvilinear Radiant Nova Star */}
          <path
            d="M 58 28
               Q 59 47, 78 48
               Q 59 49, 58 68
               Q 57 49, 38 48
               Q 57 47, 58 28
               Z"
            fill="url(#chronovaNovaGrad)"
          />

          {/* Diagonal secondary nova starlight glints */}
          <circle cx="58" cy="48" r="3.5" fill="#ffffff" />
          <circle cx="78" cy="24" r="2.5" fill="#818cf8" opacity="0.85" />
          <circle cx="34" cy="74" r="2" fill="#38bdf8" opacity="0.75" />
        </svg>
      </div>

      {/* Typography: CHRONOVA + Subtitle */}
      {variant !== 'mark' && (
        <div className="flex flex-col leading-tight">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-extrabold tracking-tight font-heading text-slate-800 ${dimensions.text}`}
            >
              CHRONOVA
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-tr from-indigo-500 to-sky-400" />
          </div>

          {variant === 'full' && showSubtitle && (
            <span
              className={`font-semibold tracking-wider uppercase text-slate-400 font-sans ${dimensions.sub}`}
            >
              Campus Ecosystem
            </span>
          )}
        </div>
      )}
    </div>
  );
};
