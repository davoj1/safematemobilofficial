// Placeholder images for onboarding screens
// These will be replaced with actual images when available

export const onboardingImages = {
  slide1: 'data:image/svg+xml;base64,' + btoa(`
    <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:0.8" />
          <stop offset="100%" style="stop-color:#1d4ed8;stop-opacity:0.9" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad1)"/>
      <circle cx="150" cy="120" r="40" fill="#fff" opacity="0.9"/>
      <rect x="70" y="180" width="160" height="80" rx="8" fill="#f59e0b" opacity="0.8"/>
      <text x="150" y="280" text-anchor="middle" fill="#fff" font-size="12" font-family="Arial">Mining Site Safety</text>
    </svg>
  `),
  
  slide2: 'data:image/svg+xml;base64,' + btoa(`
    <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#10b981;stop-opacity:0.8" />
          <stop offset="100%" style="stop-color:#059669;stop-opacity:0.9" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad2)"/>
      <circle cx="100" cy="100" r="30" fill="#fff" opacity="0.9"/>
      <circle cx="200" cy="100" r="30" fill="#fff" opacity="0.9"/>
      <rect x="120" y="160" width="60" height="80" rx="8" fill="#3b82f6" opacity="0.8"/>
      <text x="150" y="280" text-anchor="middle" fill="#fff" font-size="12" font-family="Arial">Team Safety Check</text>
    </svg>
  `),
  
  slide3: 'data:image/svg+xml;base64,' + btoa(`
    <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#f59e0b;stop-opacity:0.8" />
          <stop offset="100%" style="stop-color:#d97706;stop-opacity:0.9" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad3)"/>
      <circle cx="150" cy="100" r="35" fill="#fff" opacity="0.9"/>
      <rect x="100" y="160" width="100" height="60" rx="8" fill="#3b82f6" opacity="0.8"/>
      <circle cx="180" cy="180" r="15" fill="#ef4444" opacity="0.9"/>
      <text x="150" y="280" text-anchor="middle" fill="#fff" font-size="12" font-family="Arial">Emergency Report</text>
    </svg>
  `)
}

// Utility function to get image URL
export const getOnboardingImage = (slideNumber: 1 | 2 | 3): string => {
  const imageMap = {
    1: onboardingImages.slide1,
    2: onboardingImages.slide2,
    3: onboardingImages.slide3,
  }
  return imageMap[slideNumber]
}