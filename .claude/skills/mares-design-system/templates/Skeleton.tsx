/**
 * Skeleton — Mareš Design System
 *
 * Two flavors:
 *  - shimmer = false → flat `bg-zinc-200` block (avatars, image placeholders)
 *  - shimmer = true  → animated gradient sweep (text lines, primary loading state)
 *
 * Width/height pass-through via Tailwind utility class strings (e.g. `h-4 w-48`)
 * so the caller controls the shape.
 *
 * The `shimmer` keyframe must exist in the host project's stylesheet:
 *
 *   @keyframes shimmer {
 *     0%   { background-position: -200% 0; }
 *     100% { background-position:  200% 0; }
 *   }
 *
 * See references/motion.md for the canonical keyframe set.
 */
import * as React from 'react';

interface SkeletonProps {
  /** Tailwind sizing classes, e.g. "h-4 w-48". Required so the caller controls shape. */
  className: string;
  /** Animated gradient sweep. Default false (flat block). */
  shimmer?: boolean;
}

const shimmerStyle: React.CSSProperties = {
  background:
    'linear-gradient(90deg, #E4E4E7 25%, #F4F4F5 50%, #E4E4E7 75%)',
  backgroundSize: '200% 100%',
  animation: 'shimmer 1.5s infinite',
};

export function Skeleton({ className, shimmer = false }: SkeletonProps) {
  if (shimmer) {
    return <div className={className} style={shimmerStyle} />;
  }
  return <div className={`${className} bg-zinc-200`.trim()} />;
}

/**
 * Usage:
 *
 *   <div className="flex items-start gap-4">
 *     <Skeleton className="h-12 w-12" />          // avatar placeholder
 *     <div className="flex flex-col gap-3">
 *       <Skeleton className="h-4 w-48" shimmer />  // title line
 *       <Skeleton className="h-4 w-64" shimmer />  // subtitle line
 *     </div>
 *   </div>
 */
