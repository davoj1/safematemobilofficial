import React, { useState } from 'react'
import { HeaderWithClose } from '../../components/layout'
import { Button, Input, Radio, SignaturePadModal } from '../../components/ui'
import warrikalLogo from '../../assets/takecontrol/warrikal.png'

interface WorkerDetails {
  firstName: string
  lastName: string
  signature: string
}

interface CompanyWorkerDetailsData {
  company: 'warrikal'
  worker: WorkerDetails
}

interface CompanyWorkerDetailsPageProps {
  onBack?: () => void
  onComplete?: (data: CompanyWorkerDetailsData) => void
  onClose?: () => void
}

const CompanyWorkerDetailsPage: React.FC<CompanyWorkerDetailsPageProps> = ({
  onBack,
  onComplete,
  onClose
}) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [signature, setSignature] = useState('')
  const [showSignatureModal, setShowSignatureModal] = useState(false)

  const isFormValid = () => {
    return firstName.trim() && lastName.trim() && signature.trim()
  }

  const handleComplete = () => {
    if (isFormValid()) {
      const formData: CompanyWorkerDetailsData = {
        company: 'warrikal',
        worker: {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          signature: signature.trim()
        }
      }
      onComplete?.(formData)
    }
  }

  const handleClose = () => {
    onClose?.()
  }

  return (
    <div className="h-screen flex flex-col bg-[#f8f7f2] overflow-hidden">
      {/* Header */}
      <HeaderWithClose 
        title="Take 5" 
        onClose={handleClose}
        progress="4/4"
        className="flex-shrink-0"
      />

      {/* Content */}
      <div className="flex-1 flex flex-col px-5 py-3 gap-6 overflow-y-auto">
        {/* Company Selection Section */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-start">
              <h2 className="text-[#344054] text-sm font-medium leading-5">
                Select Your Company
              </h2>
            </div>
            
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                {/* Warrikal Option */}
                <div className="bg-[#ebfe5c] rounded-[20px] border-2 border-[#2a6c7e] p-4 flex items-center gap-3">
                  <Radio checked={true} onChange={() => {}} />
                  
                  <div className="flex items-center gap-1">
                    <div className="w-9 h-9 bg-white rounded-md flex items-center justify-center p-1">
                      <img src={warrikalLogo} alt="Warrikal" className="w-full h-full object-contain" />
                    </div>
                    <span className="text-[#101828] text-sm font-medium leading-5">
                      Warrikal
                    </span>
                  </div>
                </div>
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
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
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
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
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
              signature 
                ? 'border-[#d0d5dd] hover:border-[#266273]' 
                : 'border-[#d0d5dd] hover:border-[#266273]'
            }`}
          >
            {signature ? (
              <img src={signature} alt="Signature" className="max-w-full max-h-full object-contain" />
            ) : (
              <p className="text-[#667085] text-base font-normal leading-6 text-center">
                Select to sign your signature here
              </p>
            )}
          </button>
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="px-5 py-3 flex gap-4 flex-shrink-0">
        <Button
          onClick={onBack}
          variant="secondary"
          className="flex-1 bg-[#eaf0f2] border-[#eaf0f2] text-[#1e4d59] hover:bg-[#d4e3e6]"
        >
          Previous
        </Button>
        <Button
          onClick={handleComplete}
          disabled={!isFormValid()}
          className="flex-1"
          variant={isFormValid() ? 'primary' : 'secondary'}
        >
          Complete
        </Button>
      </div>

      {/* Signature Modal */}
      <SignaturePadModal
        isOpen={showSignatureModal}
        onClose={() => setShowSignatureModal(false)}
        onSave={(signatureData) => {
          setSignature(signatureData)
          setShowSignatureModal(false)
        }}
        existingSignature={signature}
      />
    </div>
  )
}

export default CompanyWorkerDetailsPage