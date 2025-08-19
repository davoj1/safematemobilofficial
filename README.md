# Safe Mate Mobile Web App

A mobile-first web application built with React, Vite, Tailwind CSS, TypeScript, and Supabase for creating pixel-perfect mobile experiences.

## 🚀 Tech Stack

- **React 18** - Modern React with hooks and functional components
- **Vite** - Lightning-fast build tool optimized for development
- **TypeScript** - Type-safe JavaScript for better development experience
- **Tailwind CSS** - Utility-first CSS framework with mobile-first approach
- **Supabase** - Backend-as-a-Service for authentication and database
- **Clsx & Tailwind Merge** - Intelligent class name merging utilities

## 📱 Mobile-First Features

- **Responsive Design**: Mobile-first responsive design with optimized touch targets (44px minimum)
- **Safe Area Support**: Built-in support for notched devices with `safe-area` classes
- **Touch Optimizations**: Improved touch scrolling and interactions
- **PWA Ready**: Meta tags and configuration for Progressive Web App features
- **Font Loading**: Optimized Inter font loading with preconnect
- **Viewport Optimizations**: Prevents unwanted zoom and improves mobile UX

## 🏗️ Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components (Button, Input, etc.)
│   ├── layout/          # Layout components (MobileLayout, Header)
│   └── forms/           # Form-specific components
├── pages/               # Page components
├── hooks/               # Custom React hooks
├── services/            # API services and Supabase client
├── utils/               # Utility functions
├── types/               # TypeScript type definitions
├── contexts/            # React context providers
└── index.css           # Global styles with Tailwind directives
```

## 🛠️ Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in the root directory:

```bash
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Replace the values with your actual Supabase project credentials.

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`. The server is configured to allow access from mobile devices on your local network.

### 4. Build for Production

```bash
npm run build
```

## 📋 Available Components

### UI Components

- **Button**: Mobile-optimized button with variants (primary, secondary, outline, ghost, danger)
- **Input**: Form input with label, error states, and icon support
- **MobileLayout**: Main layout component with header/footer support and safe area handling

### Layout Components

- **Header**: Mobile app header with title and action buttons
- **MobileLayout**: Container for mobile app layout with safe area support

## 🎨 Design System

### Colors

- **Primary**: Blue theme (#3b82f6, #2563eb, #1d4ed8)
- **Secondary**: Gray theme (#64748b, #475569)
- **Danger**: Red theme (#ef4444, #dc2626)
- **Success**: Green theme (#22c55e, #16a34a)

### Typography

- **Font Family**: Inter (loaded from Google Fonts)
- **Font Weights**: 300, 400, 500, 600, 700

### Responsive Breakpoints

- **xs**: 375px (iPhone SE)
- **sm**: 414px (iPhone Pro)
- **md**: 768px (iPad)
- **lg**: 1024px (Desktop)
- **xl**: 1280px (Large Desktop)

## 🔐 Authentication

The app includes a complete authentication system using Supabase:

- **AuthContext**: React context for managing authentication state
- **Auth Service**: Helper functions for sign up, sign in, sign out
- **Type Safety**: Full TypeScript support for user and auth states

## 📱 Mobile Testing

1. **Local Network Testing**: The dev server is configured to accept connections from mobile devices
2. **Find Your IP**: Run `ipconfig` (Windows) or `ifconfig` (Mac/Linux) to find your local IP
3. **Access on Mobile**: Visit `http://YOUR_LOCAL_IP:5173` on your mobile device

## 🧩 Adding New Components

When creating new components, follow these guidelines:

1. **Use TypeScript**: All components should have proper type definitions
2. **Mobile-First**: Design for mobile screens first, then add larger breakpoints
3. **Reusability**: Create reusable components in the `src/components/ui` directory
4. **Consistency**: Use the established design tokens (colors, spacing, typography)
5. **Accessibility**: Ensure proper touch targets (minimum 44px) and focus states

### Example Component

```tsx
import React from 'react'
import { cn } from '../../utils/cn'

interface MyComponentProps {
  className?: string
  children: React.ReactNode
}

const MyComponent: React.FC<MyComponentProps> = ({ className, children }) => {
  return (
    <div className={cn('base-classes', className)}>
      {children}
    </div>
  )
}

export default MyComponent
```

## 🔄 Development Workflow

1. **Start with Figma Designs**: Follow the provided Figma designs pixel-perfectly
2. **Component-First**: Break designs into reusable components
3. **Mobile-First**: Always design and develop for mobile first
4. **Type Safety**: Ensure all props and states are properly typed
5. **Testing**: Test on actual mobile devices using local network access

## 📝 Notes for Figma Implementation

- **Ignore Status Bars**: Don't include 'IOS UI - Status Bar' and '/Home indicator bar' from Figma
- **Component Reuse**: Create reusable components for consistent design elements
- **Pixel Perfect**: Match spacing, colors, and typography exactly as designed
- **Touch Targets**: Ensure all interactive elements meet 44px minimum touch target

## 🚀 Ready to Build

Your Safe Mate mobile web app is now set up with:

✅ React + TypeScript + Vite  
✅ Tailwind CSS with mobile-first utilities  
✅ Supabase integration ready  
✅ Mobile-optimized layout components  
✅ Authentication system  
✅ Responsive design system  
✅ Development server configured for mobile testing  

You can now start implementing your Figma designs with pixel-perfect accuracy using the provided component library and design system!