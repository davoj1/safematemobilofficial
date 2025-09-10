import React, { useState } from 'react'
import { HeaderWithBack } from '../../../components/layout'
import { Button, PrestartCheckItem, Select, Input } from '../../../components/ui'
import type { CheckItemStatus } from '../../../components/ui'

interface CheckItemData {
  status: CheckItemStatus
  comment: string
  photo?: File | null
}

interface VehiclePrestartStep2PageProps {
  walkAroundLeaks?: CheckItemData
  walkAroundDamage?: CheckItemData
  walkAroundPanels?: CheckItemData
  tyresTread?: CheckItemData
  tyresPressure?: CheckItemData
  tyresWheelNuts?: CheckItemData
  lightsHeadlights?: CheckItemData
  lightsIndicators?: CheckItemData
  lightsBrake?: CheckItemData
  lightsReverse?: CheckItemData
  oilLevel?: CheckItemData
  coolantLevel?: CheckItemData
  brakeFluidLevel?: CheckItemData
  fuelLevel?: string
  odometerReading?: string
  lastServiced?: string
  onNext: (data: {
    walkAroundLeaks: CheckItemData
    walkAroundDamage: CheckItemData
    walkAroundPanels: CheckItemData
    tyresTread: CheckItemData
    tyresPressure: CheckItemData
    tyresWheelNuts: CheckItemData
    lightsHeadlights: CheckItemData
    lightsIndicators: CheckItemData
    lightsBrake: CheckItemData
    lightsReverse: CheckItemData
    oilLevel: CheckItemData
    coolantLevel: CheckItemData
    brakeFluidLevel: CheckItemData
    fuelLevel: string
    odometerReading: string
    lastServiced: string
    photos: { [key: string]: File | null }
  }) => void
  onBack: () => void
}

const VehiclePrestartStep2Page: React.FC<VehiclePrestartStep2PageProps> = ({
  walkAroundLeaks = { status: null, comment: '' },
  walkAroundDamage = { status: null, comment: '' },
  walkAroundPanels = { status: null, comment: '' },
  tyresTread = { status: null, comment: '' },
  tyresPressure = { status: null, comment: '' },
  tyresWheelNuts = { status: null, comment: '' },
  lightsHeadlights = { status: null, comment: '' },
  lightsIndicators = { status: null, comment: '' },
  lightsBrake = { status: null, comment: '' },
  lightsReverse = { status: null, comment: '' },
  oilLevel = { status: null, comment: '' },
  coolantLevel = { status: null, comment: '' },
  brakeFluidLevel = { status: null, comment: '' },
  fuelLevel = '',
  odometerReading = '',
  lastServiced = '',
  onNext,
  onBack
}) => {
  const [checkItems, setCheckItems] = useState({
    walkAroundLeaks,
    walkAroundDamage,
    walkAroundPanels,
    tyresTread,
    tyresPressure,
    tyresWheelNuts,
    lightsHeadlights,
    lightsIndicators,
    lightsBrake,
    lightsReverse,
    oilLevel,
    coolantLevel,
    brakeFluidLevel
  })

  const [fuelLevelValue, setFuelLevelValue] = useState(fuelLevel)
  const [odometerReadingValue, setOdometerReadingValue] = useState(odometerReading)
  const [lastServicedValue, setLastServicedValue] = useState(lastServiced)
  const [photos, setPhotos] = useState<{ [key: string]: File | null }>({})

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
    setPhotos(prev => ({
      ...prev,
      [key]: photo
    }))
    
    // Also update the check item with the photo
    setCheckItems(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        photo
      }
    }))
  }

  const handleNext = () => {
    // Check if all required fields are filled
    const allItemsCompleted = Object.values(checkItems).every(item => item.status !== null)
    const allCommentsProvided = Object.values(checkItems).every(item => 
      item.status !== 'not-ok' || (item.status === 'not-ok' && item.comment.trim())
    )

    if (allItemsCompleted && allCommentsProvided && additionalFieldsValid) {
      onNext({
        ...checkItems,
        fuelLevel: fuelLevelValue,
        odometerReading: odometerReadingValue,
        lastServiced: lastServicedValue,
        photos
      })
    }
  }

  // Validation
  const allItemsCompleted = Object.values(checkItems).every(item => item.status !== null)
  const allCommentsProvided = Object.values(checkItems).every(item => 
    item.status !== 'not-ok' || (item.status === 'not-ok' && item.comment.trim())
  )
  const additionalFieldsValid = fuelLevelValue.trim() !== '' && odometerReadingValue.trim() !== '' && lastServicedValue.trim() !== ''
  const isFormValid = allItemsCompleted && allCommentsProvided && additionalFieldsValid

  return (
    <div className="h-screen flex flex-col bg-[#f8f7f2] overflow-hidden">
      {/* Header - Fixed */}
      <HeaderWithBack
        title="Vehicle Pre-Start"
        onBack={onBack}
        progress="2/6"
        className="flex-shrink-0"
      />

      {/* Main Content - Scrollable */}
      <div className="flex-1 px-5 py-3 space-y-6 overflow-y-auto">
        {/* Step Title */}
        <div className="text-center space-y-2">
          <h1 className="font-bold text-[#266273] text-xl leading-7">
            Visual Inspection
          </h1>
          <p className="text-[#667085] text-base font-normal leading-6">
            Complete your walk-around inspection and check tyres and lights
          </p>
        </div>

          {/* Walk-around Inspection */}
          <div className="space-y-4">
            <h2 className="font-semibold text-[#475467] text-base leading-6">
              Walk-around Inspection
            </h2>
            
            <div className="space-y-4">
              <PrestartCheckItem
                title="No leaks"
                status={checkItems.walkAroundLeaks.status}
                comment={checkItems.walkAroundLeaks.comment}
                photo={checkItems.walkAroundLeaks.photo}
                onStatusChange={(status) => updateCheckItem('walkAroundLeaks', status)}
                onCommentChange={(comment) => updateCheckItemComment('walkAroundLeaks', comment)}
                onPhotoAdd={handlePhotoAdd('walkAroundLeaks')}
              />
              
              <PrestartCheckItem
                title="No visible damage"
                status={checkItems.walkAroundDamage.status}
                comment={checkItems.walkAroundDamage.comment}
                photo={checkItems.walkAroundDamage.photo}
                onStatusChange={(status) => updateCheckItem('walkAroundDamage', status)}
                onCommentChange={(comment) => updateCheckItemComment('walkAroundDamage', comment)}
                onPhotoAdd={handlePhotoAdd('walkAroundDamage')}
              />
              
              <PrestartCheckItem
                title="Panels and fittings secure"
                status={checkItems.walkAroundPanels.status}
                comment={checkItems.walkAroundPanels.comment}
                photo={checkItems.walkAroundPanels.photo}
                onStatusChange={(status) => updateCheckItem('walkAroundPanels', status)}
                onCommentChange={(comment) => updateCheckItemComment('walkAroundPanels', comment)}
                onPhotoAdd={handlePhotoAdd('walkAroundPanels')}
              />
            </div>
          </div>

          {/* Separator */}
          <div className="border-t border-[#eaecf0]"></div>

          {/* Tyres */}
          <div className="space-y-4">
            <h2 className="font-semibold text-[#475467] text-base leading-6">
              Tyres
            </h2>
            
            <div className="space-y-4">
              <PrestartCheckItem
                title="Tread condition"
                status={checkItems.tyresTread.status}
                comment={checkItems.tyresTread.comment}
                photo={checkItems.tyresTread.photo}
                onStatusChange={(status) => updateCheckItem('tyresTread', status)}
                onCommentChange={(comment) => updateCheckItemComment('tyresTread', comment)}
                onPhotoAdd={handlePhotoAdd('tyresTread')}
              />
              
              <PrestartCheckItem
                title="Tyre pressure"
                status={checkItems.tyresPressure.status}
                comment={checkItems.tyresPressure.comment}
                photo={checkItems.tyresPressure.photo}
                onStatusChange={(status) => updateCheckItem('tyresPressure', status)}
                onCommentChange={(comment) => updateCheckItemComment('tyresPressure', comment)}
                onPhotoAdd={handlePhotoAdd('tyresPressure')}
              />
              
              <PrestartCheckItem
                title="Wheel nuts tight"
                status={checkItems.tyresWheelNuts.status}
                comment={checkItems.tyresWheelNuts.comment}
                photo={checkItems.tyresWheelNuts.photo}
                onStatusChange={(status) => updateCheckItem('tyresWheelNuts', status)}
                onCommentChange={(comment) => updateCheckItemComment('tyresWheelNuts', comment)}
                onPhotoAdd={handlePhotoAdd('tyresWheelNuts')}
              />
            </div>
          </div>

          {/* Separator */}
          <div className="border-t border-[#eaecf0]"></div>

          {/* Lights */}
          <div className="space-y-4">
            <h2 className="font-semibold text-[#475467] text-base leading-6">
              Lights
            </h2>
            
            <div className="space-y-4">
              <PrestartCheckItem
                title="Headlights"
                status={checkItems.lightsHeadlights.status}
                comment={checkItems.lightsHeadlights.comment}
                photo={checkItems.lightsHeadlights.photo}
                onStatusChange={(status) => updateCheckItem('lightsHeadlights', status)}
                onCommentChange={(comment) => updateCheckItemComment('lightsHeadlights', comment)}
                onPhotoAdd={handlePhotoAdd('lightsHeadlights')}
              />
              
              <PrestartCheckItem
                title="Indicators"
                status={checkItems.lightsIndicators.status}
                comment={checkItems.lightsIndicators.comment}
                photo={checkItems.lightsIndicators.photo}
                onStatusChange={(status) => updateCheckItem('lightsIndicators', status)}
                onCommentChange={(comment) => updateCheckItemComment('lightsIndicators', comment)}
                onPhotoAdd={handlePhotoAdd('lightsIndicators')}
              />
              
              <PrestartCheckItem
                title="Brake lights"
                status={checkItems.lightsBrake.status}
                comment={checkItems.lightsBrake.comment}
                photo={checkItems.lightsBrake.photo}
                onStatusChange={(status) => updateCheckItem('lightsBrake', status)}
                onCommentChange={(comment) => updateCheckItemComment('lightsBrake', comment)}
                onPhotoAdd={handlePhotoAdd('lightsBrake')}
              />
              
              <PrestartCheckItem
                title="Reverse lights"
                status={checkItems.lightsReverse.status}
                comment={checkItems.lightsReverse.comment}
                photo={checkItems.lightsReverse.photo}
                onStatusChange={(status) => updateCheckItem('lightsReverse', status)}
                onCommentChange={(comment) => updateCheckItemComment('lightsReverse', comment)}
                onPhotoAdd={handlePhotoAdd('lightsReverse')}
              />
            </div>
          </div>

          {/* Separator */}
          <div className="border-t border-[#eaecf0]"></div>

          {/* Fluid & Service Checks */}
          <div className="space-y-4">
            <h2 className="font-semibold text-[#475467] text-base leading-6">
              Fluid & Service Checks
            </h2>
            
            <div className="space-y-4">
              <PrestartCheckItem
                title="Oil level check"
                status={checkItems.oilLevel.status}
                comment={checkItems.oilLevel.comment}
                photo={checkItems.oilLevel.photo}
                onStatusChange={(status) => updateCheckItem('oilLevel', status)}
                onCommentChange={(comment) => updateCheckItemComment('oilLevel', comment)}
                onPhotoAdd={handlePhotoAdd('oilLevel')}
              />
              
              <PrestartCheckItem
                title="Coolant level check"
                status={checkItems.coolantLevel.status}
                comment={checkItems.coolantLevel.comment}
                photo={checkItems.coolantLevel.photo}
                onStatusChange={(status) => updateCheckItem('coolantLevel', status)}
                onCommentChange={(comment) => updateCheckItemComment('coolantLevel', comment)}
                onPhotoAdd={handlePhotoAdd('coolantLevel')}
              />
              
              <PrestartCheckItem
                title="Brake fluid level check"
                status={checkItems.brakeFluidLevel.status}
                comment={checkItems.brakeFluidLevel.comment}
                photo={checkItems.brakeFluidLevel.photo}
                onStatusChange={(status) => updateCheckItem('brakeFluidLevel', status)}
                onCommentChange={(comment) => updateCheckItemComment('brakeFluidLevel', comment)}
                onPhotoAdd={handlePhotoAdd('brakeFluidLevel')}
              />

              {/* Fuel Level */}
              <div className="space-y-1.5">
                <label className="font-medium text-[#344054] text-xs leading-4">
                  Fuel Level *
                </label>
                <Select
                  value={fuelLevelValue}
                  onChange={setFuelLevelValue}
                  placeholder="Select fuel level"
                  options={[
                    { value: 'empty', label: 'Empty' },
                    { value: 'quarter', label: '¼' },
                    { value: 'half', label: '½' },
                    { value: 'three-quarter', label: '¾' },
                    { value: 'full', label: 'Full' }
                  ]}
                />
              </div>

              {/* Odometer Reading */}
              <div className="space-y-1.5">
                <label className="font-medium text-[#344054] text-xs leading-4">
                  Odometer Reading *
                </label>
                <Input
                  type="number"
                  value={odometerReadingValue}
                  onChange={(e) => setOdometerReadingValue(e.target.value)}
                  placeholder="Enter odometer reading"
                />
              </div>

              {/* Last Serviced */}
              <div className="space-y-1.5">
                <label className="font-medium text-[#344054] text-xs leading-4">
                  Last Serviced *
                </label>
                <Input
                  type="date"
                  value={lastServicedValue}
                  onChange={(e) => setLastServicedValue(e.target.value)}
                  placeholder="Select date"
                />
              </div>
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

export default VehiclePrestartStep2Page
