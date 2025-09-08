import React, { useState, useEffect } from 'react';
import { X, Share2 } from 'lucide-react';
import { cn } from '../../utils/cn';
import beststreakIcon from '../../assets/leaderboard/beststreak.png';
import totalformsIcon from '../../assets/leaderboard/totalformsicon.png';
import pointsIcon from '../../assets/leaderboard/pointsicon.png';
import streakTickIcon from '../../assets/leaderboard/streaktick.png';
import Streakicon from '../../assets/leaderboard/Streakicon.svg';

interface StreakDetailPageProps {
  onClose: () => void;
}

export default function StreakDetailPage({ onClose }: StreakDetailPageProps) {
  console.log('StreakDetailPage rendered!')
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Trigger slide up animation on mount
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // Wait for animation to complete before calling onClose
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const currentStreak = 3;
  const bestStreak = 5;
  const totalForms = 12;
  const totalPoints = 60;

  // Weekly progress data
  const weekDays = [
    { day: 'Tue', completed: true, points: 10 },
    { day: 'Wed', completed: true, points: 10 },
    { day: 'Thu', completed: true, points: 10 },
    { day: 'Fri', completed: false, points: 0 },
    { day: 'Sat', completed: false, points: 0 },
    { day: 'Sun', completed: false, points: 0 },
    { day: 'Mon', completed: false, points: 0 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end">
      {/* Dark overlay */}
      <div 
        className={`absolute inset-0 transition-opacity duration-300 ${
          isVisible ? 'bg-black/50' : 'bg-black/0'
        }`}
        onClick={handleClose}
      />
      
      {/* Background image - removed to prevent layering with leaderboard background */}

      {/* Bottom sheet */}
      <div className={`relative bg-white rounded-t-[20px] w-full h-[85vh] flex flex-col justify-end pt-12 pb-10 px-4 transform transition-transform duration-300 ease-out ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}>
        {/* Drag handle */}
        <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-[54px] h-[5px] bg-gray-300 rounded-full" />
        
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X size={24} />
        </button>

        {/* Streak display */}
        <div className="flex flex-col items-center gap-1.5 mb-12">
          <div className="relative">
            {/* Streak icon behind */}
            <div className="w-[70px] h-[70px] relative z-0">
              <img 
                src={Streakicon} 
                alt="Streak" 
                className="w-full h-full"
              />
            </div>
            
            {/* Streak number in circle */}
            <div className="absolute top-[45px] left-1/2 transform -translate-x-1/2 z-10 bg-white rounded-full w-[40px] h-[40px] flex items-center justify-center">
              <div className="text-[#266273] font-bold text-[32px] leading-[40px] tracking-[-0.96px]">
                {currentStreak}
              </div>
            </div>
            
            {/* "day streak" text */}
            <div className="absolute top-[77px] left-1/2 transform -translate-x-1/2 z-10">
              <div className="text-[#266273] font-bold text-[18px] leading-[24px] text-center whitespace-nowrap">
                day streak
              </div>
            </div>
          </div>
        </div>

        {/* Weekly progress */}
        <div className="flex flex-col gap-6 mb-4">
          <div className="bg-white border-2 border-[#eaecf0] rounded-[20px] p-4 pt-8">
            {/* Week days */}
            <div className="flex justify-between items-center mb-6">
              {weekDays.map((day, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="text-[#667085] font-medium text-[12px] leading-[18px] mb-2">
                    {day.day}
                  </div>
                  <div className="relative">
                    {day.completed ? (
                      <>
                        {/* Completed circle with tick */}
                        <div className="w-[34px] h-[34px] bg-[#66c61c] rounded-full flex items-center justify-center">
                          <img 
                            src={streakTickIcon} 
                            alt="Completed" 
                            className="w-[22px] h-[22px]"
                          />
                        </div>
                        {/* Points */}
                        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-[#ff692e] font-semibold text-[16px] leading-[24px]">
                          +{day.points}
                        </div>
                      </>
                    ) : (
                      <div className="w-[34px] h-[34px] bg-[#eaecf0] rounded-full" />
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Description */}
            <div className="text-[#475467] text-[14px] leading-[20px] text-center">
              Submit a form every day to keep your streak alive - miss a day, and it resets!
            </div>
          </div>

          {/* Stats cards */}
          <div className="flex gap-3">
            {/* Best Streak */}
            <div className="flex-1 bg-white border-2 border-[#eaecf0] rounded-[20px] px-3 py-4">
              <div className="flex flex-col items-center gap-1">
                <div className="w-9 h-9">
                  <img 
                    src={beststreakIcon} 
                    alt="Best Streak" 
                    className="w-full h-full"
                  />
                </div>
                <div className="text-[#344054] font-bold text-[30px] leading-[38px]">
                  {bestStreak}
                </div>
                <div className="text-[#667085] font-semibold text-[12px] leading-[18px]">
                  BEST STREAK
                </div>
              </div>
            </div>

            {/* Total Forms */}
            <div className="flex-1 bg-white border-2 border-[#eaecf0] rounded-[20px] px-3 py-4">
              <div className="flex flex-col items-center gap-1">
                <div className="w-9 h-9">
                  <img 
                    src={totalformsIcon} 
                    alt="Forms" 
                    className="w-full h-full"
                  />
                </div>
                <div className="text-[#344054] font-bold text-[30px] leading-[38px]">
                  {totalForms}
                </div>
                <div className="text-[#667085] font-semibold text-[12px] leading-[18px]">
                  TOTAL FORM
                </div>
              </div>
            </div>

            {/* Points */}
            <div className="flex-1 bg-white border-2 border-[#eaecf0] rounded-[20px] px-3 py-4">
              <div className="flex flex-col items-center gap-1">
                <div className="w-9 h-9">
                  <img 
                    src={pointsIcon} 
                    alt="Points" 
                    className="w-full h-full"
                  />
                </div>
                <div className="text-[#344054] font-bold text-[30px] leading-[38px]">
                  {totalPoints}
                </div>
                <div className="text-[#667085] font-semibold text-[12px] leading-[18px]">
                  POINTS
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Share button */}
        <div className="mt-4">
          <button className="w-full bg-[#266273] text-white font-semibold text-[16px] leading-[24px] py-2.5 px-3 rounded-xl flex items-center justify-center gap-2">
            <Share2 size={24} />
            Share my progress
          </button>
        </div>
      </div>
    </div>
  );
} 