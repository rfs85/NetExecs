import React from 'react';

const NessusAdBanner = () => {
  return (
    <div className="w-full py-4 px-2 flex flex-col items-center bg-gray-50 dark:bg-gray-800 border-t border-b border-gray-200 dark:border-gray-700">
      <span className="text-xs text-gray-500 mb-1 dark:text-gray-400">Advertisement</span>
      <a 
        href="https://shop.tenable.com/4s4op23gh4zt" 
        target="_blank" 
        rel="noopener noreferrer sponsored"
        className="transition-transform hover:scale-[1.01] focus:outline-none"
        aria-label="Tenable Nessus - Get 10% off with code SAVE10"
      >
        <img 
          src="/assets/SAVE10_728x90 (1).jpg" 
          alt="Tenable Nessus - Stay a step ahead of cyber attackers. Get 10% off with code SAVE10" 
          className="max-w-full h-auto rounded shadow-sm" 
          width="728" 
          height="90"
          loading="eager"
        />
      </a>
    </div>
  );
};

export default NessusAdBanner;