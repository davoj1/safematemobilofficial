import React from 'react'

interface BatteryIconProps {
  level: 0 | 1 | 2 | 3 | 4 | 5 // 0 = empty, 5 = full
  className?: string
}

const BatteryIcon: React.FC<BatteryIconProps> = ({ level, className = "w-8 h-8" }) => {
  const getColor = (level: number) => {
    switch (level) {
      case 0: return '#ef4444' // Red - Empty
      case 1: return '#f97316' // Orange - Very Low
      case 2: return '#eab308' // Yellow - Low
      case 3: return '#65a30d' // Light Green - Medium
      case 4: return '#22c55e' // Green - High
      case 5: return '#16a34a' // Dark Green - Full
      default: return '#6b7280' // Gray - Default
    }
  }

  const getFillWidth = (level: number) => {
    return (level / 5) * 100 // Convert to percentage
  }

  const color = getColor(level)
  const fillWidth = getFillWidth(level)

  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Battery Outline */}
      <rect 
        x="2" 
        y="6" 
        width="16" 
        height="12" 
        rx="2" 
        ry="2" 
        stroke="#374151" 
        strokeWidth="1.5" 
        fill="white"
      />
      
      {/* Battery Terminal */}
      <rect 
        x="18" 
        y="9" 
        width="2" 
        height="6" 
        rx="1" 
        ry="1" 
        fill="#374151"
      />
      
      {/* Battery Fill */}
      {level > 0 && (
        <rect 
          x="3.5" 
          y="7.5" 
          width={`${(fillWidth / 100) * 13}`} // 13 is the inner width of battery
          height="9" 
          rx="1" 
          ry="1" 
          fill={color}
        />
      )}
      
      {/* Empty indicator (when level is 0) */}
      {level === 0 && (
        <text 
          x="10" 
          y="13.5" 
          textAnchor="middle" 
          fontSize="8" 
          fill="#ef4444" 
          fontWeight="bold"
        >
          !
        </text>
      )}
    </svg>
  )
}

export default BatteryIcon
