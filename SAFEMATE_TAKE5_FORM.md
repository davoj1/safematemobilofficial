# Safemate Take 5 Form

## Overview

The Safemate Take 5 form is a general safety form that can be used by any company. It follows a 6-step process to ensure comprehensive safety planning and execution.

## Features

### Step 1: Task Planning
- **Your task today**: Text input for describing the task
- **Add photos**: Multiple photo upload capability
- **Why should I work safe?**: Text input for safety motivation
- **Plan Your Task**: Checklist with 7 safety questions:
  - Do I understand the work scope and method?
  - Do you have the qualifications, license and or VOC for the task?
  - Have you read and signed onto the JHA or SWMS?
  - Do you have the correct PPE for the task?
  - Are tools and equipment tagged in date and fit for purpose?
  - Is a work permit or authority to work required?
  - Have you communicated your task with other workers in the work area?

### Step 2: Control the Hazards
- Dynamic hazard identification and control measures
- Add/remove hazards as needed
- For each hazard:
  - Identified Hazard (text input)
  - Control Measure (text input)
  - Implementation status (Yes/No/N/A)

### Step 3: My Exposures
- 6 exposure assessment questions:
  - I am trained and competent for this task
  - I have made sure my work will not impact upon others
  - I have the correct tools and equipment
  - I have identified my line of fire exposures
  - I can complete this task without climbing
  - I commit to pausing if the task changes
- Each question supports:
  - Yes/No/N/A answers
  - Comments (where applicable)
  - Photo uploads (where applicable)

### Step 4: Execute Task
- Final safety checklist with 5 questions:
  - Can the job be done safely?
  - Have you communicated your task to others?
  - The task can be completed without the need to rush?
  - All external pressures that could affect the task controlled?
  - Does your supervisor know your work location?

### Step 5: Submit
- **Select Your Company**: Choose from available companies or "Other"
- **Other Company**: Text input if "Other" is selected
- **Worker Name**: First name and last name inputs
- **Worker's Signature**: Digital signature capture

### Step 6: Review
- Comprehensive review of all form data
- Organized by step with clear visual indicators
- Submit button to complete the form

## How to Access

1. Navigate to the **Forms** tab in the main navigation
2. In the **Templates** section, scroll down to see "Safemate General Forms" (separated by an "or" divider)
3. Click on "Safemate General Forms" to see available general forms
4. Select "Take 5" from the form selection screen
5. Complete all 6 steps
6. Review and submit

## Technical Implementation

### File Structure
```
src/pages/forms/general/
├── SafemateTake5FormPage.tsx      # Main form container
├── SafemateTake5Step1.tsx         # Task planning step
├── SafemateTake5Step2.tsx         # Control hazards step
├── SafemateTake5Step3.tsx         # My exposures step
├── SafemateTake5Step4.tsx         # Execute task step
├── SafemateTake5Step5.tsx         # Submit step
└── SafemateTake5Step6.tsx         # Review step
```

### Reused Components
The form reuses existing components from the codebase:
- **Pace Cards components**: Step 2 (Control Hazards) and Step 4 (Execute Task)
- **My Exposures components**: Step 3 (My Exposures)
- **UI Components**: Buttons, inputs, signature pad, file upload, etc.

### Data Structure
```typescript
interface SafemateTake5FormData {
  // Step 1
  task: string
  photos: File[]
  whyWorkSafe: string
  planAnswers: { [key: string]: 'yes' | 'no' | 'na' }
  
  // Step 2
  hazardsAndControls: Array<{
    hazard: string
    control: string
    implemented: 'yes' | 'no' | 'na'
  }>
  
  // Step 3
  exposureAnswers: { [key: string]: 'yes' | 'no' | 'na' }
  exposureComments: { [key: string]: string }
  exposurePhotos: { [key: string]: File | null }
  
  // Step 4
  executeAnswers: { [key: string]: 'yes' | 'no' | 'na' }
  
  // Step 5
  selectedCompany: string
  otherCompany: string
  firstName: string
  lastName: string
  signature: string
}
```

## Integration

The form is integrated into the main app routing system:
- **Route**: `forms-safemate-take5`
- **Navigation**: Accessible from the Forms templates section
- **Back Navigation**: Returns to form selection
- **Completion**: Logs form data and returns to form selection

## Customization

The form can be easily customized by:
1. Modifying the question sets in each step
2. Adding/removing photo upload requirements
3. Customizing the company selection options
4. Adjusting the validation rules
5. Modifying the review step layout

## Future Enhancements

Potential improvements:
- Save draft functionality
- Offline support
- PDF generation
- Email submission
- Integration with company databases
- Multi-language support
- Accessibility improvements
