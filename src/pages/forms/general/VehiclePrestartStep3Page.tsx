import React, { useState } from 'react'
import { HeaderWithBack } from '../../../components/layout'
import { Button, PrestartCheckItem } from '../../../components/ui'
import type { CheckItemStatus } from '../../../components/ui'

interface CheckItemData {
  status: CheckItemStatus
  comment: string
}

interface VehiclePrestartStep3PageProps {
  hornOperational?: CheckItemData
  reverseBeeperOperational?: CheckItemData
  seatbeltsOperational?: CheckItemData
  brakesFootBrake?: CheckItemData
  brakesHandbrake?: CheckItemData
  windscreenCondition?: CheckItemData
  mirrorsCondition?: CheckItemData
  wipersOperational?: CheckItemData
  washerFluidFunctional?: CheckItemData
  onNext: (data: {
    hornOperational: CheckItemData
    reverseBeeperOperational: CheckItemData
    seatbeltsOperational: CheckItemData
    brakesFootBrake: CheckItemData
    brakesHandbrake: CheckItemData
    windscreenCondition: CheckItemData
    mirrorsCondition: CheckItemData
    wipersOperational: CheckItemData
    washerFluidFunctional: CheckItemData
  }) => void
  onBack: () => void
}

const VehiclePrestartStep3Page: React.FC<VehiclePrestartStep3PageProps> = ({
  hornOperational = { status: null, comment: '' },
  reverseBeeperOperational = { status: null, comment: '' },
  seatbeltsOperational = { status: null, comment: '' },
  brakesFootBrake = { status: null, comment: '' },
  brakesHandbrake = { status: null, comment: '' },
  windscreenCondition = { status: null, comment: '' },
  mirrorsCondition = { status: null, comment: '' },
  wipersOperational = { status: null, comment: '' },
  washerFluidFunctional = { status: null, comment: '' },
  onNext,
  onBack
}) => {
  const [checkItems, setCheckItems] = useState({
    hornOperational,
    reverseBeeperOperational,
    seatbeltsOperational,
    brakesFootBrake,
    brakesHandbrake,
    windscreenCondition,
    mirrorsCondition,
    wipersOperational,
    washerFluidFunctional
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
        progress="3/6"
        className="flex-shrink-0"
      />

      {/* Main Content - Scrollable */}
      <div className="flex-1 px-5 py-3 space-y-6 overflow-y-auto">
          {/* Step Title */}
          <div className="text-center space-y-2">
            <h1 className="font-bold text-[#266273] text-xl leading-7">
              Operational Checks
            </h1>
            <p className="text-[#667085] text-base font-normal leading-6">
              Test operational systems and check fluid levels
            </p>
          </div>

          {/* Operational Systems */}
          <div className="space-y-4">
            <h2 className="font-semibold text-[#475467] text-base leading-6">
              Operational Systems
            </h2>
            
            <div className="space-y-4">
              <PrestartCheckItem
                title="Horn operational"
                status={checkItems.hornOperational.status}
                comment={checkItems.hornOperational.comment}
                onStatusChange={(status) => updateCheckItem('hornOperational', status)}
                onCommentChange={(comment) => updateCheckItemComment('hornOperational', comment)}
                onPhotoAdd={handlePhotoAdd('hornOperational')}
              />
              
              <PrestartCheckItem
                title="Reverse beeper operational"
                status={checkItems.reverseBeeperOperational.status}
                comment={checkItems.reverseBeeperOperational.comment}
                onStatusChange={(status) => updateCheckItem('reverseBeeperOperational', status)}
                onCommentChange={(comment) => updateCheckItemComment('reverseBeeperOperational', comment)}
                onPhotoAdd={handlePhotoAdd('reverseBeeperOperational')}
              />
              
              <PrestartCheckItem
                title="Seatbelts operational"
                status={checkItems.seatbeltsOperational.status}
                comment={checkItems.seatbeltsOperational.comment}
                onStatusChange={(status) => updateCheckItem('seatbeltsOperational', status)}
                onCommentChange={(comment) => updateCheckItemComment('seatbeltsOperational', comment)}
                onPhotoAdd={handlePhotoAdd('seatbeltsOperational')}
              />
            </div>
          </div>

          {/* Separator */}
          <div className="border-t border-[#eaecf0]"></div>

          {/* Brakes */}
          <div className="space-y-4">
            <h2 className="font-semibold text-[#475467] text-base leading-6">
              Brakes
            </h2>
            
            <div className="space-y-4">
              <PrestartCheckItem
                title="Foot brake"
                status={checkItems.brakesFootBrake.status}
                comment={checkItems.brakesFootBrake.comment}
                onStatusChange={(status) => updateCheckItem('brakesFootBrake', status)}
                onCommentChange={(comment) => updateCheckItemComment('brakesFootBrake', comment)}
                onPhotoAdd={handlePhotoAdd('brakesFootBrake')}
              />
              
              <PrestartCheckItem
                title="Handbrake"
                status={checkItems.brakesHandbrake.status}
                comment={checkItems.brakesHandbrake.comment}
                onStatusChange={(status) => updateCheckItem('brakesHandbrake', status)}
                onCommentChange={(comment) => updateCheckItemComment('brakesHandbrake', comment)}
                onPhotoAdd={handlePhotoAdd('brakesHandbrake')}
              />
            </div>
          </div>

          {/* Separator */}
          <div className="border-t border-[#eaecf0]"></div>

          {/* Visibility */}
          <div className="space-y-4">
            <h2 className="font-semibold text-[#475467] text-base leading-6">
              Visibility
            </h2>
            
            <div className="space-y-4">
              <PrestartCheckItem
                title="Windscreen – no cracks or chips"
                status={checkItems.windscreenCondition.status}
                comment={checkItems.windscreenCondition.comment}
                onStatusChange={(status) => updateCheckItem('windscreenCondition', status)}
                onCommentChange={(comment) => updateCheckItemComment('windscreenCondition', comment)}
                onPhotoAdd={handlePhotoAdd('windscreenCondition')}
              />
              
              <PrestartCheckItem
                title="Mirrors – clean and undamaged"
                status={checkItems.mirrorsCondition.status}
                comment={checkItems.mirrorsCondition.comment}
                onStatusChange={(status) => updateCheckItem('mirrorsCondition', status)}
                onCommentChange={(comment) => updateCheckItemComment('mirrorsCondition', comment)}
                onPhotoAdd={handlePhotoAdd('mirrorsCondition')}
              />
              
              <PrestartCheckItem
                title="Wipers operational"
                status={checkItems.wipersOperational.status}
                comment={checkItems.wipersOperational.comment}
                onStatusChange={(status) => updateCheckItem('wipersOperational', status)}
                onCommentChange={(comment) => updateCheckItemComment('wipersOperational', comment)}
                onPhotoAdd={handlePhotoAdd('wipersOperational')}
              />
              
              <PrestartCheckItem
                title="Washer fluid functional"
                status={checkItems.washerFluidFunctional.status}
                comment={checkItems.washerFluidFunctional.comment}
                onStatusChange={(status) => updateCheckItem('washerFluidFunctional', status)}
                onCommentChange={(comment) => updateCheckItemComment('washerFluidFunctional', comment)}
                onPhotoAdd={handlePhotoAdd('washerFluidFunctional')}
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

export default VehiclePrestartStep3Page
