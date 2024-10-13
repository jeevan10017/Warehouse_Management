"use client";

import Globe from "./Globe.tsx"; 

export function GlobeDemo() {
  return (
    <div className="relative flex w-full max-w-lg  items-center justify-center overflow-hidden rounded-lg   px-50 pb-60 pt-8 md:pb-60 md:shadow-xl ">
 
      <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b  bg-clip-text text-center text-7xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
        Warehouse Locations
      </span>

      <Globe className="top-24" />

      <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_200%,rgba(0,0,0,0.2),rgba(255,255,255,0))]" />
    </div>
  );
}
