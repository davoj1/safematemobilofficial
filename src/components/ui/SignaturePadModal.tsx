import React, { useRef, useEffect, useState } from 'react'
import Button from './Button'

interface SignaturePadModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (signatureData: string) => void
  existingSignature?: string
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

  useEffect(() => {
    if (isOpen && canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      if (ctx) {
        // Set canvas size
        canvas.width = 320
        canvas.height = 200
        
        // Set drawing style
        ctx.strokeStyle = '#000000'
        ctx.lineWidth = 2
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        
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

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    setHasSignature(true)
    
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (canvas && ctx) {
      const rect = canvas.getBoundingClientRect()
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
      
      const x = clientX - rect.left
      const y = clientY - rect.top
      
      ctx.beginPath()
      ctx.moveTo(x, y)
    }
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return
    
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (canvas && ctx) {
      const rect = canvas.getBoundingClientRect()
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
      
      const x = clientX - rect.left
      const y = clientY - rect.top
      
      ctx.lineTo(x, y)
      ctx.stroke()
    }
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const clearSignature = () => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (canvas && ctx) {
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      setHasSignature(false)
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