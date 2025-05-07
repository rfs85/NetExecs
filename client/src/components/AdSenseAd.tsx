import React, { useEffect } from 'react';

export interface AdSenseAdProps {
  format?: 'auto' | 'horizontal' | 'rectangle' | 'vertical';
  slot: string;
  responsive?: boolean;
  className?: string;
}

/**
 * A component for displaying AdSense ads
 * Format options: 'auto', 'horizontal', 'rectangle', 'vertical'
 */
const AdSenseAd: React.FC<AdSenseAdProps> = ({
  format = 'auto',
  slot,
  responsive = true,
  className = ''
}) => {
  useEffect(() => {
    // Attempt to load ads when component mounts or slot changes
    try {
      // @ts-ignore - window.adsbygoogle is injected by the AdSense script
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error('Error loading AdSense ad:', error);
    }
  }, [slot]);
  
  return (
    <div className={`ad-container relative ${className}`}>
      <div className="text-xs text-gray-500 absolute -top-4 left-0">
        Advertisement
      </div>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', minHeight: '90px' }}
        data-ad-client="ca-pub-9236847887178276" // Replace with your actual AdSense publisher ID
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
};

export default AdSenseAd;