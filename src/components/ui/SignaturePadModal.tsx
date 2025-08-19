import React, { useRef, useEffect, useState } from 'react'
import Button from './Button'

interface SignaturePadModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (signatureData: string) => void
  existingSignature?: string
}

interface Point {
  x: number
  y: number
  timestamp: number
}

const SignaturePadModal: React.FC<SignaturePadModalProps> = ({
  isOpen,
  onClose,
  onSave,
  existingSignature
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [hasSignature, setHasSignature] = useState(false)
  const [lastPoint, setLastPoint] = useState<Point | null>(null)
  const [lastVelocity, setLastVelocity] = useState(0)

  useEffect(() => {
    if (isOpen && canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      if (ctx) {
        // Set canvas size
        canvas.width = 320
        canvas.height = 200
        
        // Set drawing style for brand color
        ctx.strokeStyle = '#266273' // Brand teal color
        ctx.fillStyle = '#266273'
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        ctx.globalCompositeOperation = 'source-over'
        
        // Clear canvas with white background
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        
        // Load existing signature if available
        if (existingSignature) {
          const img = new Image()
          img.onload = () => {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
            setHasSignature(true)
          }
          img.src = existingSignature
        }
      }
    }
  }, [isOpen, existingSignature])

  // Calculate distance between two points
  const getDistance = (point1: Point, point2: Point): number => {
    return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2))
  }

  // Calculate velocity based on distance and time
  const getVelocity = (point1: Point, point2: Point): number => {
    const distance = getDistance(point1, point2)
    const timeDiff = point2.timestamp - point1.timestamp
    return timeDiff > 0 ? distance / timeDiff : 0
  }

  // Convert velocity to line width (faster = thinner, slower = thicker)
  const getLineWidth = (velocity: number): number => {
    const minWidth = 1
    const maxWidth = 4
    const velocityFactor = Math.min(velocity / 2, 1) // Normalize velocity
    return maxWidth - (velocityFactor * (maxWidth - minWidth)) + Math.random() * 0.5 // Add slight randomness
  }

  // Draw a smooth line with variable width
  const drawSmoothLine = (ctx: CanvasRenderingContext2D, point1: Point, point2: Point, width: number) => {
    const distance = getDistance(point1, point2)
    if (distance < 2) return // Skip very short lines
    
    // Create multiple circles along the line for smooth effect
    const steps = Math.max(Math.floor(distance / 2), 1)
    
    for (let i = 0; i <= steps; i++) {
      const t = i / steps
      const x = point1.x + (point2.x - point1.x) * t
      const y = point1.y + (point2.y - point1.y) * t
      
      ctx.beginPath()
      ctx.fillStyle = '#266273'
      ctx.arc(x, y, width / 2, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    setHasSignature(true)
    
    const canvas = canvasRef.current
    if (canvas) {
      const rect = canvas.getBoundingClientRect()
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
      
      const point: Point = {
        x: clientX - rect.left,
        y: clientY - rect.top,
        timestamp: Date.now()
      }
      
      setLastPoint(point)
      setLastVelocity(0)
    }
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !lastPoint) return
    
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (canvas && ctx) {
      const rect = canvas.getBoundingClientRect()
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
      
      const currentPoint: Point = {
        x: clientX - rect.left,
        y: clientY - rect.top,
        timestamp: Date.now()
      }
      
      const velocity = getVelocity(lastPoint, currentPoint)
      const smoothedVelocity = lastVelocity * 0.7 + velocity * 0.3 // Smooth the velocity
      const lineWidth = getLineWidth(smoothedVelocity)
      
      drawSmoothLine(ctx, lastPoint, currentPoint, lineWidth)
      
      setLastPoint(currentPoint)
      setLastVelocity(smoothedVelocity)
    }
  }

  const stopDrawing = () => {
    setIsDrawing(false)
    setLastPoint(null)
    setLastVelocity(0)
  }

  const clearSignature = () => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (canvas && ctx) {
      // Clear canvas with white background
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Reset drawing settings
      ctx.strokeStyle = '#266273'
      ctx.fillStyle = '#266273'
      
      setHasSignature(false)
      setLastPoint(null)
      setLastVelocity(0)
    }
  }

  const saveSignature = () => {
    const canvas = canvasRef.current
    if (canvas && hasSignature) {
      const signatureData = canvas.toDataURL('image/png')
      onSave(signatureData)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-[20px] w-full max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#eaecf0]">
          <h2 className="text-[#101828] text-lg font-semibold leading-7">
            Sign Your Signature
          </h2>
          <button
            onClick={onClose}
            className="w-6 h-6 flex items-center justify-center text-[#667085] hover:text-[#101828] transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Canvas Area */}
        <div className="p-4">
          <div className="bg-white border-2 border-dashed border-[#d0d5dd] rounded-xl p-4 mb-4">
            <canvas
              ref={canvasRef}
              className="w-full h-auto border border-[#eaecf0] rounded-lg cursor-crosshair touch-none"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              style={{ touchAction: 'none' }}
            />
          </div>
          
          <p className="text-[#667085] text-sm text-center mb-4">
            Draw your signature above
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 p-4 pt-0">
          <Button
            onClick={clearSignature}
            variant="secondary"
            className="flex-1 bg-[#f9fafb] border-[#d0d5dd] text-[#344054] hover:bg-[#f3f4f6]"
          >
            Clear
          </Button>
          <Button
            onClick={saveSignature}
            disabled={!hasSignature}
            className="flex-1"
            variant={hasSignature ? 'primary' : 'secondary'}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SignaturePadModal