import React, { useState } from 'react'
import { Button, Input, SignaturePadModal } from '../../../components/ui'

interface SafemateTake5Step5Props {
  selectedCompany: string
  otherCompany: string
  firstName: string
  lastName: string
  signature: string
  onNext: (selectedCompany: string, otherCompany: string, firstName: string, lastName: string, signature: string) => void
  onBack: () => void
}

const SafemateTake5Step5: React.FC<SafemateTake5Step5Props> = ({
  selectedCompany,
  otherCompany,
  firstName,
  lastName,
  signature,
  onNext,
  onBack,
}) => {
  const [currentOtherCompany, setCurrentOtherCompany] = useState(otherCompany)
  const [currentFirstName, setCurrentFirstName] = useState(firstName)
  const [currentLastName, setCurrentLastName] = useState(lastName)
  const [currentSignature, setCurrentSignature] = useState(signature)
  const [showSignatureModal, setShowSignatureModal] = useState(false)

  const handleNext = () => {
    onNext('', currentOtherCompany, currentFirstName, currentLastName, currentSignature)
  }

  const isFormValid = 
    currentOtherCompany.trim() !== '' &&
    currentFirstName.trim() !== '' &&
    currentLastName.trim() !== '' &&
    currentSignature.trim() !== ''

  return (
    <div className="h-full flex flex-col">
      {/* Content - Scrollable */}
      <div className="flex-1 flex flex-col px-5 py-3 gap-6 overflow-y-auto">
        {/* Company Name Section */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-start">
              <h2 className="text-[#344054] text-sm font-medium leading-5">
                Enter Your Company Name
              </h2>
            </div>
            
            <div className="bg-white rounded-[20px] border border-[#eaecf0] p-4">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-1">
                  <label className="text-[#344054] text-sm font-medium leading-5">
                    Company name
                  </label>
                  <span className="text-[#d92d20] text-sm font-medium leading-5">*</span>
                </div>
                <Input
                  placeholder="Enter your company name"
                  value={currentOtherCompany}
                  onChange={(e) => setCurrentOtherCompany(e.target.value)}
                  className="bg-white border-[#d0d5dd] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Worker Name Section */}
        <div className="flex flex-col gap-1.5">
          <h2 className="text-[#344054] text-sm font-medium leading-5">
            Worker name
          </h2>
          
          <div className="bg-white rounded-[20px] border border-[#eaecf0] p-4">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-1">
                  <label className="text-[#344054] text-sm font-medium leading-5">
                    First name
                  </label>
                  <span className="text-[#d92d20] text-sm font-medium leading-5">*</span>
                </div>
                <Input
                  placeholder="Input your first name"
                  value={currentFirstName}
                  onChange={(e) => setCurrentFirstName(e.target.value)}
                  className="bg-white border-[#d0d5dd] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]"
                />
              </div>
              
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-1">
                  <label className="text-[#344054] text-sm font-medium leading-5">
                    Last name
                  </label>
                  <span className="text-[#d92d20] text-sm font-medium leading-5">*</span>
                </div>
                <Input
                  placeholder="Input your last name"
                  value={currentLastName}
                  onChange={(e) => setCurrentLastName(e.target.value)}
                  className="bg-white border-[#d0d5dd] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Worker's Signature Section */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1">
            <h2 className="text-[#344054] text-sm font-medium leading-5">
              Worker's signature
            </h2>
            <span className="text-[#d92d20] text-sm font-medium leading-5">*</span>
          </div>
          
          <button
            onClick={() => setShowSignatureModal(true)}
            className={`bg-white rounded-[20px] border-2 border-dashed h-[140px] flex items-center justify-center transition-colors ${
              currentSignature 
                ? 'border-[#d0d5dd] hover:border-[#266273]' 
                : 'border-[#d0d5dd] hover:border-[#266273]'
            }`}
          >
            {currentSignature ? (
              <img src={currentSignature} alt="Signature" className="max-w-full max-h-full object-contain" />
            ) : (
              <p className="text-[#667085] text-base font-normal leading-6 text-center">
                Select to sign your signature here
              </p>
            )}
          </button>
        </div>
      </div>

      {/* Bottom Navigation - Fixed */}
      <div className="px-5 py-3 flex gap-4 flex-shrink-0">
        <Button
          onClick={onBack}
          variant="secondary"
          className="flex-1 bg-[#eaf0f2] border-[#eaf0f2] text-[#1e4d59] hover:bg-[#d4e3e6]"
        >
          Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={!isFormValid}
          className="flex-1"
          variant={isFormValid ? 'primary' : 'secondary'}
        >
          Complete
        </Button>
      </div>

      {/* Signature Modal */}
      <SignaturePadModal
        isOpen={showSignatureModal}
        onClose={() => setShowSignatureModal(false)}
        onSave={(signatureData) => {
          setCurrentSignature(signatureData)
          setShowSignatureModal(false)
        }}
        existingSignature={currentSignature}
      />
    </div>
  )
}

export default SafemateTake5Step5
