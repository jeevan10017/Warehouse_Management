
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines class names using `clsx` and merges Tailwind classes with `twMerge`.
 * @param  {...any} classes - Class names or conditions.
 * @returns {string} - Merged class names.
 */
export function cn(...classes) {
  return twMerge(clsx(...classes));
}
