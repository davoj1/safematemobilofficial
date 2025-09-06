import React, { useState, useEffect } from 'react'
import { Button, Input } from './index'
import { cn } from '../../utils/cn'
import orangeScanIcon from '../../assets/companytab/orangescan.svg'

interface AddNewCompanyModalProps {
  isOpen: boolean
  onClose: () => void
  onAddByCode: (companyCode: string) => void
  onScanQRCode: () => void
}

const AddNewCompanyModal: React.FC<AddNewCompanyModalProps> = ({
  isOpen,
  onClose,
  onAddByCode,
  onScanQRCode
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [companyCode, setCompanyCode] = useState('')

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

  const handleAddByCode = () => {
    if (companyCode.trim()) {
      onAddByCode(companyCode.trim())
      handleClose()
    }
  }

  const handleScanQR = () => {
    onScanQRCode()
    handleClose()
  }

  const isCodeValid = companyCode.trim().length > 0

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
            Add New Company
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
          {/* Option 1: Add by Company Code */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 text-center">
              <h3 className="font-semibold text-[#000000] text-lg leading-7">
                Add by Company Code
              </h3>
              <p className="text-[#667085] text-sm leading-5">
                Enter the company code provided by your supervisor or company administrator to join their organization.
              </p>
            </div>

            <div className="bg-white border border-[#d0d5dd] rounded-xl px-3.5 py-2.5 shadow-sm flex items-center gap-2">
              <input
                type="text"
                value={companyCode}
                onChange={(e) => setCompanyCode(e.target.value)}
                placeholder="Enter Company ID (e.g ABCD1234)"
                className="flex-1 text-[#667085] text-base font-normal leading-6 outline-none placeholder:text-[#667085]"
              />
              <img src={orangeScanIcon} alt="Scan QR" className="w-6 h-6" />
            </div>

            <Button
              onClick={handleAddByCode}
              disabled={!isCodeValid}
              className="w-full"
              variant="primary"
            >
              Send Join Request
            </Button>
          </div>

          {/* Divider */}
          <div className="flex items-center">
            <div className="flex-1 border-t border-[#eaecf0]"></div>
            <div className="px-4">
              <span className="text-[#667085] text-sm font-medium">or</span>
            </div>
            <div className="flex-1 border-t border-[#eaecf0]"></div>
          </div>

          {/* Option 2: Scan QR Code */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 text-center">
              <h3 className="font-semibold text-[#000000] text-lg leading-7">
                Scan QR Code
              </h3>
              <p className="text-[#667085] text-sm leading-5">
                Scan the QR code of your Supervisor or Leading Hand to join the company. This is the quickest way to join.
              </p>
            </div>

            <Button
              onClick={handleScanQR}
              className="w-full"
              variant="outline"
            >
              <div className="flex items-center justify-center gap-2">
                <img src={orangeScanIcon} alt="Scan QR" className="w-5 h-5" />
                <span>Scan QR Code</span>
              </div>
            </Button>
          </div>

          {/* Help Text */}
          <div className="bg-[#f8f7f2] border border-[#eaf0f2] rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 text-[#266273] mt-0.5 flex-shrink-0">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-[#266273] text-sm mb-1">Need Help?</h4>
                <p className="text-[#266273] text-sm leading-5">
                  Contact your supervisor or company administrator to provide you with the Company or QR code for joining.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddNewCompanyModal
