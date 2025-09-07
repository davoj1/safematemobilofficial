import React, { useState } from 'react'
import { HeaderWithBack } from '../../../components/layout'
import { Button, FileUpload } from '../../../components/ui'

interface VehiclePrestartStep5PageProps {
  frontPhoto?: File | null
  leftSidePhoto?: File | null
  rightSidePhoto?: File | null
  backPhoto?: File | null
  onNext: (data: {
    frontPhoto: File | null
    leftSidePhoto: File | null
    rightSidePhoto: File | null
    backPhoto: File | null
  }) => void
  onBack: () => void
}

const VehiclePrestartStep5Page: React.FC<VehiclePrestartStep5PageProps> = ({
  frontPhoto = null,
  leftSidePhoto = null,
  rightSidePhoto = null,
  backPhoto = null,
  onNext,
  onBack
}) => {
  const [photos, setPhotos] = useState({
    front: frontPhoto,
    leftSide: leftSidePhoto,
    rightSide: rightSidePhoto,
    back: backPhoto
  })


  const handlePhotoSelect = (position: keyof typeof photos, file: File) => {
    setPhotos(prev => ({
      ...prev,
      [position]: file
    }))
  }


  const handleNext = () => {
    const requiredPhotosUploaded = photos.front && photos.leftSide && photos.rightSide && photos.back

    if (requiredPhotosUploaded) {
      onNext({
        frontPhoto: photos.front,
        leftSidePhoto: photos.leftSide,
        rightSidePhoto: photos.rightSide,
        backPhoto: photos.back
      })
    }
  }

  // Validation
  const requiredPhotosUploaded = photos.front && photos.leftSide && photos.rightSide && photos.back
  const isFormValid = requiredPhotosUploaded


  const renderPhotoSection = (position: keyof typeof photos, title: string) => {
    return (
      <div className="space-y-1.5">
        <label className="font-medium text-[#344054] text-xs leading-4">
          {title} *
        </label>
        <FileUpload
          title={`Add ${title} Photo`}
          description={`Upload a photo of the ${title.toLowerCase()} of the vehicle`}
          buttonText="Click to upload photo"
          onFileSelect={(file) => handlePhotoSelect(position, file)}
        />
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col bg-[#f8f7f2] overflow-hidden">
      {/* Header - Fixed */}
      <HeaderWithBack
        title="Vehicle Pre-Start"
        onBack={onBack}
        progress="5/6"
        className="flex-shrink-0"
      />

      {/* Content - Scrollable */}
      <div className="flex-1 px-5 py-3 space-y-6 overflow-y-auto">
        {/* Step Title */}
        <div className="text-center space-y-2">
          <h1 className="font-bold text-[#266273] text-xl leading-7">
            Photos & Additional Info
          </h1>
          <p className="text-[#667085] text-base font-normal leading-6">
            Upload required photos and complete additional information
          </p>
        </div>

        {/* Required Photos */}
        <div className="space-y-4">
          <h2 className="font-semibold text-[#475467] text-base leading-6">
            Required Photos
          </h2>
          
          <div className="space-y-4">
            {renderPhotoSection('front', 'Front')}
            {renderPhotoSection('leftSide', 'Left Side')}
            {renderPhotoSection('rightSide', 'Right Side')}
            {renderPhotoSection('back', 'Back')}
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

export default VehiclePrestartStep5Page
