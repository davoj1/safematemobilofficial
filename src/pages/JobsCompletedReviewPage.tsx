
// Import images and icons
import backArrowIcon from '../assets/backarrowicon.svg';
import bhpLogo from '../assets/companylogo/bhplogo.svg';
import bmaAustralia from '../assets/minesites/bhp/BMAaustralia.png';

interface JobsCompletedReviewPageProps {
  onBackToHome?: () => void;
}

export default function JobsCompletedReviewPage({ onBackToHome }: JobsCompletedReviewPageProps) {
  const header = (
    <div className="px-4 h-[72px] flex items-center justify-between">
      <button
        onClick={onBackToHome}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <img src={backArrowIcon} alt="Back" className="w-6 h-6" />
      </button>
      <h1 className="text-base font-semibold text-[#000000] leading-6">Job detail</h1>
      <div className="w-10" />
    </div>
  )

  return (
    <div className="h-screen flex flex-col bg-[#f8f7f2] overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 bg-[#f8f7f2] border-b border-gray-200">
        {header}
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 py-3">
        {/* Job ID */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-[#344054]">Job detail</span>
          <span className="text-sm font-medium text-[#344054]">#JB0001</span>
        </div>

        {/* Job Information Card */}
        <div className="mt-5 bg-white rounded-xl border border-[#d0d5dd] p-3">
          <h2 className="text-base font-bold text-[#266273] mb-3">Job Information</h2>
          <div className="space-y-2">
            <div>
              <span className="text-sm font-medium text-[#344054]">Job name</span>
              <p className="text-sm text-[#667085]">Miner</p>
            </div>
            <div>
              <span className="text-sm font-medium text-[#344054]">Job Number</span>
              <p className="text-sm text-[#667085]">95554</p>
            </div>
            <div>
              <span className="text-sm font-medium text-[#344054]">Job Description</span>
              <p className="text-sm text-[#667085]">
                Check ground conditions, install mesh, and follow blasting procedures.
              </p>
            </div>
          </div>
        </div>

        {/* Mine Company Information Card */}
        <div className="bg-white rounded-xl border border-[#d0d5dd] p-3 mt-5">
          <h2 className="text-base font-bold text-[#266273] mb-3">Mine Company Information</h2>
          <div className="space-y-2">
            <div>
              <span className="text-sm font-medium text-[#344054]">Mine Company</span>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-9 h-9 rounded-md flex items-center justify-center">
                  <img src={bhpLogo} alt="BHP" className="w-full h-6" />
                </div>
                <span className="text-sm font-medium text-[#101828]">BHP</span>
              </div>
            </div>
            <div>
              <span className="text-sm font-medium text-[#344054]">Mine Site</span>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-9 h-9 rounded-md overflow-hidden">
                  <img src={bmaAustralia} alt="BMA Australia" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-base font-semibold text-[#101828]">BMA Australia</p>
                  <p className="text-sm text-[#667085]">Bowen Basin, QLD</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notes & Photos Card */}
        <div className="bg-white rounded-xl border border-[#d0d5dd] p-3 mt-5">
          <h2 className="text-base font-bold text-[#266273] mb-3">Notes & Photos</h2>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-[60px] h-[60px] bg-gray-200 rounded-lg flex-shrink-0" />
              <p className="text-sm text-[#667085] flex-1">
                Lockout power, wear PPE, and use barricades around the work zone.
              </p>
            </div>
            <div className="flex gap-3">
              <div className="w-[60px] h-[60px] bg-gray-200 rounded-xl flex-shrink-0" />
              <p className="text-sm text-[#667085] flex-1">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
              </p>
            </div>
            <div className="flex gap-3">
              <div className="w-[60px] h-[60px] bg-gray-200 rounded-xl flex-shrink-0" />
              <p className="text-sm text-[#667085] flex-1">
                Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
              </p>
            </div>
          </div>
        </div>

        {/* Hazard Identification Card */}
        <div className="bg-white rounded-xl border border-[#d0d5dd] p-3 mt-5">
          <h2 className="text-base font-bold text-[#266273] mb-2">Hazard Identification</h2>
          <div className="space-y-2">
            <div>
              <span className="text-sm font-medium text-[#344054]">Hazard</span>
              <p className="text-sm text-[#667085]">Poor ventilation in the underground tunnel</p>
            </div>
            <div>
              <span className="text-sm font-medium text-[#344054]">Control</span>
              <p className="text-sm text-[#667085]">Turn on exhaust fans and check airflow before starting the task</p>
            </div>
          </div>
        </div>

        {/* Team Information Card */}
        <div className="bg-white rounded-xl border border-[#d0d5dd] p-3 mt-5">
          <h2 className="text-base font-bold text-[#266273] mb-2">Team Information</h2>
          <div className="space-y-2">
            <div>
              <span className="text-sm font-medium text-[#344054]">Team Name</span>
              <p className="text-sm text-[#667085]">Chicago Bears</p>
            </div>
            <div>
              <span className="text-sm font-medium text-[#344054]">Team Mates</span>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 bg-gray-300 rounded-full border-2 border-white" />
                  <div className="w-8 h-8 bg-gray-300 rounded-full border-2 border-white" />
                  <div className="w-8 h-8 bg-gray-300 rounded-full border-2 border-white" />
                  <div className="w-8 h-8 bg-gray-300 rounded-full border-2 border-white" />
                  <div className="w-8 h-8 bg-gray-300 rounded-full border-2 border-white" />
                  <div className="w-8 h-8 bg-gray-100 rounded-full border-2 border-white flex items-center justify-center">
                    <span className="text-sm font-semibold text-[#717680]">+2</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 