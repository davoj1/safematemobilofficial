import React, { useState } from 'react'
import { Button, TextareaInput, FileUpload } from '../../../components/ui'

interface SafemateTake5Step1Props {
  task: string
  photos: File[]
  whyWorkSafe: string
  onNext: (task: string, photos: File[], whyWorkSafe: string) => void
  onBack: () => void
}

const SafemateTake5Step1: React.FC<SafemateTake5Step1Props> = ({
  task,
  photos,
  whyWorkSafe,
  onNext,
  onBack,
}) => {
  const [currentTask, setCurrentTask] = useState(task)
  const [currentPhotos, setCurrentPhotos] = useState<File[]>(photos)
  const [currentWhyWorkSafe, setCurrentWhyWorkSafe] = useState(whyWorkSafe)

  const handlePhotoAdd = (file: File) => {
    setCurrentPhotos(prev => [...prev, file])
  }

  const handlePhotoRemove = (index: number) => {
    setCurrentPhotos(prev => prev.filter((_, i) => i !== index))
  }

  const handleNext = () => {
    onNext(currentTask, currentPhotos, currentWhyWorkSafe)
  }

  const isFormValid = currentTask.trim() !== ''

  return (
    <div className="h-full flex flex-col">
      {/* Content - Scrollable */}
      <div className="flex-1 px-5 py-3 space-y-6 overflow-y-auto">
        {/* Step Title */}
        <div className="text-center space-y-2">
          <h1 className="font-bold text-[#266273] text-xl leading-7">
            Your Task Today
          </h1>
          <p className="text-[#667085] text-base font-normal leading-6">
            Describe your task and why safety is important
          </p>
        </div>

        {/* Task Description */}
        <div className="space-y-3">
          <h2 className="font-semibold text-[#344054] text-base leading-6">
            Your task today *
          </h2>
          <TextareaInput
            placeholder="Describe your task..."
            value={currentTask}
            onChange={setCurrentTask}
            rows={3}
            className="w-full"
          />
        </div>

        {/* Why should I work safe? */}
        <div className="space-y-3">
          <h2 className="font-semibold text-[#344054] text-base leading-6">
            Why should I work safe?
          </h2>
          <TextareaInput
            placeholder="Why is it important for you to work safely today?"
            value={currentWhyWorkSafe}
            onChange={setCurrentWhyWorkSafe}
            rows={3}
            className="w-full"
          />
        </div>

        {/* Add Photos */}
        <div className="space-y-3">
          <h2 className="font-semibold text-[#344054] text-base leading-6">
            Add additional photos
          </h2>
          <FileUpload
            onFileSelect={handlePhotoAdd}
            accept="image/*"
            multiple={true}
            className="w-full"
          />
          
          {/* Display uploaded photos */}
          {currentPhotos.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs text-[#667085]">Uploaded photos ({currentPhotos.length})</p>
              <div className="grid grid-cols-2 gap-2">
                {currentPhotos.map((photo, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt={`Photo ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg border border-[#d0d5dd]"
                    />
                    <button
                      onClick={() => handlePhotoRemove(index)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation - Fixed */}
      <div className="px-5 py-4 flex-shrink-0">
        <Button
          onClick={handleNext}
          disabled={!isFormValid}
          className="w-full"
        >
          Next
        </Button>
      </div>
    </div>
  )
}

export default SafemateTake5Step1
