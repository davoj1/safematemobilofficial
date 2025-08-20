import React, { useState } from 'react'
import { Button } from './index'
import noResultsFoundIcon from '../../assets/history/noresultsfoundicon.png'
import arrowsClockwiseIcon from '../../assets/history/ArrowsClockwise.svg'

interface HistoryEmptyStateProps {
  onResetFilter?: () => void
}

const HistoryEmptyState: React.FC<HistoryEmptyStateProps> = ({ onResetFilter }) => {
  const [isResetting, setIsResetting] = useState(false)

  const handleResetFilter = async () => {
    setIsResetting(true)
    
    // Simulate reset process
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Call the actual reset function
    onResetFilter?.()
    
    setIsResetting(false)
  }

  return (
    <div className="flex flex-col items-center justify-center px-10 py-8">
      <div className="flex flex-col gap-3 items-center justify-start w-full">
        {/* No Results Found Icon */}
        <div className="w-20 h-20 overflow-hidden">
          <img
            src={noResultsFoundIcon}
            alt="No results found"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-6 items-center justify-center w-full">
          {/* Text Content */}
          <div className="flex flex-col gap-3 items-start justify-start text-center w-full">
            <h2 className="font-semibold text-[#182230] text-xl leading-[30px] w-full">
              No forms found.
            </h2>
            <p className="font-normal text-[#667085] text-base leading-6 w-full">
              We can't find any completed forms.
            </p>
          </div>

          {/* Reset Filter Button */}
          <div className="flex flex-col gap-4 items-center justify-start w-[220px]">
            <Button
              variant="light-teal"
              size="md"
              onClick={handleResetFilter}
              disabled={isResetting}
              className="flex items-center gap-2"
            >
              <img
                src={arrowsClockwiseIcon}
                alt="Reset filter"
                className={`w-6 h-6 transition-transform duration-500 ${
                  isResetting ? 'animate-spin' : ''
                }`}
              />
              {isResetting ? 'Searching forms...' : 'Search again'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HistoryEmptyState 