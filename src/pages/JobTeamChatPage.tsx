import React, { useState } from 'react';
import { FormRequestSlideUp, EditTeamRoleModal, ActivePermitsModal, HazardReportModal } from '../components/ui';
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
  roleChanges?: {
    changes: Array<{
      memberId: string;
      memberName: string;
      newRole: string;
      oldRole?: string;
    }>
  };
  permitRequest?: {
    permitId: string;
    permitType: string;
    action: 'sign-on' | 'sign-off';
    memberStatuses: Array<{ id: string; name: string; avatar?: string; status: 'pending' | 'completed' }>
  };
  hazardReport?: {
    id: string;
    type: string;
    severity: string;
    location: string;
    coordinates?: {lat: number, lng: number, address?: string};
    description: string;
    immediateAction: string;
    photos?: Array<{
      name: string;
      url: string;
      size: number;
    }>;
    reportedBy: string;
    reportedAt: string;
    status: string;
  };
  permitReminder?: {
    permits: Array<{
      id: string;
      type: string;
      createdAt: string;
      signedOnMembers: string[];
    }>;
    totalSignedOn: number;
    reminderTime: string;
  };
}

export default function JobTeamChatPage({ onBackToJob }: JobTeamChatPageProps) {
  const [message, setMessage] = useState('');
  const [showAddTeamMatesModal, setShowAddTeamMatesModal] = useState(false);
  const [showFormRequest, setShowFormRequest] = useState(false);
  const [showEditTeamRole, setShowEditTeamRole] = useState(false);
  const [showActivePermits, setShowActivePermits] = useState(false);
  const [showHazardReport, setShowHazardReport] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [showSlashHelp, setShowSlashHelp] = useState(false);

  // Sample chat messages based on Figma design
  const chatMessages: ChatMessage[] = [
    {
      id: '1',
      sender: {
        name: 'Linda',
        role: 'Worker',
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
    { id: 'linda', name: 'Linda', avatar: lindaAvatar, currentRole: 'worker' },
    { id: 'josh', name: 'Josh', avatar: joshAvatar, currentRole: 'supervisor' },
    { id: 'david', name: 'David', currentRole: 'worker' },
    { id: 'jack', name: 'Jack', currentRole: 'team-leader' },
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
    { id: 'editroles', label: 'Edit Roles', description: 'Update team member roles and responsibilities' },
    { id: 'activepermits', label: 'Active Permits', description: 'Manage active work permits and team sign-ons' },
    { id: 'hazardreport', label: 'Hazard Report', description: 'Report a safety hazard to the team' },
    { id: 'reminder', label: 'Permit Reminder', description: 'Send reminder to team members signed onto active permits' },
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
    if (message.trim().startsWith('/editroles')) {
      setShowEditTeamRole(true);
      setMessage('');
      setShowSlashHelp(false);
      return;
    }
    if (message.trim().startsWith('/activepermits')) {
      setShowActivePermits(true);
      setMessage('');
      setShowSlashHelp(false);
      return;
    }
    if (message.trim().startsWith('/hazardreport')) {
      setShowHazardReport(true);
      setMessage('');
      setShowSlashHelp(false);
      return;
    }
    if (message.trim().startsWith('/reminder')) {
      handlePermitReminder();
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

  const handleRoleChangesSubmit = (roleChanges: Array<{ memberId: string; memberName: string; newRole: string; oldRole?: string }>) => {
    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: { name: 'You', role: '', avatar: '' },
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      message: 'Team roles updated',
      isOwnMessage: true,
      roleChanges: {
        changes: roleChanges
      },
    }
    setMessages(prev => [...prev, newMsg]);
  }

  const handlePermitRequestSubmit = (payload: { permitId: string; permitType: string; action: 'sign-on' | 'sign-off'; memberIds: string[] }) => {
    const requestedMembers = teamMembers.filter(m => payload.memberIds.includes(m.id))
    const memberStatuses = requestedMembers.map(m => ({ id: m.id, name: m.name, avatar: m.avatar, status: 'pending' as const }))

    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: { name: 'You', role: '', avatar: '' },
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      message: `Permit request: ${payload.permitType} - ${payload.action === 'sign-on' ? 'Sign On' : 'Sign Off'}`,
      isOwnMessage: true,
      mentions: requestedMembers.map(m => m.name),
      permitRequest: {
        permitId: payload.permitId,
        permitType: payload.permitType,
        action: payload.action,
        memberStatuses,
      },
    }
    setMessages(prev => [...prev, newMsg]);
  }

  const handleHazardReportSubmit = (hazardData: any) => {
    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: { name: 'You', role: '', avatar: '' },
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      message: `🚨 @all Hazard reported: ${hazardData.type} - Please review immediately`,
      isOwnMessage: true,
      hazardReport: hazardData,
    }
    setMessages(prev => [...prev, newMsg]);
  }

  const handlePermitReminder = () => {
    // Hardcoded active permits data
    const activePermits = [
      {
        id: '1',
        type: 'Hot Works',
        createdAt: 'Today, 08:30 AM',
        signedOnMembers: ['Josh', 'Linda', 'Marvin']
      },
      {
        id: '2', 
        type: 'Working at Heights',
        createdAt: 'Today, 09:15 AM',
        signedOnMembers: ['Josh', 'Theresa']
      },
      {
        id: '3',
        type: 'Confined Spaces',
        createdAt: 'Yesterday, 2:45 PM',
        signedOnMembers: ['Linda', 'Marvin', 'Arlene']
      }
    ]

    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: { name: 'You', role: '', avatar: '' },
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      message: `📋 @all Permit Reminder - Please review your active permits`,
      isOwnMessage: true,
      permitReminder: {
        permits: activePermits,
        totalSignedOn: activePermits.reduce((total, permit) => total + permit.signedOnMembers.length, 0),
        reminderTime: new Date().toLocaleString()
      }
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

                {/* Role changes block */}
                {msg.roleChanges && (
                  <div className="mt-3 bg-white rounded-xl border border-[#e9eaeb] p-3">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[#344054] text-sm font-medium">Team Role Updates</span>
                      <span className="text-xs text-[#667085]">{msg.roleChanges.changes.length} change{msg.roleChanges.changes.length !== 1 ? 's' : ''}</span>
                    </div>
                    <div className="space-y-3">
                      {msg.roleChanges.changes.map((change, index) => (
                        <div key={index} className="flex items-center gap-3 p-2 rounded-lg bg-[#f8f9fa]">
                          <div className="w-8 h-8 bg-[#266273] rounded-full flex items-center justify-center text-white overflow-hidden flex-shrink-0">
                            <span className="text-xs font-medium">{change.memberName.split(' ').map(n => n[0]).join('').slice(0,2)}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-sm font-medium text-[#101828]">{change.memberName}</span>
                              <span className="text-xs text-[#667085]">role changed to</span>
                              <span className="text-sm font-medium text-[#266273] bg-[#e0f2fe] px-2 py-1 rounded-full">
                                {change.newRole.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                              </span>
                            </div>
                            {change.oldRole && (
                              <div className="text-xs text-[#667085] mt-1">
                                Previous: {change.oldRole.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                              </div>
                            )}
                          </div>
                          <div className="w-2 h-2 bg-[#2563eb] rounded-full flex-shrink-0" title="Role Updated" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Permit request block */}
                {msg.permitRequest && (
                  <div className="mt-3 bg-white rounded-xl border border-[#e9eaeb] p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[#344054] text-sm font-medium">
                        Permit: {msg.permitRequest.permitType} - {msg.permitRequest.action === 'sign-on' ? 'Sign On' : 'Sign Off'}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {msg.permitRequest.memberStatuses.map((m) => (
                        <div key={m.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 bg-[#266273] rounded-full flex items-center justify-center text-white overflow-hidden">
                              {m.avatar ? <img src={m.avatar} alt={m.name} className="w-full h-full object-cover" /> : <span className="text-xs font-medium">{m.name.split(' ').map(n => n[0]).join('').slice(0,2)}</span>}
                            </div>
                            <span className="text-sm text-[#101828]">{m.name}</span>
                          </div>
                          <span className={`text-xs font-medium ${m.status === 'completed' ? 'text-[#16a34a]' : 'text-[#dc6803]'}`}>
                            {m.status === 'completed' ? 'Completed' : 'Pending'}
                          </span>
                        </div>
                      ))}
                    </div>
                    {/* Overall progress */}
                    <div className="mt-3">
                      {(() => {
                        const total = msg.permitRequest!.memberStatuses.length
                        const completed = msg.permitRequest!.memberStatuses.filter(m => m.status === 'completed').length
                        const percent = Math.round((completed / total) * 100)
                        return (
                          <div>
                            <div className="flex justify-between text-xs text-[#667085] mb-1">
                              <span>Overall progress</span>
                              <span>{completed}/{total}</span>
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

                {/* Hazard report block */}
                {msg.hazardReport && (
                  <div className="mt-3 bg-white rounded-xl border border-[#e9eaeb] p-3">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                          </svg>
                        </div>
                        <span className="text-[#344054] text-sm font-medium">Hazard Report</span>
                      </div>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        msg.hazardReport.severity === 'critical' ? 'bg-red-100 text-red-800' :
                        msg.hazardReport.severity === 'high' ? 'bg-red-50 text-red-600' :
                        msg.hazardReport.severity === 'medium' ? 'bg-yellow-50 text-yellow-600' :
                        'bg-green-50 text-green-600'
                      }`}>
                        {msg.hazardReport.severity.charAt(0).toUpperCase() + msg.hazardReport.severity.slice(1)} Risk
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-xs text-[#667085]">Type:</span>
                        <span className="text-sm text-[#101828] font-medium">{msg.hazardReport.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-[#667085]">Location:</span>
                        <span className="text-sm text-[#101828] font-medium">{msg.hazardReport.location}</span>
                      </div>
                      {msg.hazardReport.coordinates && (
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-[#667085]">Coordinates:</span>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-[#101828] font-medium">
                                {msg.hazardReport.coordinates.lat.toFixed(6)}, {msg.hazardReport.coordinates.lng.toFixed(6)}
                              </span>
                              <button
                                onClick={() => {
                                  const locationText = `${msg.hazardReport.coordinates.lat.toFixed(6)}, ${msg.hazardReport.coordinates.lng.toFixed(6)}`
                                  navigator.clipboard.writeText(locationText).then(() => {
                                    console.log('Location copied to clipboard')
                                  }).catch(err => {
                                    console.error('Failed to copy location:', err)
                                  })
                                }}
                                className="w-4 h-4 flex items-center justify-center text-[#667085] hover:text-[#266273] transition-colors"
                              >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                              </button>
                              <button
                                onClick={() => {
                                  const locationText = `Hazard Location: ${msg.hazardReport.coordinates.lat.toFixed(6)}, ${msg.hazardReport.coordinates.lng.toFixed(6)}`
                                  const mapsUrl = `https://www.google.com/maps?q=${msg.hazardReport.coordinates.lat},${msg.hazardReport.coordinates.lng}`
                                  
                                  if (navigator.share) {
                                    navigator.share({
                                      title: 'Hazard Location',
                                      text: locationText,
                                      url: mapsUrl
                                    }).catch(err => {
                                      console.error('Error sharing location:', err)
                                    })
                                  } else {
                                    navigator.clipboard.writeText(`${locationText}\n${mapsUrl}`).then(() => {
                                      console.log('Location shared via clipboard')
                                    }).catch(err => {
                                      console.error('Failed to share location:', err)
                                    })
                                  }
                                }}
                                className="w-4 h-4 flex items-center justify-center text-[#667085] hover:text-[#266273] transition-colors"
                              >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                                </svg>
                              </button>
                            </div>
                          </div>
                          
                          {/* Map Display */}
                          <div className="w-full h-24 bg-[#f8f9fa] border border-[#eaecf0] rounded-[8px] overflow-hidden relative">
                            <iframe
                              src={`https://www.openstreetmap.org/export/embed.html?bbox=${msg.hazardReport.coordinates.lng-0.001},${msg.hazardReport.coordinates.lat-0.001},${msg.hazardReport.coordinates.lng+0.001},${msg.hazardReport.coordinates.lat+0.001}&layer=mapnik&marker=${msg.hazardReport.coordinates.lat},${msg.hazardReport.coordinates.lng}`}
                              width="100%"
                              height="100%"
                              style={{ border: 0 }}
                              title="Hazard Location Map"
                            />
                            <div className="absolute top-1 right-1 bg-white bg-opacity-90 px-1 py-0.5 rounded-[4px] text-xs text-[#667085]">
                              📍
                            </div>
                            <div className="absolute bottom-1 left-1">
                              <a
                                href={`https://www.google.com/maps?q=${msg.hazardReport.coordinates.lat},${msg.hazardReport.coordinates.lng}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-[#266273] text-white px-1.5 py-0.5 rounded-[4px] text-xs hover:bg-[#1e4f5a] transition-colors"
                              >
                                Maps
                              </a>
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-xs text-[#667085]">Status:</span>
                        <span className="text-sm text-[#101828] font-medium">{msg.hazardReport.status}</span>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-[#eaecf0]">
                      <p className="text-xs text-[#667085] mb-1">Description:</p>
                      <p className="text-sm text-[#101828] line-clamp-2">{msg.hazardReport.description}</p>
                    </div>

                    <div className="mt-3 pt-3 border-t border-[#eaecf0]">
                      <p className="text-xs text-[#667085] mb-1">Immediate Actions:</p>
                      <p className="text-sm text-[#101828] line-clamp-2">{msg.hazardReport.immediateAction}</p>
                    </div>

                    {/* Photos Grid */}
                    {msg.hazardReport.photos && msg.hazardReport.photos.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-[#eaecf0]">
                        <p className="text-xs text-[#667085] mb-2">Photos ({msg.hazardReport.photos.length})</p>
                        <div className="grid grid-cols-2 gap-2">
                          {msg.hazardReport.photos.slice(0, 3).map((photo, index) => (
                            <div key={index} className="relative">
                              <img
                                src={photo.url}
                                alt={photo.name}
                                className="w-full h-20 object-cover rounded-[8px] border border-[#eaecf0] cursor-pointer hover:opacity-80 transition-opacity"
                              />
                            </div>
                          ))}
                          {msg.hazardReport.photos.length > 3 && (
                            <div className="relative cursor-pointer hover:opacity-80 transition-opacity">
                              <img
                                src={msg.hazardReport.photos[3].url}
                                alt={msg.hazardReport.photos[3].name}
                                className="w-full h-20 object-cover rounded-[8px] border border-[#eaecf0] filter blur-sm"
                              />
                              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-[8px]">
                                <span className="text-white text-sm font-medium">
                                  +{msg.hazardReport.photos.length - 3}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="mt-3 pt-3 border-t border-[#eaecf0]">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-[#667085]">Reported by {msg.hazardReport.reportedBy}</span>
                        <span className="text-xs text-[#667085]">{new Date(msg.hazardReport.reportedAt).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Permit Reminder Card */}
                {msg.permitReminder && (
                  <div className="mt-3 bg-white rounded-xl border border-[#e9eaeb] p-3">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                          </svg>
                        </div>
                        <span className="text-[#344054] text-sm font-medium">Permit Reminder</span>
                      </div>
                      <span className="text-xs text-[#667085]">
                        {msg.permitReminder.totalSignedOn} team members signed on
                      </span>
                    </div>
                    
                    <div className="space-y-3">
                      <p className="text-sm text-[#101828]">
                        Please review your active permits and ensure you're still authorized to work on them.
                      </p>
                      
                      {msg.permitReminder.permits.map((permit) => (
                        <div key={permit.id} className="p-3 bg-[#f8f9fa] rounded-[12px] border border-[#eaecf0]">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-[#101828]">{permit.type}</span>
                            <span className="text-xs text-[#667085]">Created: {permit.createdAt}</span>
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs text-[#667085]">
                              Signed On ({permit.signedOnMembers.length}):
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {permit.signedOnMembers.map((member, index) => (
                                <span key={index} className="inline-flex items-center px-2 py-1 bg-[#e0f2fe] border border-[#bfdbfe] rounded-full text-xs text-[#101828]">
                                  {member}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-[#eaecf0]">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-[#667085]">Reminder sent at {msg.permitReminder.reminderTime}</span>
                        <button className="text-xs text-[#266273] hover:text-[#1e4f5a] transition-colors">
                          View All Permits
                        </button>
                      </div>
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
                  } else if (cmd.id === 'editroles') {
                    setShowEditTeamRole(true);
                    setMessage('');
                  } else if (cmd.id === 'activepermits') {
                    setShowActivePermits(true);
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

      {/* Edit Team Role Modal */}
      <EditTeamRoleModal
        isOpen={showEditTeamRole}
        onClose={() => setShowEditTeamRole(false)}
        teamMembers={teamMembers}
        onSubmit={handleRoleChangesSubmit}
      />

      {/* Active Permits Modal */}
      <ActivePermitsModal
        isOpen={showActivePermits}
        onClose={() => setShowActivePermits(false)}
        teamMembers={teamMembers}
        onSubmit={handlePermitRequestSubmit}
      />

      {/* Hazard Report Modal */}
      <HazardReportModal
        isOpen={showHazardReport}
        onClose={() => setShowHazardReport(false)}
        onSubmit={handleHazardReportSubmit}
      />
    </div>
  );
} 