import React from 'react'
import { Button } from '../../../components/ui'

interface VehiclePrestartSuccessPageProps {
  formData?: {
    licensePlate?: string
    assetNumber?: string
    vehicleType?: string
    fuelLevel?: string
    odometerReading?: string
    lastServiced?: string
    companyName?: string
    workerName?: string
  }
  onContinue: () => void
}

const VehiclePrestartSuccessPage: React.FC<VehiclePrestartSuccessPageProps> = ({
  formData,
  onContinue
}) => {
  return (
    <div className="h-screen flex flex-col bg-[#f8f7f2] overflow-hidden">

      {/* Content */}
      <div className="flex-1 flex flex-col px-5 py-8 overflow-y-auto">
        {/* Success Section */}
        <div className="text-center space-y-6 max-w-sm mx-auto mb-8">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-[#22c55e] rounded-full flex items-center justify-center mx-auto">
            <span className="text-white text-3xl font-bold">✓</span>
          </div>

          {/* Success Message */}
          <div className="space-y-3">
            <h1 className="font-bold text-[#266273] text-2xl leading-8">
              Vehicle Pre-Start Complete!
            </h1>
            <p className="text-[#667085] text-base font-normal leading-6">
              Your vehicle pre-start inspection has been successfully submitted and recorded.
            </p>
          </div>
        </div>

        {/* Form Review Section */}
        <div className="space-y-4 max-w-md mx-auto w-full">
          {/* Vehicle Information */}
          <div className="bg-white rounded-xl border border-[#d0d5dd] p-4">
            <h3 className="font-semibold text-[#101828] text-sm mb-3">
              Vehicle Information
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-[#667085]">License Plate:</span>
                <span className="text-sm text-[#101828] font-medium">{formData?.licensePlate || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#667085]">Asset Number:</span>
                <span className="text-sm text-[#101828] font-medium">{formData?.assetNumber || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#667085]">Vehicle Type:</span>
                <span className="text-sm text-[#101828] font-medium">{formData?.vehicleType || 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Service Information */}
          <div className="bg-white rounded-xl border border-[#d0d5dd] p-4">
            <h3 className="font-semibold text-[#101828] text-sm mb-3">
              Service Information
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-[#667085]">Fuel Level:</span>
                <span className="text-sm text-[#101828] font-medium">{formData?.fuelLevel || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#667085]">Odometer:</span>
                <span className="text-sm text-[#101828] font-medium">{formData?.odometerReading || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#667085]">Last Serviced:</span>
                <span className="text-sm text-[#101828] font-medium">{formData?.lastServiced || 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Worker Information */}
          <div className="bg-white rounded-xl border border-[#d0d5dd] p-4">
            <h3 className="font-semibold text-[#101828] text-sm mb-3">
              Worker Information
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-[#667085]">Company:</span>
                <span className="text-sm text-[#101828] font-medium">{formData?.companyName || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#667085]">Worker:</span>
                <span className="text-sm text-[#101828] font-medium">{formData?.workerName || 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Status Information */}
          <div className="bg-[#edfcf2] border border-[#84e1bc] rounded-xl p-4">
            <h3 className="font-semibold text-[#084c61] text-sm mb-2">
              Inspection Status
            </h3>
            <ul className="text-sm text-[#065f46] space-y-1">
              <li>• Vehicle inspection completed successfully</li>
              <li>• All safety checks verified</li>
              <li>• Vehicle approved for operation</li>
              <li>• Report logged in system</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="px-5 pb-8 pt-4">
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={onContinue}
        >
          Return to Forms
        </Button>
      </div>
    </div>
  )
}

export default VehiclePrestartSuccessPage
