import React from 'react';
import BottomNavigation from '../components/layout/BottomNavigation';

// Import settings icons
import myAccountIcon from '../assets/settings/myaccounticon.svg';
import changePasswordIcon from '../assets/settings/changepasswordicon.svg';
import referSafeMateIcon from '../assets/settings/refersafemateicon.svg';
import myTeamIcon from '../assets/settings/myteamicon.svg';
import locationSettingsIcon from '../assets/settings/locationsettingsicon.svg';
import notificationsIcon from '../assets/settings/notificationsicon.svg';
import privacyAndTermsIcon from '../assets/settings/privacyandtermsicon.svg';
import leaveAReviewIcon from '../assets/settings/leaveareviewicon.svg';
import reportABugIcon from '../assets/settings/reportabugicon.svg';
import contactSupportIcon from '../assets/settings/contactsupporticon.svg';

interface SettingsPageProps {
  onNavigateToHome?: (activeTab: 'forms' | 'jobs' | 'leaderboard' | 'profile' | 'home' | 'company' | 'settings') => void;
  onSignOut?: () => void;
}

interface SettingsItemProps {
  icon: string;
  title: string;
  onClick: () => void;
}

const SettingsItem: React.FC<SettingsItemProps> = ({ icon, title, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-1.5 p-2 hover:bg-gray-50 transition-colors"
    >
      <div className="flex items-center justify-center p-0.5">
        <img src={icon} alt={title} className="w-6 h-6" />
      </div>
      <div className="flex-1 text-left px-2 py-1">
        <span className="text-[#101828] text-base font-normal leading-6">
          {title}
        </span>
      </div>
      <div className="flex items-center justify-center p-1 w-7 h-7">
        <svg className="w-5 h-5 text-[#98a2b3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </button>
  );
};

const SettingsPage: React.FC<SettingsPageProps> = ({ onNavigateToHome, onSignOut }) => {
  const handleSignOut = () => {
    // Call the sign out function passed from App.tsx
    onSignOut?.();
  };

  const handleSettingsItemClick = (title: string) => {
    // TODO: Implement navigation to specific settings pages
    console.log(`${title} clicked`);
  };

  const handleBottomTabChange = (tab: string) => {
    onNavigateToHome?.(tab as 'forms' | 'jobs' | 'leaderboard' | 'profile' | 'home' | 'company' | 'settings');
  };

  return (
    <div className="h-screen flex flex-col bg-[#f8f7f2] overflow-hidden">
      {/* Header */}
      <div className="bg-white px-4 h-[72px] flex items-center justify-center flex-shrink-0">
        <h1 className="text-[#000000] text-base font-semibold leading-6">Settings</h1>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 px-5 py-6 space-y-8 overflow-y-auto">
        {/* ACCOUNT Section */}
        <div className="space-y-1">
          <div className="px-5">
            <h3 className="text-[#667085] text-sm font-medium leading-5">ACCOUNT</h3>
          </div>
          <div className="bg-white rounded-[20px] pl-5 pr-3 py-4 space-y-4">
            <SettingsItem
              icon={myAccountIcon}
              title="My account"
              onClick={() => handleSettingsItemClick('My account')}
            />
            <SettingsItem
              icon={changePasswordIcon}
              title="Change password"
              onClick={() => handleSettingsItemClick('Change password')}
            />
          </div>
        </div>

        {/* GENERAL Section */}
        <div className="space-y-1">
          <div className="px-5">
            <h3 className="text-[#667085] text-sm font-medium leading-5">GENERAL</h3>
          </div>
          <div className="bg-white rounded-[20px] pl-5 pr-3 py-4 space-y-4">
            <SettingsItem
              icon={referSafeMateIcon}
              title="Refer SafeMate"
              onClick={() => handleSettingsItemClick('Refer SafeMate')}
            />
            <SettingsItem
              icon={myTeamIcon}
              title="My team"
              onClick={() => handleSettingsItemClick('My team')}
            />
            <SettingsItem
              icon={locationSettingsIcon}
              title="Location Settings"
              onClick={() => handleSettingsItemClick('Location Settings')}
            />
            <SettingsItem
              icon={notificationsIcon}
              title="Notifications"
              onClick={() => handleSettingsItemClick('Notifications')}
            />
            <SettingsItem
              icon={privacyAndTermsIcon}
              title="Privacy & Terms"
              onClick={() => handleSettingsItemClick('Privacy & Terms')}
            />
          </div>
        </div>

        {/* SUPPORT & FEEDBACK Section */}
        <div className="space-y-1">
          <div className="px-5">
            <h3 className="text-[#667085] text-sm font-medium leading-5">SUPPORT & FEEDBACK</h3>
          </div>
          <div className="bg-white rounded-[20px] pl-5 pr-3 py-4 space-y-4">
            <SettingsItem
              icon={leaveAReviewIcon}
              title="Leave a Review"
              onClick={() => handleSettingsItemClick('Leave a Review')}
            />
            <SettingsItem
              icon={reportABugIcon}
              title="Report a Bug"
              onClick={() => handleSettingsItemClick('Report a Bug')}
            />
            <SettingsItem
              icon={contactSupportIcon}
              title="Contact support"
              onClick={() => handleSettingsItemClick('Contact support')}
            />
          </div>
        </div>

        {/* App Version */}
        <div className="text-center">
          <p className="text-[#266273] text-sm font-normal leading-5">
            App Version 0.0.1
          </p>
        </div>

        {/* Sign Out Button */}
        <div className="px-5">
          <button
            onClick={handleSignOut}
            className="w-full bg-gray-50 border border-[#eaecf0] rounded-2xl p-3 hover:bg-gray-100 transition-colors"
          >
            <span className="text-[#667085] text-base font-semibold leading-6">
              Sign out
            </span>
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation 
        activeTab="settings"
        onTabChange={handleBottomTabChange}
        className="flex-shrink-0"
      />
    </div>
  );
};

export default SettingsPage; 