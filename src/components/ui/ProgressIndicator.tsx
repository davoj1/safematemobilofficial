import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

interface ProgressIndicatorProps {
  totalSteps: number
  currentStep: number
  className?: string
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  totalSteps,
  currentStep,
  className,
}) => {
  return (
    <div className={cn('flex justify-center space-x-2', className)}>
      {Array.from({ length: totalSteps }, (_, index) => (
        <motion.div
          key={index}
          className={cn(
            'w-2 h-2 rounded-full transition-all duration-300',
            index === currentStep
              ? 'bg-teal-600 w-6' // Active dot - wider and teal color
              : 'bg-gray-300' // Inactive dots
          )}
          initial={false}
          animate={{
            width: index === currentStep ? 24 : 8,
            backgroundColor: index === currentStep ? '#0d9488' : '#d1d5db',
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

export default ProgressIndicator