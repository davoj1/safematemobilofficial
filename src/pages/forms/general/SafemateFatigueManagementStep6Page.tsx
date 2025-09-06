import React, { useState } from 'react'
import HeaderWithClose from '../../../components/layout/HeaderWithClose'
import Button from '../../../components/ui/Button'
import Input from '../../../components/ui/Input'
import SignaturePadModal from '../../../components/ui/SignaturePadModal'
import safemateShieldLogo from '../../../assets/safemateshieldlogo.svg'

interface SafemateFatigueManagementStep6PageProps {
  onNext: () => void
  onBack: () => void
  onClose: () => void
}

const SafemateFatigueManagementStep6Page: React.FC<SafemateFatigueManagementStep6PageProps> = ({
  onNext,
  onBack,
  onClose
}) => {
  const [companyName, setCompanyName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [signature, setSignature] = useState('')
  const [showSignaturePad, setShowSignaturePad] = useState(false)

  const handleSignatureSave = (signatureDataUrl: string) => {
    setSignature(signatureDataUrl)
    setShowSignaturePad(false)
  }

  const handleSignatureClear = () => {
    setSignature('')
  }

  const handleNext = () => {
    if (companyName && firstName && lastName && signature) {
      onNext()
    }
  }

  const isFormValid = companyName && firstName && lastName && signature

  return (
    <div className="min-h-screen bg-[#f8f7f2] flex flex-col">
      {/* Header */}
      <HeaderWithClose
        title="Fatigue Management"
        onClose={onClose}
        progress="6/6"
      />

      {/* Content */}
      <div className="flex-1 px-5 py-3 flex flex-col justify-between">
        <div className="flex-1 space-y-6">
          {/* Enter Your Company Name */}
          <div className="space-y-4">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between pr-2">
                <h3 className="text-[#344054] text-sm font-medium">Enter Your Company Name</h3>
              </div>
              
              <div className="space-y-2">
                {/* Company Name Input */}
                <div className="bg-white border border-[#eaecf0] rounded-[20px] p-4">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-1">
                      <label className="text-[#344054] text-sm font-medium leading-5">
                        Company name
                      </label>
                      <span className="text-[#d92d20] text-sm font-medium leading-5">*</span>
                    </div>
                    <Input
                      placeholder="Enter your company name"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="bg-white border-[#d0d5dd] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Worker Name */}
          <div className="space-y-4">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between pr-2">
                <h3 className="text-[#344054] text-sm font-medium">Worker name</h3>
              </div>
              
              <div className="bg-white border border-[#eaecf0] rounded-[20px] p-4 space-y-3">
                {/* First Name */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1">
                    <span className="text-[#344054] text-sm font-medium">First name</span>
                    <span className="text-[#d92d20] text-sm font-medium">*</span>
                  </div>
                  <Input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter first name"
                    className="border-[#d0d5dd]"
                  />
                </div>

                {/* Last Name */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1">
                    <span className="text-[#344054] text-sm font-medium">Last name</span>
                    <span className="text-[#d92d20] text-sm font-medium">*</span>
                  </div>
                  <Input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter last name"
                    className="border-[#d0d5dd]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Worker's Signature */}
          <div className="space-y-4">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between pr-2">
                <h3 className="text-[#344054] text-sm font-medium">Worker's signature</h3>
              </div>
              
              <div className="relative">
                <button
                  onClick={() => setShowSignaturePad(true)}
                  className="w-full h-40 bg-white border-2 border-dashed border-[#d0d5dd] rounded-[20px] flex items-center justify-center hover:border-[#2a6c7e] transition-colors"
                >
                  {signature ? (
                    <img 
                      src={signature} 
                      alt="Signature" 
                      className="max-w-full max-h-full object-contain"
                    />
                  ) : (
                    <p className="text-[#667085] text-base font-normal leading-6 text-center">
                      Select to sign your signature here
                    </p>
                  )}
                </button>
                
                {/* Clear signature button */}
                {signature && (
                  <button
                    onClick={handleSignatureClear}
                    className="absolute -top-2 -right-2 w-[30px] h-[30px] bg-[#f2f4f7] border border-gray-50 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    <span className="text-[#98a2b3] text-lg">×</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4 w-full">
          <Button
            onClick={onBack}
            variant="light-teal"
            className="flex-1"
          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={!isFormValid}
            className="flex-1"
          >
            Complete
          </Button>
        </div>
      </div>

      {/* Signature Pad Modal */}
      <SignaturePadModal
        isOpen={showSignaturePad}
        onClose={() => setShowSignaturePad(false)}
        onSave={handleSignatureSave}
        existingSignature={signature}
      />
    </div>
  )
}

export default SafemateFatigueManagementStep6Page
