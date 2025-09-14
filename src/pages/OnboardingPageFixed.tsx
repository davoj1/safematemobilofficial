import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, type PanInfo } from 'framer-motion'
import { Button } from '../components/ui'

// Import onboarding images
import safemateonboard1 from '../assets/safemateonboard1.png'
import safemateonboard2 from '../assets/safemateonboard2.png'
import safemateonboard3 from '../assets/safemateonboard3.png'

// Onboarding data matching the Figma design
const onboardingData = [
  {
    id: 1,
    title: 'Start Safe',
    subtitle: 'Kick off every shift with safety checks and clear communication.',
    image: safemateonboard1,
  },
  {
    id: 2,
    title: 'Work Safe',
    subtitle: 'Stay on track with jobs, forms, and team updates in one place.',
    image: safemateonboard2,
  },
  {
    id: 3,
    title: 'Go Home Safe',
    subtitle: 'Look after yourself and your mates, so everyone makes it back safe.',
    image: safemateonboard3,
  },
]

interface OnboardingPageFixedProps {
  onNavigate?: (view: 'create-account' | 'sign-in' | 'home' | 'company' | 'settings' | 'onboarding' | 'jobs-select-company' | 'jobs-create-job' | 'jobs-completed-review' | 'job-team-chat' | 'forms-select-mine-company' | 'forms-bhp-site-selection' | 'forms-fmg-site-selection' | 'forms-bhp-form-selection' | 'forms-fmg-form-selection' | 'forms-take-control' | 'forms-my-exposures' | 'forms-hazard-identification' | 'forms-company-worker-details' | 'forms-take-control-review' | 'forms-take-control-success' | 'forms-fatigue-management-step1' | 'forms-fatigue-management-step2' | 'forms-fatigue-management-step3' | 'forms-fatigue-management-step4' | 'forms-fatigue-management-step5' | 'forms-fatigue-management-step6' | 'forms-fatigue-management-review' | 'forms-fatigue-management-success' | 'forms-report-hazard-step1' | 'forms-report-hazard-step2' | 'forms-report-hazard-step3' | 'forms-report-hazard-step4' | 'forms-report-hazard-review' | 'verify-email' | 'success' | 'forgot-password' | 'reset-password' | 'password-changed-success' | 'upload-profile-picture' | 'enter-full-name' | 'profile-created-success') => void;
}

const OnboardingPageFixed: React.FC<OnboardingPageFixedProps> = ({ onNavigate }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState(0)

  // Auto-advance slides every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setCurrentSlide((prev) => (prev + 1) % onboardingData.length)
    }, 4000)

    return () => clearInterval(timer)
  }, [])

  const handleDragEnd = (event: any, info: PanInfo) => {
    const threshold = 50
    if (info.offset.x > threshold && currentSlide > 0) {
      setDirection(-1)
      setCurrentSlide(currentSlide - 1)
    } else if (info.offset.x < -threshold && currentSlide < onboardingData.length - 1) {
      setDirection(1)
      setCurrentSlide(currentSlide + 1)
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

  const handleCreateAccount = () => {
    onNavigate?.('create-account')
  }

  const handleSignIn = () => {
    onNavigate?.('sign-in')
  }

  return (
    <div className="bg-white h-screen w-full flex flex-col">
      {/* Image Section - 40% of screen height with curved bottom */}
      <div className="relative h-[40vh] w-full overflow-hidden">
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
            className="absolute inset-0"
          >
            <div 
              className="w-full h-full"
              style={{
                clipPath: 'ellipse(100% 100% at 50% 0%)',
              }}
            >
              <img 
                src={onboardingData[currentSlide].image} 
                alt={onboardingData[currentSlide].title}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content Section - Remaining 60% with centered content */}
      <div className="flex-1 flex flex-col justify-center px-5">
        {/* Centered content area */}
        <div className="flex flex-col items-center justify-center flex-1 space-y-8">
          {/* Title and Subtitle */}
          <div className="flex flex-col gap-3 items-center justify-center text-center w-full">
            <div className="font-bold text-[#182230] text-[30px] w-full">
              <p className="block leading-[38px]">{onboardingData[currentSlide].title}</p>
            </div>
            <div className="font-normal text-[#667085] text-[16px] w-full">
              <p className="block leading-[24px]">
                {onboardingData[currentSlide].subtitle}
              </p>
            </div>
          </div>

          {/* Pagination Dots with smooth transitions */}
          <div className="flex flex-row gap-1.5 items-center justify-center">
            {onboardingData.map((_, index) => (
              <motion.div
                key={index}
                animate={{
                  width: index === currentSlide ? '40px' : '8px',
                  backgroundColor: index === currentSlide ? '#266273' : '#eaecf0',
                }}
                transition={{
                  duration: 0.3,
                  ease: 'easeInOut',
                }}
                className="h-1.5 rounded-[9999px]"
              />
            ))}
          </div>
        </div>

        {/* Action Buttons - Fixed at bottom with proper spacing */}
        <div className="flex flex-col gap-4 w-full pb-8">
          {/* Create Account Button */}
          <Button
            fullWidth
            size="lg"
            onClick={handleCreateAccount}
            className="bg-[#266273] hover:bg-[#1e4d59] text-white font-semibold rounded-2xl py-4"
          >
            Create account
          </Button>

          {/* Sign In Button */}
          <Button
            fullWidth
            size="lg"
            variant="outline"
            onClick={handleSignIn}
            className="border-2 border-[#2a6c7e] text-[#1e4d59] hover:bg-[#f8f9fa] font-semibold rounded-2xl py-4"
          >
            Sign in
          </Button>
        </div>
      </div>
    </div>
  )
}

export default OnboardingPageFixed