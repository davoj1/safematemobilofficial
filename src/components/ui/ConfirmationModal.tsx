import React from 'react'

interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmText?: string
  cancelText?: string
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel'
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl p-10 mx-4 max-w-sm w-full shadow-xl">
        {/* Title */}
        <h3 className="font-bold text-[#24262d] text-lg leading-6 mb-6 text-center">
          {title}
        </h3>
        
        {/* Message */}
        <p className="text-[#667085] text-sm leading-5 mb-10 text-center">
          {message}
        </p>
        
        {/* Buttons */}
        <div className="flex flex-col gap-5">
          <button
            onClick={onConfirm}
            className="w-full py-3 px-4 bg-[#266273] text-white font-semibold rounded-2xl hover:bg-[#1e4d59] transition-colors duration-200"
          >
            {confirmText}
          </button>
          <button
            onClick={onClose}
            className="w-full py-3 px-4 bg-[#f2f4f7] text-[#98a2b3] font-semibold rounded-2xl hover:bg-[#e4e7ec] transition-colors duration-200"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationModal 