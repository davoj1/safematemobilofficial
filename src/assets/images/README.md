# Onboarding Images

## How to Replace Placeholder Images

To replace the placeholder SVG images with your actual Figma images:

### 1. Save your images from Figma
- Export each onboarding screen image as PNG or JPG
- Recommended size: 300x300px or higher for retina displays
- Name them: `onboarding-1.jpg`, `onboarding-2.jpg`, `onboarding-3.jpg`

### 2. Add images to this folder
```
src/assets/images/
├── onboarding-1.jpg  (Mining site with worker in orange safety gear)
├── onboarding-2.jpg  (Workers with safety gear and mobile device)
├── onboarding-3.jpg  (Worker with phone and tablet)
└── README.md
```

### 3. Update the image imports
In `src/pages/OnboardingPage.tsx`, replace the placeholder imports:

```typescript
// Replace this:
import { getOnboardingImage } from '../assets/images/placeholder'

// With this:
import onboarding1 from '../assets/images/onboarding-1.jpg'
import onboarding2 from '../assets/images/onboarding-2.jpg'
import onboarding3 from '../assets/images/onboarding-3.jpg'

// And update the onboardingData array:
const onboardingData = [
  {
    id: 1,
    image: onboarding1,
    title: 'Start Safe, Stay Safe',
    subtitle: 'Begin every shift with a quick risk check to protect yourself and your team.',
  },
  {
    id: 2,
    image: onboarding2,
    title: 'Stay On Track',
    subtitle: 'Complete short safety check-ins throughout the day to stay alert and compliant.',
  },
  {
    id: 3,
    image: onboarding3,
    title: 'Report Fast, Act Fast',
    subtitle: 'Easily flag issues or hazards so your team can act before it\'s too late.',
  },
]
```

The placeholder images will automatically be replaced with your high-quality Figma exports!