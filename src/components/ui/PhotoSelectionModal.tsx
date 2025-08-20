import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface PhotoSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTakePhoto: () => void;
  onChooseFromLibrary: () => void;
}

export default function PhotoSelectionModal({ 
  isOpen, 
  onClose, 
  onTakePhoto,
  onChooseFromLibrary
}: PhotoSelectionModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleTakePhoto = () => {
    onTakePhoto();
    handleClose();
  };

  const handleChooseFromLibrary = () => {
    onChooseFromLibrary();
    handleClose();
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end">
      {/* Dark overlay */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${
          isVisible ? 'bg-black/50' : 'bg-black/0'
        }`}
        onClick={handleClose}
      />

      {/* Bottom sheet */}
      <div className={`relative bg-white rounded-t-[20px] w-full h-[296px] flex flex-col pt-3 pb-6 px-4 transform transition-transform duration-300 ease-out ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}>
        {/* Drag handle */}
        <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-[54px] h-[5px] bg-[#d9d9d9] rounded-full" />

        {/* Photo Selection Options */}
        <div className="flex-1 flex flex-col gap-3 pt-4">
          {/* Take Photo Option */}
          <button
            onClick={handleTakePhoto}
            className="flex items-center gap-3 px-0 py-1.5 w-full hover:bg-gray-50 transition-colors"
          >
            <div className="bg-[#eaf0f2] p-[10px] rounded-2xl flex items-center justify-center w-10 h-10 flex-shrink-0">
              <svg className="w-6 h-6 text-[#558998]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div className="flex flex-col gap-0.5 text-left">
              <p className="font-medium text-[#000000] text-[16px] leading-[24px]">
                Take photo
              </p>
              <p className="font-normal text-[#667085] text-[14px] leading-[20px]">
                Use your device's camera to take a photo
              </p>
            </div>
          </button>

          {/* Photo Library Option */}
          <button
            onClick={handleChooseFromLibrary}
            className="flex items-center gap-3 px-0 py-1.5 w-full hover:bg-gray-50 transition-colors"
          >
            <div className="bg-[#eaf0f2] p-[10px] rounded-2xl flex items-center justify-center w-10 h-10 flex-shrink-0">
              <svg className="w-6 h-6 text-[#558998]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div className="flex flex-col gap-0.5 text-left">
              <p className="font-medium text-[#000000] text-[16px] leading-[24px]">
                Photo library
              </p>
              <p className="font-normal text-[#667085] text-[14px] leading-[20px]">
                Choose images to upload from your gallery
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
} 