import React, { useState } from 'react';
import { MobileLayout } from '../components/layout';
import { Button } from '../components/ui';
import AddTeamMemberModal from '../components/ui/AddTeamMemberModal';

// Import team chat assets
import backArrowIcon from '../assets/backarrowicon.svg';
import addPersonIcon from '../assets/teamchat/addpersonicon.svg';
import lindaAvatar from '../assets/teamchat/linda.svg';
import joshAvatar from '../assets/teamchat/josh.svg';
import takePictureIcon from '../assets/teamchat/takepictureicon.png';
import photoLibraryIcon from '../assets/teamchat/photolibraryicon.svg';
import voiceChatIcon from '../assets/teamchat/voicechaticon.svg';
import photoCrackedPlatform from '../assets/teamchat/photocrackedplatform.png';

interface JobTeamChatPageProps {
  onBackToJob?: () => void;
}

interface ChatMessage {
  id: string;
  sender: {
    name: string;
    role: string;
    avatar: string;
  };
  timestamp: string;
  message: string;
  isOwnMessage?: boolean;
  mentions?: string[];
  attachments?: {
    type: 'image';
    url: string;
    caption?: string;
  }[];
}

export default function JobTeamChatPage({ onBackToJob }: JobTeamChatPageProps) {
  const [message, setMessage] = useState('');
  const [showAddTeamMatesModal, setShowAddTeamMatesModal] = useState(false);

  // Sample chat messages based on Figma design
  const chatMessages: ChatMessage[] = [
    {
      id: '1',
      sender: {
        name: 'Linda',
        role: 'HSE Officer',
        avatar: lindaAvatar
      },
      timestamp: 'Friday 2:20pm',
      message: 'Morning team, just finished my inspection at Site A. Noticed the scaffold platform looks a bit unstable. Please double-check before continuing.',
      attachments: [
        {
          type: 'image',
          url: photoCrackedPlatform,
          caption: 'Add photo of cracked platform'
        }
      ]
    },
    {
      id: '2',
      sender: {
        name: 'Josh',
        role: 'Supervisor',
        avatar: joshAvatar
      },
      timestamp: 'Friday 3:12pm',
      message: 'Thanks Linda. I\'ll get Jack to inspect it again before shift change. @David please confirm once done.',
      mentions: ['David']
    },
    {
      id: '3',
      sender: {
        name: 'You',
        role: '',
        avatar: ''
      },
      timestamp: 'Friday 3:20pm',
      message: 'Sure thing, I\'ll have a look today.',
      isOwnMessage: true
    }
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      // TODO: Implement send message logic
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleAddTeamMates = (addedMates: any[]) => {
    // TODO: Handle adding team mates to the chat
    console.log('Added team mates:', addedMates);
    setShowAddTeamMatesModal(false);
  };

  const header = (
    <div className="px-4 h-[72px] flex items-center justify-between">
      <button
        onClick={onBackToJob}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <img src={backArrowIcon} alt="Back" className="w-6 h-6" />
      </button>
      <div className="flex flex-col items-center">
        <h1 className="text-base font-semibold text-[#000000] leading-6">Miner Team</h1>
        <p className="text-xs text-[#667085] leading-5">4 members</p>
      </div>
      <button 
        onClick={() => setShowAddTeamMatesModal(true)}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <img src={addPersonIcon} alt="Add team member" className="w-6 h-6" />
      </button>
    </div>
  );

  return (
    <div className="h-screen flex flex-col bg-[#f8f7f2] overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 bg-white border-b border-gray-200">
        {header}
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
        {chatMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.isOwnMessage ? 'justify-end' : 'justify-start'}`}
          >
            {!msg.isOwnMessage && (
              <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                <img src={msg.sender.avatar} alt={msg.sender.name} className="w-full h-full object-cover" />
              </div>
            )}
            
            <div className={`flex flex-col gap-1.5 max-w-[296px] ${msg.isOwnMessage ? 'items-end' : 'items-start'}`}>
              {/* Name and timestamp */}
              <div className={`flex items-center gap-2 ${msg.isOwnMessage ? 'flex-row-reverse' : 'flex-row'}`}>
                <span className="text-sm font-medium text-[#414651]">
                  {msg.isOwnMessage ? 'You' : `${msg.sender.name} (${msg.sender.role})`}
                </span>
                <span className="text-xs text-[#535862]">{msg.timestamp}</span>
              </div>

              {/* Message content */}
              <div className={`rounded-lg px-3 py-2 ${
                msg.isOwnMessage 
                  ? 'bg-[#eaf0f2] rounded-bl-lg rounded-br-lg rounded-tl-lg' 
                  : 'bg-white rounded-bl-lg rounded-br-lg rounded-tr-lg border border-[#e9eaeb]'
              }`}>
                <p className="text-base text-[#181d27] leading-6">
                  {msg.message.split('@').map((part, index) => {
                    if (index === 0) return part;
                    const mention = msg.mentions?.find(m => part.startsWith(m));
                    if (mention) {
                      return (
                        <span key={index}>
                          <span className="font-medium text-[#266273]">@{mention}</span>
                          {part.substring(mention.length)}
                        </span>
                      );
                    }
                    return `@${part}`;
                  })}
                </p>
              </div>

              {/* Attachments */}
              {msg.attachments?.map((attachment, index) => (
                <div key={index} className={`bg-white rounded-lg border border-[#e9eaeb] ${
                  msg.isOwnMessage ? 'items-end' : 'items-start'
                }`}>
                  <div className="p-3">
                    <div className="w-full h-32 rounded-md mb-2 overflow-hidden">
                      <img 
                        src={attachment.url} 
                        alt={attachment.caption || 'Attachment'} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {attachment.caption && (
                      <p className="text-sm text-[#344054]">{attachment.caption}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="flex-shrink-0 bg-white px-3 py-2.5 border-t border-gray-200">
        <div className="flex items-center gap-3">
          {/* Action buttons */}
          <div className="flex gap-1.5">
            <button className="p-2.5 hover:bg-[#eaf0f2] rounded-full transition-colors">
              <img src={takePictureIcon} alt="Take picture" className="w-10 h-10" />
            </button>
            <button className="p-2.5 hover:bg-[#eaf0f2] rounded-full transition-colors">
              <img src={photoLibraryIcon} alt="Photo library" className="w-10 h-10" />
            </button>
          </div>

          {/* Message input with voice chat icon inside */}
          <div className="flex-1">
            <div className="bg-white border border-[#d0d5dd] rounded-xl px-3.5 py-2.5 shadow-sm flex items-center gap-2">
              <input
                type="text"
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 bg-transparent text-[#181d27] placeholder-[#717680] focus:outline-none text-base leading-6"
              />
              <button 
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <img src={voiceChatIcon} alt="Send" className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Team Mates Modal */}
      <AddTeamMemberModal
        isOpen={showAddTeamMatesModal}
        onClose={() => setShowAddTeamMatesModal(false)}
        onInviteWithEmail={() => {}}
        onScanQRCode={() => {}}
        onMatesAdded={handleAddTeamMates}
      />
    </div>
  );
} 