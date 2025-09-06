import React, { useState, useEffect } from 'react'
import { Button } from './index'
import { cn } from '../../utils/cn'
import copyIcon from '../../assets/companytab/copyicon.svg'
import shareIcon from '../../assets/jobs/shareicon.svg'
import yourQrCode from '../../assets/jobs/yourqrcode.svg'

interface InviteTeamMembersModalProps {
  isOpen: boolean
  onClose: () => void
  companyCode: string
}

const InviteTeamMembersModal: React.FC<InviteTeamMembersModalProps> = ({
  isOpen,
  onClose,
  companyCode
}) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }, [isOpen])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => {
      onClose()
    }, 300)
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(companyCode)
    // TODO: Show success toast
    console.log('Company code copied')
  }

  const handleShareCode = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Join Our Company',
        text: `Join our company using this code: ${companyCode}`,
      })
    } else {
      // Fallback to copying to clipboard
      handleCopyCode()
    }
  }


  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end">
      {/* Dark overlay */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${
          isVisible ? 'bg-black/50' : 'bg-black/0'
        }`}
        onClick={handleClose}
      />

      {/* Bottom sheet */}
      <div className={`relative bg-white rounded-t-[20px] w-full h-[600px] flex flex-col pt-12 pb-6 px-4 transform transition-transform duration-300 ease-out ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}>
        {/* Drag handle */}
        <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-[54px] h-[5px] bg-[#d9d9d9] rounded-full" />

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1"></div>
          <h2 className="font-bold text-[#000000] text-xl leading-[30px] text-center flex-1 whitespace-nowrap">
            Invite Work Mates
          </h2>
          <div className="flex-1 flex justify-end">
            <button
              onClick={handleClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            >
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Header Divider */}
        <div className="border-t border-[#eaecf0] mb-6"></div>

        {/* Content */}
        <div className="flex-1 flex flex-col gap-8 overflow-y-auto">
          {/* QR Code Section */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 text-center">
              <h3 className="font-semibold text-[#000000] text-lg leading-7">
                QR Code
              </h3>
              <p className="text-[#667085] text-sm leading-5">
                Show this QR code to your work mates to scan and join the company
              </p>
            </div>

            {/* QR Code Display */}
            <div className="flex items-center justify-center">
              <img 
                src={yourQrCode} 
                alt="Company QR Code" 
                className="w-48 h-48 object-contain"
              />
            </div>

          </div>

          {/* Divider */}
          <div className="flex items-center">
            <div className="flex-1 border-t border-[#eaecf0]"></div>
            <div className="px-4">
              <span className="text-[#667085] text-sm font-medium">or</span>
            </div>
            <div className="flex-1 border-t border-[#eaecf0]"></div>
          </div>

          {/* Company Code Section */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 text-center">
              <h3 className="font-semibold text-[#000000] text-lg leading-7">
                Company Code
              </h3>
              <p className="text-[#667085] text-sm leading-5">
                Share this code with your work mates to join manually
              </p>
            </div>

            {/* Company Code Display */}
            <div className="bg-[#eaf0f2] rounded-lg p-2.5 flex items-center justify-between">
              <span className="text-[#667085] text-xs font-normal leading-5">Company Code</span>
              <div className="flex items-center gap-1">
                <span className="text-[#101828] text-sm font-medium leading-5">{companyCode}</span>
                <button onClick={handleCopyCode} className="w-6 h-6">
                  <img src={copyIcon} alt="Copy" className="w-full h-full" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                onClick={handleCopyCode}
                className="flex-1 border-[#e4e7ec]"
                variant="outline"
              >
                <div className="flex items-center justify-center gap-2">
                  <img src={copyIcon} alt="Copy" className="w-4 h-4" />
                  <span>Copy</span>
                </div>
              </Button>
              <Button
                onClick={handleShareCode}
                className="flex-1 border-[#e4e7ec]"
                variant="outline"
              >
                <div className="flex items-center justify-center gap-2">
                  <img src={shareIcon} alt="Share" className="w-4 h-4" />
                  <span>Share</span>
                </div>
              </Button>
            </div>
          </div>

          {/* Help Message */}
          <div className="bg-[#f8f7f2] border border-[#eaf0f2] rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 text-[#266273] mt-0.5 flex-shrink-0">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-[#266273] text-sm mb-1">How to Invite</h4>
                <p className="text-[#266273] text-sm leading-5">
                  Show the QR code to your work mates to scan and join the company, or share the company code with them to join manually.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InviteTeamMembersModal
