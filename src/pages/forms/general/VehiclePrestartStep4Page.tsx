import React, { useState } from 'react'
import { HeaderWithBack } from '../../../components/layout'
import { Button, PrestartCheckItem } from '../../../components/ui'
import type { CheckItemStatus } from '../../../components/ui'

interface CheckItemData {
  status: CheckItemStatus
  comment: string
}

interface VehiclePrestartStep4PageProps {
  firstAidKitPresent?: CheckItemData
  firstAidKitExpiry?: CheckItemData
  fireExtinguisherPresent?: CheckItemData
  fireExtinguisherPressure?: CheckItemData
  radioCommunicationOperational?: CheckItemData
  vehicleIdPlateVisible?: CheckItemData
  onNext: (data: {
    firstAidKitPresent: CheckItemData
    firstAidKitExpiry: CheckItemData
    fireExtinguisherPresent: CheckItemData
    fireExtinguisherPressure: CheckItemData
    radioCommunicationOperational: CheckItemData
    vehicleIdPlateVisible: CheckItemData
  }) => void
  onBack: () => void
}

const VehiclePrestartStep4Page: React.FC<VehiclePrestartStep4PageProps> = ({
  firstAidKitPresent = { status: null, comment: '' },
  firstAidKitExpiry = { status: null, comment: '' },
  fireExtinguisherPresent = { status: null, comment: '' },
  fireExtinguisherPressure = { status: null, comment: '' },
  radioCommunicationOperational = { status: null, comment: '' },
  vehicleIdPlateVisible = { status: null, comment: '' },
  onNext,
  onBack
}) => {
  const [checkItems, setCheckItems] = useState({
    firstAidKitPresent,
    firstAidKitExpiry,
    fireExtinguisherPresent,
    fireExtinguisherPressure,
    radioCommunicationOperational,
    vehicleIdPlateVisible
  })


  const updateCheckItem = (key: keyof typeof checkItems, status: CheckItemStatus, comment?: string) => {
    setCheckItems(prev => ({
      ...prev,
      [key]: {
        status,
        comment: comment !== undefined ? comment : (status === 'not-ok' ? prev[key].comment : '')
      }
    }))
  }

  const updateCheckItemComment = (key: keyof typeof checkItems, comment: string) => {
    setCheckItems(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        comment
      }
    }))
  }

  const handlePhotoAdd = (key: keyof typeof checkItems) => (photo: File) => {
    // Photo handling is managed by the FileUpload component
    // No state management needed here
  }

  const handleNext = () => {
    // Check if all required fields are filled
    const allItemsCompleted = Object.values(checkItems).every(item => item.status !== null)
    const allCommentsProvided = Object.values(checkItems).every(item => 
      item.status !== 'not-ok' || (item.status === 'not-ok' && item.comment.trim())
    )

    if (allItemsCompleted && allCommentsProvided) {
      onNext(checkItems)
    }
  }

  // Validation
  const allItemsCompleted = Object.values(checkItems).every(item => item.status !== null)
  const allCommentsProvided = Object.values(checkItems).every(item => 
    item.status !== 'not-ok' || (item.status === 'not-ok' && item.comment.trim())
  )
  const isFormValid = allItemsCompleted && allCommentsProvided

  return (
    <div className="h-screen flex flex-col bg-[#f8f7f2] overflow-hidden">
      {/* Header - Fixed */}
      <HeaderWithBack
        title="Vehicle Pre-Start"
        onBack={onBack}
        progress="4/6"
        className="flex-shrink-0"
      />

      {/* Main Content - Scrollable */}
      <div className="flex-1 px-5 py-3 space-y-6 overflow-y-auto">
          {/* Step Title */}
          <div className="text-center space-y-2">
            <h1 className="font-bold text-[#266273] text-xl leading-7">
              Safety Equipment
            </h1>
            <p className="text-[#667085] text-base font-normal leading-6">
              Check safety equipment, communication systems and fuel level
            </p>
          </div>

          {/* Safety Equipment */}
          <div className="space-y-4">
            <h2 className="font-semibold text-[#475467] text-base leading-6">
              Safety Equipment
            </h2>
            
            <div className="space-y-4">
              <PrestartCheckItem
                title="First aid kit present"
                status={checkItems.firstAidKitPresent.status}
                comment={checkItems.firstAidKitPresent.comment}
                onStatusChange={(status) => updateCheckItem('firstAidKitPresent', status)}
                onCommentChange={(comment) => updateCheckItemComment('firstAidKitPresent', comment)}
                onPhotoAdd={handlePhotoAdd('firstAidKitPresent')}
              />
              
              <PrestartCheckItem
                title="First aid kit expiry check"
                status={checkItems.firstAidKitExpiry.status}
                comment={checkItems.firstAidKitExpiry.comment}
                onStatusChange={(status) => updateCheckItem('firstAidKitExpiry', status)}
                onCommentChange={(comment) => updateCheckItemComment('firstAidKitExpiry', comment)}
                onPhotoAdd={handlePhotoAdd('firstAidKitExpiry')}
              />
              
              <PrestartCheckItem
                title="Fire extinguisher present"
                status={checkItems.fireExtinguisherPresent.status}
                comment={checkItems.fireExtinguisherPresent.comment}
                onStatusChange={(status) => updateCheckItem('fireExtinguisherPresent', status)}
                onCommentChange={(comment) => updateCheckItemComment('fireExtinguisherPresent', comment)}
                onPhotoAdd={handlePhotoAdd('fireExtinguisherPresent')}
              />
              
              <PrestartCheckItem
                title="Fire extinguisher pressure gauge check"
                status={checkItems.fireExtinguisherPressure.status}
                comment={checkItems.fireExtinguisherPressure.comment}
                onStatusChange={(status) => updateCheckItem('fireExtinguisherPressure', status)}
                onCommentChange={(comment) => updateCheckItemComment('fireExtinguisherPressure', comment)}
                onPhotoAdd={handlePhotoAdd('fireExtinguisherPressure')}
              />
            </div>
          </div>

          {/* Separator */}
          <div className="border-t border-[#eaecf0]"></div>

          {/* Communication */}
          <div className="space-y-4">
            <h2 className="font-semibold text-[#475467] text-base leading-6">
              Communication
            </h2>
            
            <div className="space-y-4">
              <PrestartCheckItem
                title="Radio/communication system operational"
                status={checkItems.radioCommunicationOperational.status}
                comment={checkItems.radioCommunicationOperational.comment}
                onStatusChange={(status) => updateCheckItem('radioCommunicationOperational', status)}
                onCommentChange={(comment) => updateCheckItemComment('radioCommunicationOperational', comment)}
                onPhotoAdd={handlePhotoAdd('radioCommunicationOperational')}
              />
            </div>
          </div>

          {/* Separator */}
          <div className="border-t border-[#eaecf0]"></div>

          {/* Identification */}
          <div className="space-y-4">
            <h2 className="font-semibold text-[#475467] text-base leading-6">
              Vehicle Identification
            </h2>
            
            <div className="space-y-4">
              <PrestartCheckItem
                title="Vehicle ID/rego plate clear and legible"
                status={checkItems.vehicleIdPlateVisible.status}
                comment={checkItems.vehicleIdPlateVisible.comment}
                onStatusChange={(status) => updateCheckItem('vehicleIdPlateVisible', status)}
                onCommentChange={(comment) => updateCheckItemComment('vehicleIdPlateVisible', comment)}
                onPhotoAdd={handlePhotoAdd('vehicleIdPlateVisible')}
              />
            </div>
          </div>

        </div>

      {/* Bottom Navigation - Fixed */}
      <div className="flex-shrink-0 px-5 py-4 bg-[#f8f7f2] border-t border-gray-200">
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={handleNext}
          disabled={!isFormValid}
        >
          Continue
        </Button>
      </div>
    </div>
  )
}

export default VehiclePrestartStep4Page
