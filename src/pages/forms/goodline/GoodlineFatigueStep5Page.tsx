import React, { useState } from 'react'
import HeaderWithClose from '../../../components/layout/HeaderWithClose'
import Button from '../../../components/ui/Button'
import Input from '../../../components/ui/Input'
import Radio from '../../../components/ui/Radio'
import SignaturePadModal from '../../../components/ui/SignaturePadModal'
import goodlineLogo from '../../../assets/companylogo/goodlinelogo.svg'

interface GoodlineFatigueStep5PageProps {
  onNext: () => void
  onBack: () => void
  onClose: () => void
}

const GoodlineFatigueStep5Page: React.FC<GoodlineFatigueStep5PageProps> = ({
  onNext,
  onBack,
  onClose
}) => {
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
    if (firstName && lastName && signature) {
      onNext()
    }
  }

  const isFormValid = firstName && lastName && signature

  return (
    <div className="h-screen flex flex-col bg-[#f8f7f2] overflow-hidden">
      {/* Header - Fixed */}
      <HeaderWithClose
        title="Goodline Fatigue Form"
        onClose={onClose}
        progress="5/6"
        className="flex-shrink-0"
      />

      {/* Main Content - Scrollable */}
      <div className="flex-1 px-5 py-3 space-y-6 overflow-y-auto">
          {/* Select Your Company */}
          <div className="space-y-4">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between pr-2">
                <h3 className="text-[#344054] text-sm font-medium">Select Your Company</h3>
              </div>
              
              <div className="space-y-2">
                {/* Goodline - Selected */}
                <div className="bg-[#ebfe5c] border border-[#2a6c7e] rounded-[20px] p-4 flex items-center gap-3">
                  {/* Radio Button - Selected */}
                  <Radio checked={true} onChange={() => {}} />
                  
                  {/* Company Info */}
                  <div className="flex items-center gap-1">
                    <div className="w-9 h-9 bg-white rounded-md p-1 flex items-center justify-center">
                      <img 
                        src={goodlineLogo} 
                        alt="Goodline"
                        className="w-full h-6 object-contain"
                      />
                    </div>
                    <span className="text-[#101828] text-sm font-medium">Goodline</span>
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

      {/* Bottom Navigation - Fixed */}
      <div className="px-5 py-3 flex-shrink-0">
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

export default GoodlineFatigueStep5Page
