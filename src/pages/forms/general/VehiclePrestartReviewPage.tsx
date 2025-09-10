import React, { useState } from 'react'
import { HeaderWithBack } from '../../../components/layout'
import { Button } from '../../../components/ui'
import safemateLogo from '../../../assets/safemateshieldlogo.svg'
import goodSmileIcon from '../../../assets/takecontrol/goodsmileicon.svg'
import moderateIcon from '../../../assets/takecontrol/morerateicon.svg'
import flaggedIcon from '../../../assets/takecontrol/flaggedicon.svg'

interface VehiclePrestartReviewPageProps {
  onBack?: () => void
  onSubmit?: () => void
  formData?: {
    licensePlate?: string
    assetNumber?: string
    vehicleType?: string
    step2Data?: {
      walkAroundLeaks: { status: 'ok' | 'not-ok' | 'na' | null, comment: string, photo?: File | null }
      walkAroundDamage: { status: 'ok' | 'not-ok' | 'na' | null, comment: string, photo?: File | null }
      walkAroundPanels: { status: 'ok' | 'not-ok' | 'na' | null, comment: string, photo?: File | null }
      tyresTread: { status: 'ok' | 'not-ok' | 'na' | null, comment: string, photo?: File | null }
      tyresPressure: { status: 'ok' | 'not-ok' | 'na' | null, comment: string, photo?: File | null }
      tyresWheelNuts: { status: 'ok' | 'not-ok' | 'na' | null, comment: string, photo?: File | null }
      lightsHeadlights: { status: 'ok' | 'not-ok' | 'na' | null, comment: string, photo?: File | null }
      lightsIndicators: { status: 'ok' | 'not-ok' | 'na' | null, comment: string, photo?: File | null }
      lightsBrake: { status: 'ok' | 'not-ok' | 'na' | null, comment: string, photo?: File | null }
      lightsReverse: { status: 'ok' | 'not-ok' | 'na' | null, comment: string, photo?: File | null }
      oilLevel: { status: 'ok' | 'not-ok' | 'na' | null, comment: string, photo?: File | null }
      coolantLevel: { status: 'ok' | 'not-ok' | 'na' | null, comment: string, photo?: File | null }
      brakeFluidLevel: { status: 'ok' | 'not-ok' | 'na' | null, comment: string, photo?: File | null }
      fuelLevel: string
      odometerReading: string
      lastServiced: string
      photos: { [key: string]: File | null }
    }
    selectedCompany?: string
    otherCompany?: string
    firstName?: string
    lastName?: string
    signature?: string
  }
}

const VehiclePrestartReviewPage: React.FC<VehiclePrestartReviewPageProps> = ({
  onBack,
  onSubmit,
  formData
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    // Simulate form submission with a delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    onSubmit?.()
  }

  // Calculate status based on "not-ok" answers
  const getFormStatus = () => {
    if (!formData?.step2Data) {
      return {
        type: 'good',
        title: 'Everything looks great',
        message: "Your form has been reviewed and marked as safe. You're good to go! ✅",
        bgColor: 'bg-[#edfcf2]',
        borderColor: 'border-[#73e2a3]',
        tagColor: 'bg-[#17b26a]',
        icon: goodSmileIcon
      }
    }

    const step2Data = formData.step2Data
    const checkItems = [
      step2Data.walkAroundLeaks,
      step2Data.walkAroundDamage,
      step2Data.walkAroundPanels,
      step2Data.tyresTread,
      step2Data.tyresPressure,
      step2Data.tyresWheelNuts,
      step2Data.lightsHeadlights,
      step2Data.lightsIndicators,
      step2Data.lightsBrake,
      step2Data.lightsReverse,
      step2Data.oilLevel,
      step2Data.coolantLevel,
      step2Data.brakeFluidLevel
    ]

    // Count the number of "not-ok" answers
    const notOkAnswers = checkItems.filter(item => item.status === 'not-ok').length

    if (notOkAnswers === 0) {
      return {
        type: 'good',
        title: 'Everything looks great',
        message: "Your vehicle prestart has been reviewed and marked as safe. You're good to go! ✅",
        bgColor: 'bg-[#edfcf2]',
        borderColor: 'border-[#73e2a3]',
        tagColor: 'bg-[#17b26a]',
        icon: goodSmileIcon
      }
    } else if (notOkAnswers === 1) {
      return {
        type: 'moderate',
        title: 'Moderate concerns identified',
        message: "Your vehicle prestart has been reviewed with some concerns. Please address the issues before proceeding. ⚠️",
        bgColor: 'bg-[#fef7e6]',
        borderColor: 'border-[#f4b942]',
        tagColor: 'bg-[#f4b942]',
        icon: moderateIcon
      }
    } else {
      return {
        type: 'flagged',
        title: 'Multiple issues identified',
        message: "Your vehicle prestart has been flagged with multiple concerns. Please address all issues before proceeding. 🚨",
        bgColor: 'bg-[#fef2f2]',
        borderColor: 'border-[#f87171]',
        tagColor: 'bg-[#f87171]',
        icon: flaggedIcon
      }
    }
  }

  const status = getFormStatus()

  // Get status display for individual items
  const getStatusDisplay = (itemStatus: 'ok' | 'not-ok' | 'na' | null) => {
    switch (itemStatus) {
      case 'ok':
        return <span className="text-[#17b26a] font-semibold">✓ OK</span>
      case 'not-ok':
        return <span className="text-[#ff4405] font-semibold">✗ Not OK</span>
      case 'na':
        return <span className="text-[#266273] font-semibold">N/A</span>
      default:
        return <span className="text-[#667085]">—</span>
    }
  }

  return (
    <div className="h-screen flex flex-col bg-[#f8f7f2] overflow-hidden">
      {/* Header - Fixed */}
      <HeaderWithBack
        title="Form Detail"
        onBack={onBack}
        progress="6/6"
        className="flex-shrink-0"
      />

      {/* Content - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-5 py-3 space-y-6">
          {/* Form ID */}
          <div className="flex justify-between items-center">
            <h1 className="text-[#101828] text-xl font-bold leading-7">Form Detail</h1>
            <span className="text-[#667085] text-sm font-medium leading-5">#VP001</span>
          </div>

          {/* Status Card */}
          <div className={`${status.bgColor} ${status.borderColor} border rounded-2xl p-4`}>
            <div className="flex items-center gap-3">
              <img src={status.icon} alt={status.type} className="w-8 h-8" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-[#101828] text-base font-semibold leading-6">{status.title}</h3>
                  <span className={`${status.tagColor} text-white text-xs font-medium px-2 py-1 rounded-full`}>
                    {status.type.toUpperCase()}
                  </span>
                </div>
                <p className="text-[#667085] text-sm font-normal leading-5">{status.message}</p>
              </div>
            </div>
          </div>

          {/* Vehicle Information */}
          <div className="bg-white rounded-2xl border border-[#eaecf0] p-4">
            <h2 className="text-[#344054] text-base font-semibold leading-6 mb-4">Vehicle Information</h2>
            
            <div className="space-y-4">
              {/* Mine Company Info */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 bg-[#266273] rounded-lg flex items-center justify-center">
                    <img src={safemateLogo} alt="SafeMate" className="w-6 h-6" />
                  </div>
                  <span className="text-[#101828] text-sm font-medium leading-5">SafeMate</span>
                </div>

                {/* Vehicle Details */}
                <div className="flex flex-col gap-1">
                  <div className="text-[#344054] text-sm font-medium leading-5">License Plate</div>
                  <div className="text-[#101828] text-base font-semibold leading-6">
                    {formData?.licensePlate || '— — —'}
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="text-[#344054] text-sm font-medium leading-5">Asset Number</div>
                  <div className="text-[#101828] text-base font-semibold leading-6">
                    {formData?.assetNumber || '— — —'}
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="text-[#344054] text-sm font-medium leading-5">Vehicle Type</div>
                  <div className="text-[#101828] text-base font-semibold leading-6">
                    {formData?.vehicleType ? formData.vehicleType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) : '— — —'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Inspection Results */}
          {formData?.step2Data && (
            <div className="bg-white rounded-2xl border border-[#eaecf0] p-4">
              <h2 className="text-[#344054] text-base font-semibold leading-6 mb-4">Inspection Results</h2>
              
              <div className="space-y-4">
                {/* Walk-around Inspection */}
                <div>
                  <h3 className="text-[#475467] text-sm font-semibold leading-5 mb-3">Walk-around Inspection</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[#344054] text-sm font-medium leading-5">No leaks</span>
                      {getStatusDisplay(formData.step2Data.walkAroundLeaks.status)}
                    </div>
                    {formData.step2Data.walkAroundLeaks.status === 'not-ok' && (
                      <div className="ml-4 space-y-2">
                        {formData.step2Data.walkAroundLeaks.comment && (
                          <p className="text-[#667085] text-sm leading-5">{formData.step2Data.walkAroundLeaks.comment}</p>
                        )}
                        {formData.step2Data.walkAroundLeaks.photo && (
                          <img
                            src={URL.createObjectURL(formData.step2Data.walkAroundLeaks.photo)}
                            alt="Issue photo"
                            className="w-full h-32 object-cover rounded-lg border border-[#d0d5dd]"
                          />
                        )}
                      </div>
                    )}

                    <div className="flex justify-between items-center">
                      <span className="text-[#344054] text-sm font-medium leading-5">No visible damage</span>
                      {getStatusDisplay(formData.step2Data.walkAroundDamage.status)}
                    </div>
                    {formData.step2Data.walkAroundDamage.status === 'not-ok' && (
                      <div className="ml-4 space-y-2">
                        {formData.step2Data.walkAroundDamage.comment && (
                          <p className="text-[#667085] text-sm leading-5">{formData.step2Data.walkAroundDamage.comment}</p>
                        )}
                        {formData.step2Data.walkAroundDamage.photo && (
                          <img
                            src={URL.createObjectURL(formData.step2Data.walkAroundDamage.photo)}
                            alt="Issue photo"
                            className="w-full h-32 object-cover rounded-lg border border-[#d0d5dd]"
                          />
                        )}
                      </div>
                    )}

                    <div className="flex justify-between items-center">
                      <span className="text-[#344054] text-sm font-medium leading-5">Panels and fittings secure</span>
                      {getStatusDisplay(formData.step2Data.walkAroundPanels.status)}
                    </div>
                    {formData.step2Data.walkAroundPanels.status === 'not-ok' && (
                      <div className="ml-4 space-y-2">
                        {formData.step2Data.walkAroundPanels.comment && (
                          <p className="text-[#667085] text-sm leading-5">{formData.step2Data.walkAroundPanels.comment}</p>
                        )}
                        {formData.step2Data.walkAroundPanels.photo && (
                          <img
                            src={URL.createObjectURL(formData.step2Data.walkAroundPanels.photo)}
                            alt="Issue photo"
                            className="w-full h-32 object-cover rounded-lg border border-[#d0d5dd]"
                          />
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Tyres */}
                <div>
                  <h3 className="text-[#475467] text-sm font-semibold leading-5 mb-3">Tyres</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[#344054] text-sm font-medium leading-5">Tread condition</span>
                      {getStatusDisplay(formData.step2Data.tyresTread.status)}
                    </div>
                    {formData.step2Data.tyresTread.status === 'not-ok' && (
                      <div className="ml-4 space-y-2">
                        {formData.step2Data.tyresTread.comment && (
                          <p className="text-[#667085] text-sm leading-5">{formData.step2Data.tyresTread.comment}</p>
                        )}
                        {formData.step2Data.tyresTread.photo && (
                          <img
                            src={URL.createObjectURL(formData.step2Data.tyresTread.photo)}
                            alt="Issue photo"
                            className="w-full h-32 object-cover rounded-lg border border-[#d0d5dd]"
                          />
                        )}
                      </div>
                    )}

                    <div className="flex justify-between items-center">
                      <span className="text-[#344054] text-sm font-medium leading-5">Tyre pressure</span>
                      {getStatusDisplay(formData.step2Data.tyresPressure.status)}
                    </div>
                    {formData.step2Data.tyresPressure.status === 'not-ok' && (
                      <div className="ml-4 space-y-2">
                        {formData.step2Data.tyresPressure.comment && (
                          <p className="text-[#667085] text-sm leading-5">{formData.step2Data.tyresPressure.comment}</p>
                        )}
                        {formData.step2Data.tyresPressure.photo && (
                          <img
                            src={URL.createObjectURL(formData.step2Data.tyresPressure.photo)}
                            alt="Issue photo"
                            className="w-full h-32 object-cover rounded-lg border border-[#d0d5dd]"
                          />
                        )}
                      </div>
                    )}

                    <div className="flex justify-between items-center">
                      <span className="text-[#344054] text-sm font-medium leading-5">Wheel nuts tight</span>
                      {getStatusDisplay(formData.step2Data.tyresWheelNuts.status)}
                    </div>
                    {formData.step2Data.tyresWheelNuts.status === 'not-ok' && (
                      <div className="ml-4 space-y-2">
                        {formData.step2Data.tyresWheelNuts.comment && (
                          <p className="text-[#667085] text-sm leading-5">{formData.step2Data.tyresWheelNuts.comment}</p>
                        )}
                        {formData.step2Data.tyresWheelNuts.photo && (
                          <img
                            src={URL.createObjectURL(formData.step2Data.tyresWheelNuts.photo)}
                            alt="Issue photo"
                            className="w-full h-32 object-cover rounded-lg border border-[#d0d5dd]"
                          />
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Lights */}
                <div>
                  <h3 className="text-[#475467] text-sm font-semibold leading-5 mb-3">Lights</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[#344054] text-sm font-medium leading-5">Headlights</span>
                      {getStatusDisplay(formData.step2Data.lightsHeadlights.status)}
                    </div>
                    {formData.step2Data.lightsHeadlights.status === 'not-ok' && (
                      <div className="ml-4 space-y-2">
                        {formData.step2Data.lightsHeadlights.comment && (
                          <p className="text-[#667085] text-sm leading-5">{formData.step2Data.lightsHeadlights.comment}</p>
                        )}
                        {formData.step2Data.lightsHeadlights.photo && (
                          <img
                            src={URL.createObjectURL(formData.step2Data.lightsHeadlights.photo)}
                            alt="Issue photo"
                            className="w-full h-32 object-cover rounded-lg border border-[#d0d5dd]"
                          />
                        )}
                      </div>
                    )}

                    <div className="flex justify-between items-center">
                      <span className="text-[#344054] text-sm font-medium leading-5">Indicators</span>
                      {getStatusDisplay(formData.step2Data.lightsIndicators.status)}
                    </div>
                    {formData.step2Data.lightsIndicators.status === 'not-ok' && (
                      <div className="ml-4 space-y-2">
                        {formData.step2Data.lightsIndicators.comment && (
                          <p className="text-[#667085] text-sm leading-5">{formData.step2Data.lightsIndicators.comment}</p>
                        )}
                        {formData.step2Data.lightsIndicators.photo && (
                          <img
                            src={URL.createObjectURL(formData.step2Data.lightsIndicators.photo)}
                            alt="Issue photo"
                            className="w-full h-32 object-cover rounded-lg border border-[#d0d5dd]"
                          />
                        )}
                      </div>
                    )}

                    <div className="flex justify-between items-center">
                      <span className="text-[#344054] text-sm font-medium leading-5">Brake lights</span>
                      {getStatusDisplay(formData.step2Data.lightsBrake.status)}
                    </div>
                    {formData.step2Data.lightsBrake.status === 'not-ok' && (
                      <div className="ml-4 space-y-2">
                        {formData.step2Data.lightsBrake.comment && (
                          <p className="text-[#667085] text-sm leading-5">{formData.step2Data.lightsBrake.comment}</p>
                        )}
                        {formData.step2Data.lightsBrake.photo && (
                          <img
                            src={URL.createObjectURL(formData.step2Data.lightsBrake.photo)}
                            alt="Issue photo"
                            className="w-full h-32 object-cover rounded-lg border border-[#d0d5dd]"
                          />
                        )}
                      </div>
                    )}

                    <div className="flex justify-between items-center">
                      <span className="text-[#344054] text-sm font-medium leading-5">Reverse lights</span>
                      {getStatusDisplay(formData.step2Data.lightsReverse.status)}
                    </div>
                    {formData.step2Data.lightsReverse.status === 'not-ok' && (
                      <div className="ml-4 space-y-2">
                        {formData.step2Data.lightsReverse.comment && (
                          <p className="text-[#667085] text-sm leading-5">{formData.step2Data.lightsReverse.comment}</p>
                        )}
                        {formData.step2Data.lightsReverse.photo && (
                          <img
                            src={URL.createObjectURL(formData.step2Data.lightsReverse.photo)}
                            alt="Issue photo"
                            className="w-full h-32 object-cover rounded-lg border border-[#d0d5dd]"
                          />
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Fluid & Service Checks */}
                <div>
                  <h3 className="text-[#475467] text-sm font-semibold leading-5 mb-3">Fluid & Service Checks</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[#344054] text-sm font-medium leading-5">Oil level check</span>
                      {getStatusDisplay(formData.step2Data.oilLevel.status)}
                    </div>
                    {formData.step2Data.oilLevel.status === 'not-ok' && (
                      <div className="ml-4 space-y-2">
                        {formData.step2Data.oilLevel.comment && (
                          <p className="text-[#667085] text-sm leading-5">{formData.step2Data.oilLevel.comment}</p>
                        )}
                        {formData.step2Data.oilLevel.photo && (
                          <img
                            src={URL.createObjectURL(formData.step2Data.oilLevel.photo)}
                            alt="Issue photo"
                            className="w-full h-32 object-cover rounded-lg border border-[#d0d5dd]"
                          />
                        )}
                      </div>
                    )}

                    <div className="flex justify-between items-center">
                      <span className="text-[#344054] text-sm font-medium leading-5">Coolant level check</span>
                      {getStatusDisplay(formData.step2Data.coolantLevel.status)}
                    </div>
                    {formData.step2Data.coolantLevel.status === 'not-ok' && (
                      <div className="ml-4 space-y-2">
                        {formData.step2Data.coolantLevel.comment && (
                          <p className="text-[#667085] text-sm leading-5">{formData.step2Data.coolantLevel.comment}</p>
                        )}
                        {formData.step2Data.coolantLevel.photo && (
                          <img
                            src={URL.createObjectURL(formData.step2Data.coolantLevel.photo)}
                            alt="Issue photo"
                            className="w-full h-32 object-cover rounded-lg border border-[#d0d5dd]"
                          />
                        )}
                      </div>
                    )}

                    <div className="flex justify-between items-center">
                      <span className="text-[#344054] text-sm font-medium leading-5">Brake fluid level check</span>
                      {getStatusDisplay(formData.step2Data.brakeFluidLevel.status)}
                    </div>
                    {formData.step2Data.brakeFluidLevel.status === 'not-ok' && (
                      <div className="ml-4 space-y-2">
                        {formData.step2Data.brakeFluidLevel.comment && (
                          <p className="text-[#667085] text-sm leading-5">{formData.step2Data.brakeFluidLevel.comment}</p>
                        )}
                        {formData.step2Data.brakeFluidLevel.photo && (
                          <img
                            src={URL.createObjectURL(formData.step2Data.brakeFluidLevel.photo)}
                            alt="Issue photo"
                            className="w-full h-32 object-cover rounded-lg border border-[#d0d5dd]"
                          />
                        )}
                      </div>
                    )}

                    <div className="flex justify-between items-center">
                      <span className="text-[#344054] text-sm font-medium leading-5">Fuel Level</span>
                      <span className="text-[#101828] text-sm font-semibold leading-5">
                        {formData.step2Data.fuelLevel ? formData.step2Data.fuelLevel.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) : '—'}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-[#344054] text-sm font-medium leading-5">Odometer Reading</span>
                      <span className="text-[#101828] text-sm font-semibold leading-5">
                        {formData.step2Data.odometerReading || '—'}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-[#344054] text-sm font-medium leading-5">Last Serviced</span>
                      <span className="text-[#101828] text-sm font-semibold leading-5">
                        {formData.step2Data.lastServiced || '—'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Worker Information */}
          <div className="bg-white rounded-2xl border border-[#eaecf0] p-4">
            <h2 className="text-[#344054] text-base font-semibold leading-6 mb-4">Worker Information</h2>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[#344054] text-sm font-medium leading-5">Company</span>
                <span className="text-[#101828] text-sm font-semibold leading-5">
                  {formData?.otherCompany || '—'}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-[#344054] text-sm font-medium leading-5">First Name</span>
                <span className="text-[#101828] text-sm font-semibold leading-5">
                  {formData?.firstName || '—'}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-[#344054] text-sm font-medium leading-5">Last Name</span>
                <span className="text-[#101828] text-sm font-semibold leading-5">
                  {formData?.lastName || '—'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation - Fixed */}
      <div className="flex-shrink-0 px-5 py-4 bg-[#f8f7f2] border-t border-gray-200">
        <div className="flex gap-4">
          <Button
            onClick={onBack}
            variant="secondary"
            className="flex-1 bg-[#eaf0f2] border-[#eaf0f2] text-[#1e4d59] hover:bg-[#d4e3e6]"
          >
            Previous
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex-1"
            variant={isSubmitting ? 'secondary' : 'primary'}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Form'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default VehiclePrestartReviewPage