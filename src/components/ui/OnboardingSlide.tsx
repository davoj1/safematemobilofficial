import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

interface OnboardingSlideProps {
  image: string
  title: string
  subtitle: string
  className?: string
}

const OnboardingSlide: React.FC<OnboardingSlideProps> = ({
  image,
  title,
  subtitle,
  className,
}) => {
  return (
    <div className={cn('flex flex-col items-center text-center px-6', className)}>
      {/* Hero Image */}
      <motion.div
        className="w-full max-w-sm mx-auto mb-8"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback if image doesn't load
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
              target.parentElement!.innerHTML = `
                <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-100 to-primary-200">
                  <div class="text-primary-500 text-6xl">🏗️</div>
                </div>
              `
            }}
          />
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
      >
        <h2 className="text-2xl font-bold text-gray-900 leading-tight px-4">
          {title}
        </h2>
        <p className="text-gray-600 text-base leading-relaxed max-w-sm mx-auto px-4">
          {subtitle}
        </p>
      </motion.div>
    </div>
  )
}

export default OnboardingSlide