import React, { useState } from 'react'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import { MobileLayout } from '../components/layout'
import { Button } from '../components/ui'

// Simple progress indicator without external component first
const SimpleProgressIndicator: React.FC<{ current: number; total: number }> = ({ current, total }) => (
  <div className="flex justify-center space-x-2 mb-12">
    {Array.from({ length: total }, (_, index) => (
      <div
        key={index}
        className={`h-2 rounded-full transition-all duration-300 ${
          index === current 
            ? 'bg-teal-600 w-6' 
            : 'bg-gray-300 w-2'
        }`}
      />
    ))}
  </div>
)

// Simple slide component without external dependencies
const SimpleSlide: React.FC<{ title: string; subtitle: string; image?: string }> = ({ title, subtitle, image }) => (
  <div className="flex flex-col items-center text-center px-6">
    {/* Image placeholder for now */}
    <div className="w-full max-w-sm mx-auto mb-8">
      <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center">
        {image ? (
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
              target.parentElement!.innerHTML = `
                <div class="w-full h-full flex items-center justify-center text-teal-600 text-6xl">
                  🏗️
                </div>
              `
            }}
          />
        ) : (
          <div className="text-teal-600 text-6xl">🏗️</div>
        )}
      </div>
    </div>

    {/* Content */}
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 leading-tight px-4">
        {title}
      </h2>
      <p className="text-gray-600 text-base leading-relaxed max-w-sm mx-auto px-4">
        {subtitle}
      </p>
    </div>
  </div>
)

// Onboarding data
const onboardingData = [
  {
    id: 1,
    title: 'Start Safe, Stay Safe',
    subtitle: 'Begin every shift with a quick risk check to protect yourself and your team.',
  },
  {
    id: 2,
    title: 'Stay On Track',
    subtitle: 'Complete short safety check-ins throughout the day to stay alert and compliant.',
  },
  {
    id: 3,
    title: 'Report Fast, Act Fast',
    subtitle: 'Easily flag issues or hazards so your team can act before it\'s too late.',
  },
]

const OnboardingPageFixed: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState(0)

  const nextSlide = () => {
    if (currentSlide < onboardingData.length - 1) {
      setDirection(1)
      setCurrentSlide(currentSlide + 1)
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setDirection(-1)
      setCurrentSlide(currentSlide - 1)
    }
  }

  const handleDragEnd = (event: any, info: PanInfo) => {
    const threshold = 50
    if (info.offset.x > threshold) {
      prevSlide()
    } else if (info.offset.x < -threshold) {
      nextSlide()
    }
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  }

  return (
    <MobileLayout safeArea={true} padding={false}>
      <div className="flex flex-col h-full bg-white">
        {/* Main content area */}
        <div className="flex-1 relative overflow-hidden">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              className="absolute inset-0 flex items-center justify-center pt-20 pb-8"
            >
              <SimpleSlide
                title={onboardingData[currentSlide].title}
                subtitle={onboardingData[currentSlide].subtitle}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom section */}
        <div className="flex-shrink-0 px-6 pb-8 space-y-8">
          {/* Progress Indicator */}
          <SimpleProgressIndicator
            current={currentSlide}
            total={onboardingData.length}
          />

          {/* Action Buttons */}
          <div className="space-y-4">
            <Button
              fullWidth
              size="lg"
              className="bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-2xl py-4"
              onClick={() => console.log('Create account clicked')}
            >
              Create account
            </Button>
            
            <Button
              fullWidth
              size="lg"
              variant="outline"
              className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold rounded-2xl py-4"
              onClick={() => console.log('Sign in clicked')}
            >
              Sign in
            </Button>
          </div>
        </div>

        {/* Skip button */}
        <div className="absolute top-16 right-6">
          <button
            onClick={() => setCurrentSlide(onboardingData.length - 1)}
            className="text-gray-500 text-sm font-medium hover:text-gray-700 transition-colors"
          >
            Skip
          </button>
        </div>
      </div>
    </MobileLayout>
  )
}

export default OnboardingPageFixed