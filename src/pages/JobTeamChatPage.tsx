import React, { useState } from 'react';
import { FormRequestSlideUp, EditTeamRoleModal, ActivePermitsModal, HazardReportModal, JobUpdateSlideUp, HowsItGoingSlideUp, HowsItGoingResponseSlideUp, EnergyLevelsSlideUp, EnergyLevelsResponseSlideUp, RequestPPESlideUp, ShoutoutSlideUp, BatteryIcon, RallyTheTroopsSlideUp, RallyFormSelectionSlideUp } from '../components/ui';
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
import goodlinePpeRequest from '../assets/goodline/goodlinepperequest.png';
// Import PPE icons from Rio Tinto form
import ppeHeadIcon from '../assets/controls/ppehead.png';
import ppeHearingIcon from '../assets/controls/ppehearing.png';
import ppeEyesIcon from '../assets/controls/ppeeyes.png';
import ppeFeetIcon from '../assets/controls/ppefeet.png';
import ppeHandsIcon from '../assets/controls/ppehands.png';

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
  ppeRequest?: {
    selectedPPE: string[];
    comment: string;
    pickupLocation?: {lat: number, lng: number, address?: string};
    pickupComment: string;
    status: 'pending' | 'approved' | 'ready' | 'collected';
    requestedAt: string;
  };
  shoutout?: {
    recognizedMembers: Array<{
      id: string;
      name: string;
      avatar?: string;
    }>;
    message: string;
    photos?: Array<{
      name: string;
      url: string;
      size: number;
    }>;
    timestamp: string;
  };
  shiftStatus?: {
    action: 'start' | 'end';
    status: 'Active' | 'Inactive';
    timestamp: string;
  };
  rallyCompetition?: {
    id: string;
    formName: string;
    formId: string;
    startTime: string;
    endTime?: string;
    status: 'scheduled' | 'active' | 'completed';
    teams: Array<{
      teamId: string;
      teamName: string;
      members: Array<{
        id: string;
        name: string;
        avatar?: string;
        status: 'pending' | 'submitted';
        submittedAt?: string;
      }>;
      completedCount: number;
      totalCount: number;
      isWinner?: boolean;
    }>;
    winner?: {
      teamId: string;
      teamName: string;
      completedAt: string;
    };
    points: number;
    createdBy: string;
    createdAt: string;
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
  const [showRequestPPE, setShowRequestPPE] = useState(false);
  const [showShoutout, setShowShoutout] = useState(false);
  const [showRallyTheTroops, setShowRallyTheTroops] = useState(false)
  const [showRallyFormSelection, setShowRallyFormSelection] = useState(false)
  const [selectedCompetitionId, setSelectedCompetitionId] = useState<string>('');
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
    { id: 'pperequest', label: 'PPE Request', description: 'Request Personal Protective Equipment with pickup location' },
    { id: 'shoutout', label: 'Team Shoutout', description: 'Recognize teammates for their great work with photos and comments' },
    { id: 'reminder', label: 'Permit Reminder', description: 'Send reminder to team members signed onto active permits' },
    { id: 'startshift', label: 'Start Shift', description: 'Mark yourself as active and available for notifications' },
    { id: 'endshift', label: 'End Shift', description: 'Mark yourself as inactive and unavailable for notifications' },
    { id: 'rallythetroops', label: 'Rally the Troops', description: 'Start a mini-competition between teams (HSE only)' },
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
    if (message.trim().startsWith('/pperequest')) {
      setShowRequestPPE(true);
      setMessage('');
      setShowSlashHelp(false);
      return;
    }
    if (message.trim().startsWith('!shoutout')) {
      setShowShoutout(true);
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
    if (message.trim().startsWith('/startshift')) {
      handleStartShift();
      setMessage('');
      setShowSlashHelp(false);
      return;
    }
    if (message.trim().startsWith('/endshift')) {
      handleEndShift();
      setMessage('');
      setShowSlashHelp(false);
      return;
    }
    if (message.trim().startsWith('/rallythetroops')) {
      // Check if user has HSE role (mock check for now)
      const currentUserRole = 'HSE'; // In real app, this would come from user context
      if (currentUserRole === 'HSE') {
        setShowRallyTheTroops(true);
        setMessage('');
        setShowSlashHelp(false);
      } else {
        // Show error message for non-HSE users
        const errorMsg: ChatMessage = {
          id: Date.now().toString(),
          sender: { name: 'System', role: '', avatar: '' },
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          message: '❌ Only HSE roles can use /rallythetroops command',
          isOwnMessage: false,
        }
        setMessages(prev => [...prev, errorMsg]);
        setMessage('');
        setShowSlashHelp(false);
      }
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

  const handleRequestPPESubmit = (payload: { 
    selectedPPE: string[], 
    comment: string, 
    pickupLocation?: {lat: number, lng: number, address?: string},
    pickupComment: string 
  }) => {
    const ppeNames: Record<string, string> = {
      'hard-hat': 'Hard Hat',
      'earplugs': 'Earplugs',
      'safety-glasses': 'Safety Glasses',
      'boots': 'Safety Boots',
      'gloves': 'Safety Gloves'
    }

    const selectedNames = payload.selectedPPE.map(id => ppeNames[id]).join(', ')
    
    let message = `🦺 PPE Request: ${selectedNames}`
    if (payload.comment.trim()) {
      message += `\n📝 ${payload.comment}`
    }
    if (payload.pickupLocation) {
      message += `\n📍 Pickup location specified`
    }

    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: { name: 'You', role: '', avatar: '' },
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      message: message,
      isOwnMessage: true,
      ppeRequest: {
        selectedPPE: payload.selectedPPE,
        comment: payload.comment,
        pickupLocation: payload.pickupLocation,
        pickupComment: payload.pickupComment,
        status: 'pending',
        requestedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    }
    setMessages(prev => [...prev, newMsg]);
  }

  const handleShoutoutSubmit = (payload: { 
    selectedMembers: string[], 
    message: string, 
    photos: File[] 
  }) => {
    const recognizedMembers = teamMembers.filter(m => payload.selectedMembers.includes(m.id))
    const memberNames = recognizedMembers.map(m => m.name).join(', ')
    
    let chatMessage = `🎉 Team Shoutout for ${memberNames}!\n\n${payload.message}`
    if (payload.photos.length > 0) {
      chatMessage += `\n\n📷 ${payload.photos.length} photo${payload.photos.length !== 1 ? 's' : ''} attached`
    }

    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: { name: 'You', role: '', avatar: '' },
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      message: chatMessage,
      isOwnMessage: true,
      mentions: recognizedMembers.map(m => m.name),
      shoutout: {
        recognizedMembers: recognizedMembers.map(m => ({
          id: m.id,
          name: m.name,
          avatar: m.avatar
        })),
        message: payload.message,
        photos: payload.photos.map(photo => ({
          name: photo.name,
          url: URL.createObjectURL(photo),
          size: photo.size
        })),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      },
      // Add attachments if photos were included
      ...(payload.photos.length > 0 && {
        attachments: payload.photos.map(photo => ({
          type: 'image' as const,
          url: URL.createObjectURL(photo),
          caption: `Shoutout photo`
        }))
      })
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

  const handleStartShift = () => {
    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: { name: 'You', role: '', avatar: '' },
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      message: 'Shift started - Status: Active',
      isOwnMessage: true,
      shiftStatus: {
        action: 'start',
        status: 'Active',
        timestamp: new Date().toLocaleString()
      }
    }
    setMessages(prev => [...prev, newMsg]);
  }

  const handleEndShift = () => {
    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: { name: 'You', role: '', avatar: '' },
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      message: 'Shift ended - Status: Inactive',
      isOwnMessage: true,
      shiftStatus: {
        action: 'end',
        status: 'Inactive',
        timestamp: new Date().toLocaleString()
      }
    }
    setMessages(prev => [...prev, newMsg]);
  }

  const handleRallyTheTroopsSubmit = (payload: { formId: string, formName: string, startDelay: number }) => {
    // Mock teams data
    const mockTeams = [
      {
        teamId: 'team1',
        teamName: 'Alpha Team',
        members: [
          { id: '1', name: 'Josh', avatar: joshAvatar, status: 'pending' as const },
          { id: '2', name: 'Linda', avatar: lindaAvatar, status: 'pending' as const },
          { id: '3', name: 'Marvin', avatar: '', status: 'pending' as const },
          { id: '4', name: 'Theresa', avatar: '', status: 'pending' as const }
        ],
        completedCount: 0,
        totalCount: 4,
        isWinner: false
      },
      {
        teamId: 'team2',
        teamName: 'Beta Team',
        members: [
          { id: '5', name: 'Arlene', avatar: '', status: 'pending' as const },
          { id: '6', name: 'Bessie', avatar: '', status: 'pending' as const },
          { id: '7', name: 'Cody', avatar: '', status: 'pending' as const },
          { id: '8', name: 'Darlene', avatar: '', status: 'pending' as const }
        ],
        completedCount: 0,
        totalCount: 4,
        isWinner: false
      }
    ];

    const startTime = new Date(Date.now() + (payload.startDelay * 1000));
    
    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: { name: 'You', role: 'HSE', avatar: '' },
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      message: payload.startDelay > 0 
        ? `🏆 Rally the Troops Competition Scheduled!` 
        : `🏆 Rally the Troops Competition Started!`,
      isOwnMessage: true,
      rallyCompetition: {
        id: `rally_${Date.now()}`,
        formName: payload.formName,
        formId: payload.formId,
        startTime: startTime.toISOString(),
        status: payload.startDelay > 0 ? 'scheduled' : 'active',
        teams: mockTeams,
        points: 100,
        createdBy: 'You (HSE)',
        createdAt: new Date().toISOString()
      }
    }
    setMessages(prev => [...prev, newMsg]);
    setShowRallyTheTroops(false);
  }

  const handleRallyFormSelection = (formId: string, formName: string) => {
    // Create a success message for the form submission
    const submissionMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: { name: 'You', role: '', avatar: '' },
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      message: `✅ ${formName} submitted for Rally Competition!`,
      isOwnMessage: true
    };

    setMessages(prev => [...prev, submissionMsg]);

    // Update the rally competition message to show user's submission
    setMessages(prev => prev.map(msg => {
      if (msg.rallyCompetition?.id === selectedCompetitionId) {
        const updatedCompetition = { ...msg.rallyCompetition };
        
        // Find the user's team and update their status (mock user ID as '1' - Josh)
        updatedCompetition.teams = updatedCompetition.teams.map(team => ({
          ...team,
          members: team.members.map(member => 
            member.id === '1' // Mock current user ID (Josh)
              ? { ...member, status: 'submitted' as const, submittedAt: new Date().toISOString() }
              : member
          ),
          completedCount: team.members.filter(m => 
            m.id === '1' ? true : m.status === 'submitted'
          ).length
        }));

        // Check if any team has completed all forms (winner)
        const winningTeam = updatedCompetition.teams.find(team => 
          team.completedCount === team.totalCount
        );

        if (winningTeam && !updatedCompetition.winner) {
          // Mark the winning team
          updatedCompetition.teams = updatedCompetition.teams.map(team => ({
            ...team,
            isWinner: team.teamId === winningTeam.teamId
          }));

          // Set the winner
          updatedCompetition.winner = {
            teamId: winningTeam.teamId,
            teamName: winningTeam.teamName,
            completedAt: new Date().toISOString()
          };
        }

        return {
          ...msg,
          rallyCompetition: updatedCompetition
        };
      }
      return msg;
    }));

    setShowRallyFormSelection(false);
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

                {/* PPE Request Card */}
                {msg.ppeRequest && (
                  <div className="mt-3 bg-white rounded-xl border border-[#e9eaeb] p-3">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        </div>
                        <span className="text-[#344054] text-sm font-medium">PPE Request</span>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        msg.ppeRequest.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        msg.ppeRequest.status === 'approved' ? 'bg-blue-100 text-blue-800' :
                        msg.ppeRequest.status === 'ready' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {msg.ppeRequest.status.charAt(0).toUpperCase() + msg.ppeRequest.status.slice(1)}
                      </span>
                    </div>
                    
                    {/* PPE Request Image */}
                    <div className="mb-3 w-full rounded-lg overflow-hidden border border-[#eaecf0] bg-[#f8fafc]">
                      <img src={goodlinePpeRequest} alt="PPE Request" className="w-full object-contain" />
                    </div>
                    
                    <div className="space-y-3">
                      <p className="text-sm text-[#101828]">
                        Personal Protective Equipment request submitted
                      </p>
                      
                      {/* Requested PPE Items */}
                      <div className="space-y-2">
                        <h4 className="text-xs font-medium text-[#667085] uppercase tracking-wide">Requested Items</h4>
                        <div className="flex flex-wrap gap-2">
                          {msg.ppeRequest.selectedPPE.map(id => {
                            const ppeNames: Record<string, string> = {
                              'hard-hat': 'Hard Hat',
                              'earplugs': 'Earplugs',
                              'safety-glasses': 'Safety Glasses',
                              'boots': 'Safety Boots',
                              'gloves': 'Safety Gloves'
                            }
                            const ppeIcons: Record<string, string> = {
                              'hard-hat': ppeHeadIcon,
                              'earplugs': ppeHearingIcon,
                              'safety-glasses': ppeEyesIcon,
                              'boots': ppeFeetIcon,
                              'gloves': ppeHandsIcon
                            }
                            return (
                              <div key={id} className="flex items-center gap-2 bg-[#f8f9fa] border border-[#eaecf0] rounded-lg px-3 py-2">
                                <img 
                                  src={ppeIcons[id]} 
                                  alt={ppeNames[id]}
                                  className="w-6 h-6 flex-shrink-0"
                                />
                                <span className="text-sm font-medium text-[#374151]">{ppeNames[id]}</span>
                              </div>
                            )
                          })}
                        </div>
                      </div>

                      {/* Comments */}
                      {msg.ppeRequest.comment && (
                        <div className="space-y-2">
                          <h4 className="text-xs font-medium text-[#667085] uppercase tracking-wide">Requirements</h4>
                          <p className="text-sm text-[#374151] bg-[#f8f9fa] p-2 rounded-lg border border-[#eaecf0]">
                            {msg.ppeRequest.comment}
                          </p>
                        </div>
                      )}

                      {/* Pickup Location */}
                      {msg.ppeRequest.pickupLocation && (
                        <div className="space-y-2">
                          <h4 className="text-xs font-medium text-[#667085] uppercase tracking-wide">Pickup Location</h4>
                          <div className="bg-[#f8f9fa] border border-[#eaecf0] rounded-lg p-2">
                            <div className="flex items-center gap-2 mb-2">
                              <svg className="w-4 h-4 text-[#667085]" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                              </svg>
                              <span className="text-sm text-[#374151]">{msg.ppeRequest.pickupLocation.address}</span>
                            </div>
                            {msg.ppeRequest.pickupComment && (
                              <p className="text-xs text-[#667085] italic mb-2">
                                "{msg.ppeRequest.pickupComment}"
                              </p>
                            )}
                            
                            {/* Map Display */}
                            <div className="w-full h-40 bg-[#f8f9fa] border border-[#eaecf0] rounded-lg overflow-hidden relative mb-2">
                              <iframe
                                src={`https://www.openstreetmap.org/export/embed.html?bbox=${msg.ppeRequest.pickupLocation.lng-0.001},${msg.ppeRequest.pickupLocation.lat-0.001},${msg.ppeRequest.pickupLocation.lng+0.001},${msg.ppeRequest.pickupLocation.lat+0.001}&layer=mapnik&marker=${msg.ppeRequest.pickupLocation.lat},${msg.ppeRequest.pickupLocation.lng}`}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                              />
                            </div>
                            
                            <div className="flex justify-end">
                              <a
                                href={`https://www.google.com/maps?q=${msg.ppeRequest.pickupLocation.lat},${msg.ppeRequest.pickupLocation.lng}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-[#266273] hover:text-[#1e4f5a] font-medium underline"
                              >
                                View on Maps
                              </a>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Status Updates */}
                      <div className="pt-2 border-t border-[#eaecf0]">
                        <div className="flex items-center justify-between text-xs text-[#667085]">
                          <span>Requested {msg.ppeRequest.requestedAt}</span>
                          {msg.ppeRequest.status === 'pending' && (
                            <span>⏳ Awaiting approval</span>
                          )}
                          {msg.ppeRequest.status === 'approved' && (
                            <span>✅ Approved - Being prepared</span>
                          )}
                          {msg.ppeRequest.status === 'ready' && (
                            <span>📦 Ready for pickup</span>
                          )}
                          {msg.ppeRequest.status === 'collected' && (
                            <span>🎉 Collected</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Shoutout Card */}
                {msg.shoutout && (
                  <div className="mt-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200 p-3">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                      </div>
                      <span className="text-[#344054] text-sm font-medium">Team Shoutout</span>
                      <span className="text-xs text-[#667085] ml-auto">{msg.shoutout.timestamp}</span>
                    </div>
                    
                    <div className="space-y-3">
                      {/* Recognized Team Members */}
                      <div className="space-y-2">
                        <h4 className="text-xs font-medium text-[#667085] uppercase tracking-wide">Recognizing</h4>
                        <div className="flex flex-wrap gap-2">
                          {msg.shoutout.recognizedMembers.map(member => (
                            <div key={member.id} className="flex items-center gap-2 bg-white border border-yellow-200 rounded-lg px-3 py-2 shadow-sm">
                              <div className="w-6 h-6 bg-[#266273] rounded-full flex items-center justify-center text-white overflow-hidden">
                                {member.avatar ? (
                                  <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                                ) : (
                                  <span className="text-xs font-medium">{member.name.split(' ').map(n => n[0]).join('').slice(0,2)}</span>
                                )}
                              </div>
                              <span className="text-sm font-medium text-[#374151]">{member.name}</span>
                              <span className="text-sm">⭐</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Recognition Message */}
                      <div className="space-y-2">
                        <h4 className="text-xs font-medium text-[#667085] uppercase tracking-wide">Recognition</h4>
                        <div className="bg-white p-3 rounded-lg border border-yellow-200 shadow-sm">
                          <p className="text-sm text-[#374151] leading-relaxed">
                            {msg.shoutout.message}
                          </p>
                        </div>
                      </div>

                      {/* Photos */}
                      {msg.shoutout.photos && msg.shoutout.photos.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="text-xs font-medium text-[#667085] uppercase tracking-wide">
                            Photos ({msg.shoutout.photos.length})
                          </h4>
                          <div className="grid grid-cols-2 gap-2">
                            {msg.shoutout.photos.map((photo, index) => (
                              <div key={index} className="relative group">
                                <img
                                  src={photo.url}
                                  alt={`Shoutout photo ${index + 1}`}
                                  className="w-full h-24 object-cover rounded-lg border border-yellow-200 shadow-sm"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 rounded-lg transition-opacity" />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Appreciation Footer */}
                      <div className="pt-2 border-t border-yellow-200">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-xs text-[#667085]">
                            <span>🎉</span>
                            <span>Great work recognized!</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <button className="text-xs text-yellow-600 hover:text-yellow-700 font-medium transition-colors">
                              👏 {Math.floor(Math.random() * 10) + 3}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Shift status block */}
                {msg.shiftStatus && (
                  <div className="mt-3 bg-white rounded-xl border border-[#e9eaeb] p-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        msg.shiftStatus.action === 'start' 
                          ? 'bg-green-100' 
                          : 'bg-gray-100'
                      }`}>
                        {msg.shiftStatus.action === 'start' ? (
                          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-[#101828]">
                            {msg.shiftStatus.action === 'start' ? 'Shift Started' : 'Shift Ended'}
                          </span>
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                            msg.shiftStatus.status === 'Active'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            {msg.shiftStatus.status}
                          </span>
                        </div>
                        <div className="text-xs text-[#667085] mt-1">
                          {msg.shiftStatus.action === 'start' 
                            ? 'Now available for notifications and team communication'
                            : 'No longer receiving notifications - shift has ended'
                          }
                        </div>
                        <div className="text-xs text-[#667085] mt-1">
                          {msg.shiftStatus.timestamp}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Rally competition block */}
                {msg.rallyCompetition && (
                  <div className="mt-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 p-3">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span className="text-[#344054] text-sm font-medium">Rally the Troops Competition</span>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ml-auto ${
                        msg.rallyCompetition.status === 'active' 
                          ? 'bg-green-100 text-green-700' 
                          : msg.rallyCompetition.status === 'scheduled'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {msg.rallyCompetition.status === 'active' ? 'Active' : 
                         msg.rallyCompetition.status === 'scheduled' ? 'Scheduled' : 'Completed'}
                      </span>
                    </div>
                    
                    {msg.rallyCompetition.status === 'scheduled' ? (
                      /* SCHEDULED STATE - Limited Information */
                      <div className="space-y-3">
                        {/* Competition Announcement */}
                        <div className="bg-white rounded-lg p-3 border border-blue-100">
                          <div className="text-center mb-3">
                            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                            <h3 className="text-sm font-semibold text-[#101828] mb-1">Competition Coming Soon!</h3>
                            <p className="text-xs text-[#667085]">Get ready to rally your team...</p>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-[#667085]">Form:</span>
                              <span className="text-sm font-medium text-[#101828]">{msg.rallyCompetition.formName}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-[#667085]">Prize:</span>
                              <span className="text-sm font-medium text-[#101828]">{msg.rallyCompetition.points} points</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-[#667085]">Teams:</span>
                              <span className="text-sm font-medium text-[#101828]">{msg.rallyCompetition.teams.length} teams</span>
                            </div>
                          </div>
                        </div>

                        {/* Competing Teams */}
                        <div className="space-y-2">
                          <h4 className="text-xs font-medium text-[#667085] uppercase tracking-wide">Competing Teams</h4>
                          <div className="grid grid-cols-1 gap-2">
                            {msg.rallyCompetition.teams.map(team => (
                              <div key={team.teamId} className="bg-white rounded-lg border border-blue-100 p-3">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-medium text-[#101828]">{team.teamName}</span>
                                  <span className="text-xs text-[#667085]">{team.totalCount} members</span>
                                </div>
                                <div className="flex items-center gap-1 mt-2">
                                  {team.members.slice(0, 4).map(member => (
                                    <div key={member.id} className="w-6 h-6 bg-[#266273] rounded-full flex items-center justify-center">
                                      {member.avatar ? (
                                        <img src={member.avatar} alt={member.name} className="w-full h-full rounded-full object-cover" />
                                      ) : (
                                        <span className="text-white text-xs font-medium">
                                          {member.name.split(' ').map(n => n[0]).join('').slice(0,2)}
                                        </span>
                                      )}
                                    </div>
                                  ))}
                                  {team.members.length > 4 && (
                                    <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                                      <span className="text-gray-600 text-xs font-medium">+{team.members.length - 4}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Mystery Timer */}
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-sm font-medium text-yellow-800">Start time is a surprise!</span>
                          </div>
                          <p className="text-xs text-yellow-700 mt-1">Be ready to rally when the competition begins</p>
                        </div>

                        {/* Competition Footer */}
                        <div className="pt-2 border-t border-blue-200">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1 text-xs text-[#667085]">
                              <span>🏆</span>
                              <span>First team to complete all forms wins!</span>
                            </div>
                            <div className="text-xs text-[#667085]">
                              Created by {msg.rallyCompetition.createdBy}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* ACTIVE STATE - Full Competition Details */
                      <div className="space-y-3">
                        {/* Competition Details */}
                        <div className="bg-white rounded-lg p-3 border border-blue-100">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-[#101828]">Form: {msg.rallyCompetition.formName}</span>
                            <span className="text-xs text-[#667085]">{msg.rallyCompetition.points} points</span>
                          </div>
                          <div className="text-xs text-[#667085]">
                            Started: {new Date(msg.rallyCompetition.startTime).toLocaleString()}
                          </div>
                          {msg.rallyCompetition.winner && (
                            <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-yellow-800">🏆 Winner:</span>
                                <span className="text-sm font-semibold text-yellow-900">{msg.rallyCompetition.winner.teamName}</span>
                              </div>
                              <div className="text-xs text-yellow-700 mt-1">
                                Completed at: {new Date(msg.rallyCompetition.winner.completedAt).toLocaleString()}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Teams Progress */}
                        <div className="space-y-2">
                          <h4 className="text-xs font-medium text-[#667085] uppercase tracking-wide">Team Progress</h4>
                          {(() => {
                            // Check if there's a winner
                            const hasWinner = msg.rallyCompetition.teams.some(team => team.isWinner);
                            
                            if (hasWinner) {
                              // Show full progress when there's a winner
                              return msg.rallyCompetition.teams.map(team => (
                                <div key={team.teamId} className={`p-3 rounded-lg border ${
                                  team.isWinner 
                                    ? 'bg-yellow-50 border-yellow-200' 
                                    : 'bg-white border-blue-100'
                                }`}>
                                  <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                      <span className="text-sm font-medium text-[#101828]">{team.teamName}</span>
                                      {team.isWinner && <span className="text-xs">🏆</span>}
                                    </div>
                                    <span className="text-xs text-[#667085]">
                                      {team.completedCount}/{team.totalCount} completed
                                    </span>
                                  </div>
                                  
                                  {/* Progress Bar */}
                                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
                                    <div 
                                      className={`h-full transition-all duration-300 ${
                                        team.isWinner ? 'bg-yellow-500' : 'bg-[#266273]'
                                      }`}
                                      style={{ width: `${(team.completedCount / team.totalCount) * 100}%` }}
                                    />
                                  </div>
                                  
                                  {/* Team Members */}
                                  <div className="flex flex-wrap gap-1">
                                    {team.members.map(member => (
                                      <div key={member.id} className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                                        member.status === 'submitted' 
                                          ? 'bg-green-100 text-green-700' 
                                          : 'bg-gray-100 text-gray-600'
                                      }`}>
                                        {member.avatar ? (
                                          <img src={member.avatar} alt={member.name} className="w-4 h-4 rounded-full" />
                                        ) : (
                                          <div className="w-4 h-4 bg-[#266273] rounded-full flex items-center justify-center">
                                            <span className="text-white text-xs font-medium">
                                              {member.name.split(' ').map(n => n[0]).join('').slice(0,2)}
                                            </span>
                                          </div>
                                        )}
                                        <span>{member.name}</span>
                                        {member.status === 'submitted' && <span>✓</span>}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ));
                            } else {
                              // Show hidden progress during competition
                              return msg.rallyCompetition.teams.map(team => (
                                <div key={team.teamId} className="p-3 rounded-lg border bg-white border-blue-100">
                                  <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                      <span className="text-sm font-medium text-[#101828]">{team.teamName}</span>
                                    </div>
                                    <span className="text-xs text-[#667085]">
                                      {team.totalCount} members
                                    </span>
                                  </div>
                                  
                                  {/* Hidden Progress Bar */}
                                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
                                    <div className="h-full bg-gray-300 rounded-full" style={{ width: '100%' }}>
                                      <div className="h-full bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 animate-pulse"></div>
                                    </div>
                                  </div>
                                  
                                  {/* Team Members (without status) */}
                                  <div className="flex flex-wrap gap-1">
                                    {team.members.map(member => (
                                      <div key={member.id} className="flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600">
                                        {member.avatar ? (
                                          <img src={member.avatar} alt={member.name} className="w-4 h-4 rounded-full" />
                                        ) : (
                                          <div className="w-4 h-4 bg-[#266273] rounded-full flex items-center justify-center">
                                            <span className="text-white text-xs font-medium">
                                              {member.name.split(' ').map(n => n[0]).join('').slice(0,2)}
                                            </span>
                                          </div>
                                        )}
                                        <span>{member.name}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ));
                            }
                          })()}
                        </div>

                        {/* User Action Section */}
                        {(() => {
                          // Check if current user has submitted their form
                          const currentUserId = '1'; // Mock current user ID (Josh)
                          const userTeam = msg.rallyCompetition.teams.find(team => 
                            team.members.some(member => member.id === currentUserId)
                          );
                          const userMember = userTeam?.members.find(member => member.id === currentUserId);
                          const hasSubmitted = userMember?.status === 'submitted';

                          return (
                            <div className="bg-white rounded-lg border border-blue-100 p-3">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 bg-[#266273] rounded-full flex items-center justify-center">
                                    <span className="text-white text-sm font-medium">You</span>
                                  </div>
                                  <div>
                                    <div className="text-sm font-medium text-[#101828]">Your Submission</div>
                                    <div className="text-xs text-[#667085]">
                                      {hasSubmitted ? 'Form submitted successfully' : 'Upload your completed form'}
                                    </div>
                                  </div>
                                </div>
                                <div className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
                                  hasSubmitted 
                                    ? 'text-green-600 bg-green-50' 
                                    : 'text-blue-600 bg-blue-50'
                                }`}>
                                  {hasSubmitted ? (
                                    <>
                                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                      </svg>
                                      <span>Submitted</span>
                                    </>
                                  ) : (
                                    <>
                                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                      </svg>
                                      <span>Form Ready</span>
                                    </>
                                  )}
                                </div>
                              </div>
                              
                              {!hasSubmitted ? (
                                <div className="space-y-3">
                                  {/* Add Your Form Button */}
                                  <button
                                    onClick={() => {
                                      setSelectedCompetitionId(msg.rallyCompetition.id)
                                      setShowRallyFormSelection(true)
                                    }}
                                    className="flex items-center justify-center gap-2 w-full p-3 bg-[#266273] text-white rounded-lg cursor-pointer hover:bg-[#1e4d5a] transition-colors"
                                  >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    <span className="text-sm font-medium">Add Your Form</span>
                                  </button>
                                  
                                  {/* Instructions */}
                                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-2">
                                    <div className="flex items-start gap-2">
                                      <svg className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                      </svg>
                                      <div className="text-xs text-blue-800">
                                        <div className="font-medium mb-1">Select from your completed forms</div>
                                        <div>Choose a completed {msg.rallyCompetition.formName} to submit</div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                                  <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <div>
                                      <div className="text-sm font-medium text-green-800">Form Submitted Successfully!</div>
                                      <div className="text-xs text-green-700">
                                        Submitted at: {userMember?.submittedAt ? new Date(userMember.submittedAt).toLocaleString() : 'Just now'}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })()}

                        {/* Competition Footer */}
                        <div className="pt-2 border-t border-blue-200">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1 text-xs text-[#667085]">
                              <span>🏆</span>
                              <span>First team to complete all forms wins!</span>
                            </div>
                            <div className="text-xs text-[#667085]">
                              Created by {msg.rallyCompetition.createdBy}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
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
            // Handle both '/' and '!' prefixes
            if (message === '/' || message === '!') {
              // Show all commands for '/', only shoutout for '!'
              return message === '/' || cmd.id === 'shoutout'
            }
            
            if (message.startsWith('/')) {
              const searchTerm = message.slice(1).toLowerCase()
              return cmd.id.toLowerCase().startsWith(searchTerm) || cmd.label.toLowerCase().includes(searchTerm)
            }
            
            if (message.startsWith('!')) {
              const searchTerm = message.slice(1).toLowerCase()
              // Only show shoutout command for ! prefix
              return cmd.id === 'shoutout' && (
                cmd.id.toLowerCase().startsWith(searchTerm) || 
                cmd.label.toLowerCase().includes(searchTerm)
              )
            }
            
            return false
          })

          // Calculate dynamic height based on number of commands
          const maxHeight = '60vh'
          const headerHeight = 32 // Approximate header height in pixels
          const commandItemHeight = 60 // Approximate height per command item
          const padding = 16 // Container padding
          const minHeight = 80 // Minimum height for popup
          
          const calculatedHeight = Math.min(
            headerHeight + (filteredCommands.length * commandItemHeight) + padding,
            window.innerHeight * 0.6 // 60% of viewport height
          )
          
          const dynamicHeight = Math.max(calculatedHeight, minHeight)
          const shouldScroll = calculatedHeight >= window.innerHeight * 0.6

          return (
            <div 
              className="absolute bottom-[64px] left-3 right-3 bg-white border border-[#eaecf0] rounded-xl shadow-lg z-10 flex flex-col"
              style={{ height: `${dynamicHeight}px`, maxHeight: maxHeight }}
            >
              {/* Fixed header section */}
              <div className="flex-shrink-0 px-2 py-1 text-xs text-[#667085] border-b border-[#eaecf0]">
                {filteredCommands.length > 0 ? 'Available commands' : 'No matching commands'}
              </div>
              
              {/* Commands list - scrollable only when needed */}
              <div className={`p-2 ${shouldScroll ? 'flex-1 overflow-y-auto' : ''}`}>
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
                    } else if (cmd.id === 'pperequest') {
                      setShowRequestPPE(true);
                      setMessage('');
                    } else if (cmd.id === 'shoutout') {
                      setShowShoutout(true);
                      setMessage('');
                    } else if (cmd.id === 'hazardreport') {
                      setShowHazardReport(true);
                      setMessage('');
                    } else {
                      setMessage(`/${cmd.id} `)
                    }
                    setShowSlashHelp(false)
                  }}
                  className="w-full text-left px-2 py-2 rounded-lg hover:bg-[#f8f9fa] transition-colors"
                >
                  <div className="text-sm font-medium text-[#101828]">
                    {cmd.id === 'shoutout' ? '!' : '/'}
                    {cmd.id} — {cmd.label}
                  </div>
                  <div className="text-xs text-[#667085]">{cmd.description}</div>
                </button>
                )) : (
                  <div className="px-2 py-2 text-xs text-[#667085] italic">Type a command name to filter</div>
                )}
              </div>
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
                  // Show slash help when user types '/' or '!' and continues typing a command
                  if ((val.startsWith('/') || val.startsWith('!')) && val.length > 0) {
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

      {/* Request PPE Slide Up */}
      <RequestPPESlideUp
        isOpen={showRequestPPE}
        onClose={() => setShowRequestPPE(false)}
        onSubmit={handleRequestPPESubmit}
      />

      {/* Shoutout Slide Up */}
      <ShoutoutSlideUp
        isOpen={showShoutout}
        onClose={() => setShowShoutout(false)}
        teamMembers={teamMembers}
        onSubmit={handleShoutoutSubmit}
      />

      {/* Rally the Troops Slide Up */}
      <RallyTheTroopsSlideUp
        isOpen={showRallyTheTroops}
        onClose={() => setShowRallyTheTroops(false)}
        onSubmit={handleRallyTheTroopsSubmit}
      />
      
      <RallyFormSelectionSlideUp
        isOpen={showRallyFormSelection}
        onClose={() => setShowRallyFormSelection(false)}
        onSubmit={handleRallyFormSelection}
        competitionData={messages.find(msg => msg.rallyCompetition?.id === selectedCompetitionId)?.rallyCompetition || {
          id: selectedCompetitionId,
          formName: 'SafeMate Take 5',
          formId: 'form_1',
          teams: []
        }}
      />
    </div>
  );
} 