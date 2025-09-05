import React, { useState } from 'react';
import { MobileLayout } from '../components/layout';
import { Button, FormRequestSlideUp, ProgressIndicator } from '../components/ui';
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
  formRequest?: {
    formId: string;
    formName: string;
    memberStatuses: Array<{ id: string; name: string; avatar?: string; status: 'pending' | 'submitted' }>
  };
  formHistory?: {
    activities: Array<{
      id: string;
      formName: string;
      memberName: string;
      memberAvatar?: string;
      completedAt: string;
      formType: string;
    }>
  };
}

export default function JobTeamChatPage({ onBackToJob }: JobTeamChatPageProps) {
  const [message, setMessage] = useState('');
  const [showAddTeamMatesModal, setShowAddTeamMatesModal] = useState(false);
  const [showFormRequest, setShowFormRequest] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [showSlashHelp, setShowSlashHelp] = useState(false);

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

  // In a real app, teammates would be dynamic
  const teamMembers = [
    { id: 'linda', name: 'Linda', avatar: lindaAvatar },
    { id: 'josh', name: 'Josh', avatar: joshAvatar },
    { id: 'david', name: 'David' },
    { id: 'jack', name: 'Jack' },
  ]

  const formOptions = [
    { id: 'report-hazard', name: 'Report a Hazard' },
    { id: 'take-control', name: 'Take Control (Warrikal FMG)' },
    { id: 'fatigue-management', name: 'Fatigue Management (Warrikal)' },
    { id: 'pace-cards', name: 'Pace Cards (Goodline)' },
  ]

  const slashCommands = [
    { id: 'formrequest', label: 'Form Request', description: 'Request teammates to submit a safety form' },
    { id: 'formhistory', label: 'Form History', description: 'Show recent form activity from the last 24 hours' },
  ]

  // Mock form history data for the last 24 hours
  const recentFormHistory = [
    {
      id: '1',
      formName: 'Report a Hazard',
      memberName: 'Linda',
      memberAvatar: lindaAvatar,
      completedAt: '2 hours ago',
      formType: 'hazard'
    },
    {
      id: '2',
      formName: 'Take Control',
      memberName: 'Josh',
      memberAvatar: joshAvatar,
      completedAt: '4 hours ago',
      formType: 'take-control'
    },
    {
      id: '3',
      formName: 'Fatigue Management',
      memberName: 'David',
      memberAvatar: undefined,
      completedAt: '6 hours ago',
      formType: 'fatigue'
    },
    {
      id: '4',
      formName: 'Pace Cards',
      memberName: 'Jack',
      memberAvatar: undefined,
      completedAt: '8 hours ago',
      formType: 'pace-cards'
    }
  ];

  const handleSendMessage = () => {
    if (!message.trim()) return;
    if (message.trim().startsWith('/formrequest')) {
      setShowFormRequest(true);
      setMessage('');
      setShowSlashHelp(false);
      return;
    }
    if (message.trim().startsWith('/formhistory')) {
      const newMsg: ChatMessage = {
        id: Date.now().toString(),
        sender: { name: 'You', role: '', avatar: '' },
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        message: 'Form History',
        isOwnMessage: true,
        formHistory: {
          activities: recentFormHistory
        }
      };
      setMessages(prev => [...prev, newMsg]);
      setMessage('');
      setShowSlashHelp(false);
      return;
    }
    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: { name: 'You', role: '', avatar: '' },
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      message: message.trim(),
      isOwnMessage: true,
    }
    setMessages(prev => [...prev, newMsg]);
    setMessage('');
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

  const handleFormRequestSubmit = (payload: { formId: string, formName: string, memberIds: string[] }) => {
    const requestedMembers = teamMembers.filter(m => payload.memberIds.includes(m.id))
    const memberStatuses = requestedMembers.map(m => ({ id: m.id, name: m.name, avatar: m.avatar, status: 'pending' as const }))

    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: { name: 'You', role: '', avatar: '' },
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      message: `Form request: ${payload.formName}`,
      isOwnMessage: true,
      mentions: requestedMembers.map(m => m.name),
      formRequest: {
        formId: payload.formId,
        formName: payload.formName,
        memberStatuses,
      },
    }
    setMessages(prev => [...prev, newMsg]);
  }

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
        {[...chatMessages, ...messages].map((msg) => (
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

                {/* Form request block */}
                {msg.formRequest && (
                  <div className="mt-3 bg-white rounded-xl border border-[#e9eaeb] p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[#344054] text-sm font-medium">Requested: {msg.formRequest.formName}</span>
                    </div>
                    <div className="space-y-2">
                      {msg.formRequest.memberStatuses.map((m) => (
                        <div key={m.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 bg-[#266273] rounded-full flex items-center justify-center text-white overflow-hidden">
                              {m.avatar ? <img src={m.avatar} alt={m.name} className="w-full h-full object-cover" /> : <span className="text-xs font-medium">{m.name.split(' ').map(n => n[0]).join('').slice(0,2)}</span>}
                            </div>
                            <span className="text-sm text-[#101828]">{m.name}</span>
                          </div>
                          <span className={`text-xs font-medium ${m.status === 'submitted' ? 'text-[#16a34a]' : 'text-[#dc6803]'}`}>
                            {m.status === 'submitted' ? 'Submitted' : 'Pending'}
                          </span>
                        </div>
                      ))}
                    </div>
                    {/* Overall progress */}
                    <div className="mt-3">
                      {(() => {
                        const total = msg.formRequest!.memberStatuses.length
                        const submitted = msg.formRequest!.memberStatuses.filter(m => m.status === 'submitted').length
                        const percent = Math.round((submitted / total) * 100)
                        return (
                          <div>
                            <div className="flex justify-between text-xs text-[#667085] mb-1">
                              <span>Overall progress</span>
                              <span>{submitted}/{total}</span>
                            </div>
                            <div className="w-full h-2 bg-[#eaecf0] rounded-full overflow-hidden">
                              <div className="h-full bg-[#266273]" style={{ width: `${percent}%` }} />
                            </div>
                          </div>
                        )
                      })()}
                    </div>
                  </div>
                )}

                {/* Form history block */}
                {msg.formHistory && (
                  <div className="mt-3 bg-white rounded-xl border border-[#e9eaeb] p-3">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[#344054] text-sm font-medium">Recent Form Activity (Last 24h)</span>
                      <span className="text-xs text-[#667085]">{msg.formHistory.activities.length} activities</span>
                    </div>
                    <div className="space-y-3">
                      {msg.formHistory.activities.map((activity) => (
                        <div key={activity.id} className="flex items-center gap-3 p-2 rounded-lg bg-[#f8f9fa]">
                          <div className="w-8 h-8 bg-[#266273] rounded-full flex items-center justify-center text-white overflow-hidden flex-shrink-0">
                            {activity.memberAvatar ? (
                              <img src={activity.memberAvatar} alt={activity.memberName} className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-xs font-medium">{activity.memberName.split(' ').map(n => n[0]).join('').slice(0,2)}</span>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-[#101828]">{activity.memberName}</span>
                              <span className="text-xs text-[#667085]">completed</span>
                              <span className="text-sm font-medium text-[#266273]">{activity.formName}</span>
                            </div>
                            <div className="text-xs text-[#667085]">{activity.completedAt}</div>
                          </div>
                          <div className="w-2 h-2 bg-[#16a34a] rounded-full flex-shrink-0" title="Completed" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
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
      <div className="relative flex-shrink-0 bg-white px-3 py-2.5 border-t border-gray-200">
        {/* Slash command helper */}
        {showSlashHelp && (
          <div className="absolute bottom-[64px] left-3 right-3 bg-white border border-[#eaecf0] rounded-xl shadow-lg p-2 z-10">
            <div className="px-2 py-1 text-xs text-[#667085]">Available commands</div>
            {slashCommands.map(cmd => (
              <button
                key={cmd.id}
                onClick={() => {
                  if (cmd.id === 'formrequest') {
                    setShowFormRequest(true)
                    setMessage('')
                  } else if (cmd.id === 'formhistory') {
                    const newMsg: ChatMessage = {
                      id: Date.now().toString(),
                      sender: { name: 'You', role: '', avatar: '' },
                      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                      message: 'Form History',
                      isOwnMessage: true,
                      formHistory: {
                        activities: recentFormHistory
                      }
                    };
                    setMessages(prev => [...prev, newMsg]);
                    setMessage('');
                  } else {
                    setMessage(`/${cmd.id} `)
                  }
                  setShowSlashHelp(false)
                }}
                className="w-full text-left px-2 py-2 rounded-lg hover:bg-[#f8f9fa]"
              >
                <div className="text-sm font-medium text-[#101828]">/{cmd.id} — {cmd.label}</div>
                <div className="text-xs text-[#667085]">{cmd.description}</div>
              </button>
            ))}
          </div>
        )}

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
                onChange={(e) => {
                  const val = e.target.value
                  setMessage(val)
                  if (val === '/' || val.startsWith('/')) {
                    setShowSlashHelp(true)
                  } else {
                    setShowSlashHelp(false)
                  }
                }}
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

      {/* Form Request Slide Up */}
      <FormRequestSlideUp
        isOpen={showFormRequest}
        onClose={() => setShowFormRequest(false)}
        formOptions={formOptions}
        teamMembers={teamMembers}
        onSubmit={handleFormRequestSubmit}
      />

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