import React, { useState } from 'react'
import { HeaderWithBack } from '../../../components/layout'
import { Button, Input, Select } from '../../../components/ui'

interface VehiclePrestartStep1PageProps {
  licensePlate?: string
  assetNumber?: string
  vehicleType?: string
  onNext: (licensePlate: string, assetNumber: string, vehicleType: string) => void
  onBack: () => void
}

const VehiclePrestartStep1Page: React.FC<VehiclePrestartStep1PageProps> = ({
  licensePlate = '',
  assetNumber = '',
  vehicleType = '',
  onNext,
  onBack
}) => {
  const [currentLicensePlate, setCurrentLicensePlate] = useState(licensePlate)
  const [currentAssetNumber, setCurrentAssetNumber] = useState(assetNumber)
  const [currentVehicleType, setCurrentVehicleType] = useState(vehicleType)

  const vehicleTypeOptions = [
    { value: 'light-vehicle', label: 'Light Vehicle' },
    { value: 'heavy-vehicle', label: 'Heavy Vehicle', disabled: true, comingSoon: true },
    { value: 'bus', label: 'Bus', disabled: true, comingSoon: true },
    { value: 'truck', label: 'Truck', disabled: true, comingSoon: true },
    { value: 'van', label: 'Van', disabled: true, comingSoon: true },
    { value: 'utility', label: 'Utility', disabled: true, comingSoon: true },
    { value: 'forklift', label: 'Forklift', disabled: true, comingSoon: true },
    { value: 'crane', label: 'Crane', disabled: true, comingSoon: true },
    { value: 'excavator', label: 'Excavator', disabled: true, comingSoon: true },
    { value: 'other', label: 'Other', disabled: true, comingSoon: true }
  ]

  const handleNext = () => {
    if (currentLicensePlate.trim() && currentAssetNumber.trim() && currentVehicleType) {
      onNext(currentLicensePlate.trim(), currentAssetNumber.trim(), currentVehicleType)
    }
  }

  const isFormValid = currentLicensePlate.trim() && currentAssetNumber.trim() && currentVehicleType

  return (
    <div className="min-h-screen bg-[#f8f7f2] flex flex-col">
      {/* Header */}
      <HeaderWithBack
        title="Vehicle Pre-Start"
        onBack={onBack}
        progress="1/6"
      />

      {/* Content */}
      <div className="flex-1 px-5 py-3 flex flex-col justify-between">
        {/* Form Section */}
        <div className="space-y-6">
          {/* Step Title */}
          <div className="text-center space-y-2">
            <h1 className="font-bold text-[#266273] text-xl leading-7">
              Vehicle Details
            </h1>
            <p className="text-[#667085] text-base font-normal leading-6">
              Enter the basic vehicle information to begin your pre-start inspection
            </p>
          </div>

          {/* Form Fields */}
          <div className="space-y-5">
            {/* License Plate */}
            <div className="space-y-1.5">
              <label className="font-medium text-[#344054] text-sm leading-5">
                License Plate *
              </label>
              <Input
                placeholder="Enter license plate number"
                value={currentLicensePlate}
                onChange={(e) => setCurrentLicensePlate(e.target.value)}
                className="bg-white border-[#d5d7da] rounded-xl px-3.5 py-3 text-base"
              />
            </div>

            {/* Asset Number */}
            <div className="space-y-1.5">
              <label className="font-medium text-[#344054] text-sm leading-5">
                Asset Number *
              </label>
              <Input
                placeholder="Enter asset number"
                value={currentAssetNumber}
                onChange={(e) => setCurrentAssetNumber(e.target.value)}
                className="bg-white border-[#d5d7da] rounded-xl px-3.5 py-3 text-base"
              />
            </div>

            {/* Vehicle Type */}
            <div className="space-y-1.5">
              <label className="font-medium text-[#344054] text-sm leading-5">
                Vehicle Type *
              </label>
              <Select
                placeholder="Select vehicle type"
                value={currentVehicleType}
                onChange={setCurrentVehicleType}
                options={vehicleTypeOptions}
                className="text-base"
              />
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="pt-6">
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
    </div>
  )
}

export default VehiclePrestartStep1Page
