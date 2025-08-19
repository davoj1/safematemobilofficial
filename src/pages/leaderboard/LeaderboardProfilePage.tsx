import React, { useState } from 'react';
import { ArrowLeft, Camera } from 'lucide-react';
import { cn } from '../../utils/cn';

interface LeaderboardProfilePageProps {
  onBack: () => void;
  onComplete: (profile: {
    nickname: string;
    showRealName: boolean;
    profilePicture?: File;
  }) => void;
}

export default function LeaderboardProfilePage({ onBack, onComplete }: LeaderboardProfilePageProps) {
  const [nickname, setNickname] = useState('');
  const [showRealName, setShowRealName] = useState(false);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfilePicture(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleConfirm = () => {
    if (nickname.trim()) {
      onComplete({
        nickname: nickname.trim(),
        showRealName,
        profilePicture: profilePicture || undefined
      });
    }
  };

  const isFormValid = nickname.trim().length > 0;

  return (
    <div className="h-screen flex flex-col bg-[#266273] overflow-hidden">
      {/* Background Spiral Effect */}
      <div 
        className="absolute inset-0 opacity-80"
        style={{ 
          backgroundImage: `url('/src/assets/leaderboard/spiralbackgroundeffect.png')`,
          backgroundSize: '80% auto',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      {/* Header */}
      <div className="relative z-10 flex items-center px-4 py-3">
        <button
          onClick={onBack}
          className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
      </div>

      {/* Profile Creation Modal */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4">
        <div className="bg-white rounded-[20px] p-6 w-full max-w-sm">
          {/* Title */}
          <h1 className="text-[#101828] font-bold text-xl text-center mb-6">
            Set your leaderboard profile
          </h1>

          {/* Profile Picture Upload */}
          <div className="mb-6">
            <div className="flex justify-center">
              <label className="cursor-pointer">
                <div className="w-24 h-24 bg-[#f2f4f7] rounded-full flex items-center justify-center border-2 border-dashed border-[#d0d5dd] hover:border-[#266273] transition-colors">
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <Camera size={32} className="text-[#98a2b3]" />
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Nickname Input */}
          <div className="mb-6">
            <label className="block text-[#101828] font-medium text-sm mb-2">
              Nickname *
            </label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="Input your nickname"
              className="w-full px-4 py-3 border border-[#d0d5dd] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#266273] focus:border-transparent placeholder-[#667085]"
            />
          </div>

          {/* Privacy Toggle */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <span className="text-[#101828] text-sm">
                Show your real name and photo on the leaderboard?
              </span>
              <button
                onClick={() => setShowRealName(!showRealName)}
                className={cn(
                  "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                  showRealName ? "bg-[#266273]" : "bg-[#d0d5dd]"
                )}
              >
                <span
                  className={cn(
                    "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                    showRealName ? "translate-x-5" : "translate-x-1"
                  )}
                />
              </button>
            </div>
          </div>

          {/* Confirm Button */}
          <button
            onClick={handleConfirm}
            disabled={!isFormValid}
            className={cn(
              "w-full py-3 px-4 rounded-xl font-semibold text-sm transition-colors",
              isFormValid
                ? "bg-[#266273] text-white hover:bg-[#1f4f5c]"
                : "bg-[#f2f4f7] text-[#98a2b3] cursor-not-allowed"
            )}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
} 