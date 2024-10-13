import React from 'react';
import { cn } from "../../lib/utils.js";

export const AuroraBackground = ({ className, children, showRadialGradient = true, ...props }) => {
  return (
    <div
      className={cn(
        "relative h-full w-full bg-zinc-50 dark:bg-zinc-900 transition-bg",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={cn(`
            [--aurora:repeating-linear-gradient(100deg,var(--blue-500)_10%,var(--indigo-300)_15%,var(--blue-300)_20%,var(--violet-200)_25%,var(--blue-400)_30%)]
            [background-image:var(--aurora)]
            [background-size:300%,_200%]
            [background-position:50%_50%,50%_50%]
            filter blur-[10px] opacity-50 will-change-transform
            absolute inset-0
            after:animate-aurora
          `, showRadialGradient && `mask-image:radial-gradient(ellipse_at_100%_0%, black 10%, transparent 70%)`)}
        />
      </div>
      {children}
    </div>
  );
};
