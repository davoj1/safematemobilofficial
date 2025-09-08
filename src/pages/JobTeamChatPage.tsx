import React, { useState } from 'react';
import { FormRequestSlideUp, EditTeamRoleModal, ActivePermitsModal, HazardReportModal, JobUpdateSlideUp, HowsItGoingSlideUp, HowsItGoingResponseSlideUp, EnergyLevelsSlideUp, EnergyLevelsResponseSlideUp, BatteryIcon } from '../components/ui';
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
  howsItGoing?: {
    memberStatuses: Array<{ 
      id: string; 
      name: string; 
      avatar?: string; 
      status: 'pending' | 'responded';
      feeling?: string;
      comment?: string;
      respondedAt?: string;
    }>;
  };
  energyLevels?: {
    memberStatuses: Array<{ 
      id: string; 
      name: string; 
      avatar?: string; 
      status: 'pending' | 'responded';
      shift?: string;
      energyLevel?: number;
      comment?: string;
      respondedAt?: string;
    }>;
  };
}

export default function JobTeamChatPage({ onBackToJob }: JobTeamChatPageProps) {
  const [message, setMessage] = useState('');
  const [showAddTeamMatesModal, setShowAddTeamMatesModal] = useState(false);
  const [showFormRequest, setShowFormRequest] = useState(false);
  const [showEditTeamRole, setShowEditTeamRole] = useState(false);
  const [showActivePermits, setShowActivePermits] = useState(false);
  const [showHazardReport, setShowHazardReport] = useState(false);
  const [showJobUpdate, setShowJobUpdate] = useState(false);
  const [showHowsItGoing, setShowHowsItGoing] = useState(false);
  const [showHowsItGoingResponse, setShowHowsItGoingResponse] = useState(false);
  const [showEnergyLevels, setShowEnergyLevels] = useState(false);
  const [showEnergyLevelsResponse, setShowEnergyLevelsResponse] = useState(false);
  const [responseContext, setResponseContext] = useState<{askerName: string, messageId: string, type?: 'howsitgoing' | 'energylevels'} | null>(null);
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
    { id: 'jobupdate', label: 'Job Update', description: 'Update job progress, add notes, and attach photos' },
    { id: 'howsitgoing', label: 'How\'s It Going?', description: 'Check in with team members to see how they\'re doing' },
    { id: 'energylevels', label: 'Energy Levels', description: 'Check team energy levels and shift status' },
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
    if (message.trim().startsWith('/jobupdate')) {
      setShowJobUpdate(true);
      setMessage('');
      setShowSlashHelp(false);
      return;
    }
    if (message.trim().startsWith('/howsitgoing')) {
      setShowHowsItGoing(true);
      setMessage('');
      setShowSlashHelp(false);
      return;
    }
    if (message.trim().startsWith('/energylevels')) {
      setShowEnergyLevels(true);
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
    // Hide slash help when user presses Escape
    if (e.key === 'Escape' && showSlashHelp) {
      setShowSlashHelp(false);
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

  const handleJobUpdateSubmit = (updateData: { progress: number, notes: string, photos: File[] }) => {
    const progressLabels: Record<number, string> = {
      0: 'Not Started',
      25: 'In Progress', 
      50: 'Half Complete',
      75: 'Nearly Done',
      100: 'Complete'
    }
    
    const progressLabel = progressLabels[updateData.progress] || 'In Progress'
    let message = `📊 Job progress updated to ${updateData.progress}% (${progressLabel})`
    
    if (updateData.notes.trim()) {
      message += `\n\n📝 Notes: ${updateData.notes}`
    }
    
    if (updateData.photos.length > 0) {
      message += `\n\n📷 ${updateData.photos.length} photo${updateData.photos.length !== 1 ? 's' : ''} attached`
    }

    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: { name: 'You', role: '', avatar: '' },
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      message: message,
      isOwnMessage: true,
      // Add attachments if photos were included
      ...(updateData.photos.length > 0 && {
        attachments: updateData.photos.map(photo => ({
          type: 'image' as const,
          url: URL.createObjectURL(photo),
          caption: `Job progress photo`
        }))
      })
    }
    setMessages(prev => [...prev, newMsg]);
  }

  const handleHowsItGoingSubmit = (payload: { memberIds: string[], message: string }) => {
    const requestedMembers = teamMembers.filter(m => payload.memberIds.includes(m.id))
    const memberStatuses = requestedMembers.map(m => ({ 
      id: m.id, 
      name: m.name, 
      avatar: m.avatar, 
      status: 'pending' as const 
    }))

    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: { name: 'You', role: '', avatar: '' },
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      message: `👋 @all How's it going? Quick check-in with the team`,
      isOwnMessage: true,
      mentions: requestedMembers.map(m => m.name),
      howsItGoing: {
        memberStatuses
      },
    }
    setMessages(prev => [...prev, newMsg]);
  }

  const handleHowsItGoingResponse = (payload: { feeling: string, comment: string }) => {
    if (!responseContext) return
    
    // Update the original message with the response
    setMessages(prev => prev.map(msg => {
      if (msg.id === responseContext.messageId && msg.howsItGoing) {
        const updatedStatuses = msg.howsItGoing.memberStatuses.map(member => {
          // For demo purposes, we'll update the first pending member
          // In a real app, this would be based on the current user's ID
          if (member.status === 'pending') {
            return {
              ...member,
              status: 'responded' as const,
              feeling: payload.feeling,
              comment: payload.comment,
              respondedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          }
          return member
        })
        
        return {
          ...msg,
          howsItGoing: {
            ...msg.howsItGoing,
            memberStatuses: updatedStatuses
          }
        }
      }
      return msg
    }))
    
    setResponseContext(null)
  }

  const handleEnergyLevelsSubmit = (payload: { memberIds: string[], message: string }) => {
    const requestedMembers = teamMembers.filter(m => payload.memberIds.includes(m.id))
    const memberStatuses = requestedMembers.map(m => ({ 
      id: m.id, 
      name: m.name, 
      avatar: m.avatar, 
      status: 'pending' as const 
    }))

    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: { name: 'You', role: '', avatar: '' },
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      message: `🔋 @all Energy check - checking team energy levels and shift status`,
      isOwnMessage: true,
      mentions: requestedMembers.map(m => m.name),
      energyLevels: {
        memberStatuses
      },
    }
    setMessages(prev => [...prev, newMsg]);
  }

  const handleEnergyLevelsResponse = (payload: { shift: string, energyLevel: number, comment: string }) => {
    if (!responseContext) return
    
    // Update the original message with the response
    setMessages(prev => prev.map(msg => {
      if (msg.id === responseContext.messageId && msg.energyLevels) {
        const updatedStatuses = msg.energyLevels.memberStatuses.map(member => {
          // For demo purposes, we'll update the first pending member
          // In a real app, this would be based on the current user's ID
          if (member.status === 'pending') {
            return {
              ...member,
              status: 'responded' as const,
              shift: payload.shift,
              energyLevel: payload.energyLevel,
              comment: payload.comment,
              respondedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          }
          return member
        })
        
        return {
          ...msg,
          energyLevels: {
            ...msg.energyLevels,
            memberStatuses: updatedStatuses
          }
        }
      }
      return msg
    }))
    
    setResponseContext(null)
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
                    
                    <div className="space-y-3">
                      {/* Type */}
                      <div>
                        <p className="text-xs text-[#667085] mb-1">Type:</p>
                        <p className="text-sm text-[#101828] font-medium">{msg.hazardReport.type}</p>
                      </div>

                      {/* Description */}
                      <div>
                        <p className="text-xs text-[#667085] mb-1">Description:</p>
                        <p className="text-sm text-[#101828] line-clamp-2">{msg.hazardReport.description}</p>
                      </div>

                      {/* Photos */}
                      {msg.hazardReport.photos && msg.hazardReport.photos.length > 0 && (
                        <div>
                          <p className="text-xs text-[#667085] mb-2">Photos ({msg.hazardReport.photos.length}):</p>
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

                      {/* Separator */}
                      <div className="border-t border-[#eaecf0]"></div>

                      {/* Location */}
                      <div>
                        <p className="text-xs text-[#667085] mb-1">Location:</p>
                        <p className="text-sm text-[#101828] font-medium">{msg.hazardReport.location}</p>
                      </div>

                      {/* Map Display */}
                      {msg.hazardReport.coordinates && (
                        <div className="w-full h-40 bg-[#f8f9fa] border border-[#eaecf0] rounded-[8px] overflow-hidden relative">
                          <iframe
                            src={`https://www.openstreetmap.org/export/embed.html?bbox=${msg.hazardReport.coordinates?.lng-0.001},${msg.hazardReport.coordinates?.lat-0.001},${msg.hazardReport.coordinates?.lng+0.001},${msg.hazardReport.coordinates?.lat+0.001}&layer=mapnik&marker=${msg.hazardReport.coordinates?.lat},${msg.hazardReport.coordinates?.lng}`}
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
                              href={`https://www.google.com/maps?q=${msg.hazardReport.coordinates?.lat},${msg.hazardReport.coordinates?.lng}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-[#266273] text-white px-1.5 py-0.5 rounded-[4px] text-xs hover:bg-[#1e4f5a] transition-colors"
                            >
                              Maps
                            </a>
                          </div>
                        </div>
                      )}

                      {/* Coordinates */}
                      {msg.hazardReport.coordinates && (
                        <div>
                          <p className="text-xs text-[#667085] mb-1">Coordinates:</p>
                          <div className="space-y-2">
                            <p className="text-sm text-[#101828] font-medium">
                              {msg.hazardReport.coordinates?.lat.toFixed(6)}, {msg.hazardReport.coordinates?.lng.toFixed(6)}
                            </p>
                            
                            {/* Copy and Share buttons */}
                            <div className="flex gap-2">
                              <button
                                onClick={() => {
                                  const locationText = `${msg.hazardReport?.coordinates?.lat.toFixed(6)}, ${msg.hazardReport?.coordinates?.lng.toFixed(6)}`
                                  navigator.clipboard.writeText(locationText).then(() => {
                                    console.log('Location copied to clipboard')
                                  }).catch(err => {
                                    console.error('Failed to copy location:', err)
                                  })
                                }}
                                className="flex items-center gap-1 px-2 py-1 bg-[#f8f9fa] border border-[#eaecf0] rounded-[8px] text-xs text-[#667085] hover:bg-[#f1f3f4] transition-colors"
                              >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                                Copy
                              </button>
                              <button
                                onClick={() => {
                                  const locationText = `Hazard Location: ${msg.hazardReport?.coordinates?.lat.toFixed(6)}, ${msg.hazardReport?.coordinates?.lng.toFixed(6)}`
                                  const mapsUrl = `https://www.google.com/maps?q=${msg.hazardReport?.coordinates?.lat},${msg.hazardReport?.coordinates?.lng}`
                                  
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
                                className="flex items-center gap-1 px-2 py-1 bg-[#f8f9fa] border border-[#eaecf0] rounded-[8px] text-xs text-[#667085] hover:bg-[#f1f3f4] transition-colors"
                              >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                                </svg>
                                Share
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Separator */}
                      <div className="border-t border-[#eaecf0]"></div>

                      {/* Immediate Actions */}
                      <div>
                        <p className="text-xs text-[#667085] mb-1">Immediate Actions:</p>
                        <p className="text-sm text-[#101828] line-clamp-2">{msg.hazardReport.immediateAction}</p>
                      </div>

                      {/* Separator */}
                      <div className="border-t border-[#eaecf0]"></div>

                      {/* Status */}
                      <div>
                        <p className="text-xs text-[#667085] mb-1">Status:</p>
                        <span className="inline-flex items-center px-2 py-1 bg-red-50 border border-red-200 rounded-full text-xs font-medium text-red-700">
                          Unresolved
                        </span>
                      </div>
                    </div>

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

                {/* How's It Going Card */}
                {msg.howsItGoing && (
                  <div className="mt-3 bg-white rounded-xl border border-[#e9eaeb] p-3">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.01M15 10h1.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <span className="text-[#344054] text-sm font-medium">How's It Going?</span>
                      </div>
                      <span className="text-xs text-[#667085]">
                        {msg.howsItGoing.memberStatuses.filter(m => m.status === 'responded').length}/{msg.howsItGoing.memberStatuses.length} responded
                      </span>
                    </div>
                    
                    <div className="space-y-3">
                      <p className="text-sm text-[#101828]">
                        Team check-in - tap respond to share how you're doing
                      </p>
                      
                      <div className="space-y-2">
                        {msg.howsItGoing.memberStatuses.map((member) => (
                          <div key={member.id} className="flex items-center justify-between p-2 bg-[#f8f9fa] rounded-lg">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 bg-[#266273] rounded-full flex items-center justify-center text-white overflow-hidden">
                                {member.avatar ? (
                                  <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                                ) : (
                                  <span className="text-xs font-medium">{member.name.split(' ').map(n => n[0]).join('').slice(0,2)}</span>
                                )}
                              </div>
                              <span className="text-sm text-[#101828]">{member.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {member.status === 'responded' ? (
                                <div className="flex items-center gap-1">
                                  {member.feeling && (
                                    <span className="text-xs text-[#16a34a] font-medium">
                                      {member.feeling === 'excellent' ? '😊' : 
                                       member.feeling === 'good' ? '🙂' :
                                       member.feeling === 'okay' ? '😐' :
                                       member.feeling === 'struggling' ? '😕' : '😟'}
                                    </span>
                                  )}
                                  <span className="text-xs font-medium text-[#16a34a]">Responded</span>
                                </div>
                              ) : (
                                <button
                                  onClick={() => {
                                    setResponseContext({
                                      askerName: msg.sender.name,
                                      messageId: msg.id,
                                      type: 'howsitgoing'
                                    })
                                    setShowHowsItGoingResponse(true)
                                  }}
                                  className="text-xs text-[#266273] hover:text-[#1e4f5a] font-medium bg-[#f0f9ff] hover:bg-[#e0f2fe] px-2 py-1 rounded transition-colors"
                                >
                                  Respond
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Show responses for message sender */}
                      {msg.isOwnMessage && msg.howsItGoing.memberStatuses.some(m => m.status === 'responded') && (
                        <div className="mt-4 pt-3 border-t border-[#eaecf0]">
                          <p className="text-xs text-[#667085] mb-2">Private responses (only you can see these):</p>
                          <div className="space-y-2">
                            {msg.howsItGoing.memberStatuses
                              .filter(m => m.status === 'responded')
                              .map((member) => (
                                <div key={member.id} className="p-2 bg-[#f0f9ff] rounded-lg border border-[#bfdbfe]">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="text-xs font-medium text-[#101828]">{member.name}</span>
                                    <span className="text-xs text-[#667085]">responded {member.respondedAt}</span>
                                  </div>
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="text-sm">
                                      {member.feeling === 'excellent' ? '😊 Excellent' : 
                                       member.feeling === 'good' ? '🙂 Good' :
                                       member.feeling === 'okay' ? '😐 Okay' :
                                       member.feeling === 'struggling' ? '😕 Struggling' : '😟 Rough'}
                                    </span>
                                  </div>
                                  {member.comment && (
                                    <p className="text-xs text-[#374151] italic">"{member.comment}"</p>
                                  )}
                                </div>
                              ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Energy Levels Card */}
                {msg.energyLevels && (
                  <div className="mt-3 bg-white rounded-xl border border-[#e9eaeb] p-3">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <span className="text-[#344054] text-sm font-medium">Energy Levels Check</span>
                      </div>
                      <span className="text-xs text-[#667085]">
                        {msg.energyLevels.memberStatuses.filter(m => m.status === 'responded').length}/{msg.energyLevels.memberStatuses.length} responded
                      </span>
                    </div>
                    
                    <div className="space-y-3">
                      <p className="text-sm text-[#101828]">
                        Team energy check - tap respond to share your shift and energy level
                      </p>
                      
                      <div className="space-y-2">
                        {msg.energyLevels.memberStatuses.map((member) => (
                          <div key={member.id} className="flex items-center justify-between p-2 bg-[#f8f9fa] rounded-lg">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 bg-[#266273] rounded-full flex items-center justify-center text-white overflow-hidden">
                                {member.avatar ? (
                                  <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                                ) : (
                                  <span className="text-xs font-medium">{member.name.split(' ').map(n => n[0]).join('').slice(0,2)}</span>
                                )}
                              </div>
                              <span className="text-sm text-[#101828]">{member.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {member.status === 'responded' ? (
                                <div className="flex items-center gap-1">
                                  {member.energyLevel !== undefined && (
                                    <BatteryIcon 
                                      level={member.energyLevel as 0 | 1 | 2 | 3 | 4 | 5} 
                                      className="w-5 h-5" 
                                    />
                                  )}
                                  <span className="text-xs text-[#16a34a] font-medium">
                                    {member.shift === 'day' ? '☀️' : '🌙'}
                                  </span>
                                  <span className="text-xs font-medium text-[#16a34a]">Responded</span>
                                </div>
                              ) : (
                                <button
                                  onClick={() => {
                                    setResponseContext({
                                      askerName: msg.sender.name,
                                      messageId: msg.id,
                                      type: 'energylevels'
                                    })
                                    setShowEnergyLevelsResponse(true)
                                  }}
                                  className="text-xs text-[#266273] hover:text-[#1e4f5a] font-medium bg-[#f0f9ff] hover:bg-[#e0f2fe] px-2 py-1 rounded transition-colors"
                                >
                                  Respond
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Show responses for message sender */}
                      {msg.isOwnMessage && msg.energyLevels.memberStatuses.some(m => m.status === 'responded') && (
                        <div className="mt-4 pt-3 border-t border-[#eaecf0]">
                          <p className="text-xs text-[#667085] mb-2">Private responses (only you can see these):</p>
                          <div className="space-y-2">
                            {msg.energyLevels.memberStatuses
                              .filter(m => m.status === 'responded')
                              .map((member) => (
                                <div key={member.id} className="p-2 bg-[#f0f9ff] rounded-lg border border-[#bfdbfe]">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="text-xs font-medium text-[#101828]">{member.name}</span>
                                    <span className="text-xs text-[#667085]">responded {member.respondedAt}</span>
                                  </div>
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="text-xs text-[#374151]">
                                      {member.shift === 'day' ? '☀️ Day Shift' : '🌙 Night Shift'}
                                    </span>
                                    {member.energyLevel !== undefined && (
                                      <div className="flex items-center gap-1">
                                        <BatteryIcon 
                                          level={member.energyLevel as 0 | 1 | 2 | 3 | 4 | 5} 
                                          className="w-4 h-4" 
                                        />
                                        <span className="text-xs text-[#374151]">
                                          {member.energyLevel === 0 ? 'Empty' :
                                           member.energyLevel === 1 ? 'Very Low' :
                                           member.energyLevel === 2 ? 'Low' :
                                           member.energyLevel === 3 ? 'Medium' :
                                           member.energyLevel === 4 ? 'High' : 'Full'}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                  {member.comment && (
                                    <p className="text-xs text-[#374151] italic">"{member.comment}"</p>
                                  )}
                                </div>
                              ))}
                          </div>
                        </div>
                      )}
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
        {showSlashHelp && (() => {
          const filteredCommands = slashCommands.filter(cmd => {
            // If user just typed '/', show all commands
            if (message === '/') return true
            // If user typed '/something', filter commands that start with that text
            if (message.startsWith('/')) {
              const searchTerm = message.slice(1).toLowerCase() // Remove '/' and convert to lowercase
              return cmd.id.toLowerCase().startsWith(searchTerm) || cmd.label.toLowerCase().includes(searchTerm)
            }
            return false
          })

          return (
            <div className="absolute bottom-[64px] left-3 right-3 bg-white border border-[#eaecf0] rounded-xl shadow-lg p-2 z-10">
              <div className="px-2 py-1 text-xs text-[#667085]">
                {filteredCommands.length > 0 ? 'Available commands' : 'No matching commands'}
              </div>
              {filteredCommands.length > 0 ? filteredCommands.map(cmd => (
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
                  } else if (cmd.id === 'jobupdate') {
                    setShowJobUpdate(true);
                    setMessage('');
                  } else if (cmd.id === 'howsitgoing') {
                    setShowHowsItGoing(true);
                    setMessage('');
                  } else if (cmd.id === 'energylevels') {
                    setShowEnergyLevels(true);
                    setMessage('');
                  } else if (cmd.id === 'hazardreport') {
                    setShowHazardReport(true);
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
              )) : (
                <div className="px-2 py-2 text-xs text-[#667085] italic">Type a command name to filter</div>
              )}
            </div>
          )
        })()}

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
                  // Show slash help when user types '/' or continues typing a command
                  if (val.startsWith('/') && val.length > 0) {
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

      {/* Job Update Slide Up */}
      <JobUpdateSlideUp
        isOpen={showJobUpdate}
        onClose={() => setShowJobUpdate(false)}
        onSubmit={handleJobUpdateSubmit}
      />

      {/* How's It Going Slide Up */}
      <HowsItGoingSlideUp
        isOpen={showHowsItGoing}
        onClose={() => setShowHowsItGoing(false)}
        teamMembers={teamMembers}
        onSubmit={handleHowsItGoingSubmit}
      />

      {/* How's It Going Response Slide Up */}
      <HowsItGoingResponseSlideUp
        isOpen={showHowsItGoingResponse}
        onClose={() => {
          setShowHowsItGoingResponse(false)
          setResponseContext(null)
        }}
        askerName={responseContext?.askerName || ''}
        onSubmit={handleHowsItGoingResponse}
      />

      {/* Energy Levels Slide Up */}
      <EnergyLevelsSlideUp
        isOpen={showEnergyLevels}
        onClose={() => setShowEnergyLevels(false)}
        teamMembers={teamMembers}
        onSubmit={handleEnergyLevelsSubmit}
      />

      {/* Energy Levels Response Slide Up */}
      <EnergyLevelsResponseSlideUp
        isOpen={showEnergyLevelsResponse}
        onClose={() => {
          setShowEnergyLevelsResponse(false)
          setResponseContext(null)
        }}
        askerName={responseContext?.askerName || ''}
        onSubmit={handleEnergyLevelsResponse}
      />
    </div>
  );
} 