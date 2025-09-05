# Forms Directory Structure

This directory contains all form pages organized by contractor and generic forms.

## Structure

```
forms/
├── index.ts                    # Main exports for all forms
├── README.md                   # This documentation
├── general/                    # General forms (accessible to all contractors)
│   ├── index.ts               # General form exports
│   ├── ReportHazardStep1Page.tsx
│   ├── ReportHazardStep2Page.tsx
│   ├── ReportHazardStep3Page.tsx
│   ├── ReportHazardStep4Page.tsx
│   └── ReportHazardReviewPage.tsx
├── warrikal/                   # Warrikal-specific forms
│   ├── index.ts               # Warrikal form exports (all mine sites)
│   ├── fmg/                   # FMG-specific forms
│   │   ├── index.ts           # FMG form exports
│   │   ├── TakeControlFormPage.tsx
│   │   ├── TakeControlReviewPage.tsx
│   │   └── TakeControlSuccessPage.tsx
│   ├── bhp/                   # BHP-specific forms
│   │   └── index.ts           # BHP form exports (currently empty)
│   ├── rio/                   # RIO-specific forms
│   │   └── index.ts           # RIO form exports (currently empty)
│   ├── FatigueManagementStep1Page.tsx
│   ├── FatigueManagementStep2Page.tsx
│   ├── FatigueManagementStep3Page.tsx
│   ├── FatigueManagementStep4Page.tsx
│   ├── FatigueManagementStep5Page.tsx
│   ├── FatigueManagementStep6Page.tsx
│   ├── FatigueManagementReviewPage.tsx
│   └── FatigueManagementSuccessPage.tsx
├── linkforce/                  # Linkforce-specific forms
│   └── index.ts               # Linkforce form exports (currently empty)
├── monadelphous/              # Monadelphous-specific forms
│   └── index.ts               # Monadelphous form exports (currently empty)
├── goodline/                  # Goodline-specific forms
│   └── index.ts               # Goodline form exports (currently empty)
├── MyExposuresFormPage.tsx    # Generic forms (can be used by any contractor)
├── HazardIdentificationPage.tsx
└── CompanyWorkerDetailsPage.tsx
```

## Form Categories

### Generic Forms
These forms can be used by any contractor and are located in the root forms directory:
- **MyExposuresFormPage**: Generic exposure assessment form
- **HazardIdentificationPage**: Generic hazard identification form
- **CompanyWorkerDetailsPage**: Generic worker details form

### General Forms
These forms are accessible to all contractors and are located in the `general/` directory:
- **ReportHazardStep1-4Page**: Hazard reporting workflow
- **ReportHazardReviewPage**: Hazard report review

### Contractor-Specific Forms
Each contractor has their own folder with forms tailored to their specific requirements:

#### Warrikal Forms
- **FatigueManagementStep1-6Page**: Available on all mine sites (FMG, BHP, RIO)
- **FatigueManagementReviewPage**: Warrikal fatigue management review
- **FatigueManagementSuccessPage**: Warrikal fatigue management success

##### Warrikal Mine Company-Specific Forms
- **FMG**: Take Control forms (TakeControlFormPage, TakeControlReviewPage, TakeControlSuccessPage)
- **BHP**: Currently empty (ready for BHP-specific forms)
- **RIO**: Currently empty (ready for RIO-specific forms)

#### Linkforce Forms
- Currently empty - only has access to general forms (Report Hazard)

#### Monadelphous Forms
- Currently empty - only has access to general forms (Report Hazard)

#### Goodline Forms
- **Pace Cards** - 4-step safety assessment form (Plan, Assess, Control, Execute)
- **Report Hazard** - General form accessible to all contractors

## Adding New Forms

### For Generic Forms
1. Create the form in the root forms directory
2. Add the export to `forms/index.ts`

### For General Forms (All Contractors)
1. Create the form in the `forms/general/` directory
2. Add the export to `forms/general/index.ts`
3. The form will automatically be available through the main `forms/index.ts` export

### For Contractor-Specific Forms
1. Create the form in the appropriate contractor folder (e.g., `forms/warrikal/`)
2. Add the export to the contractor's index file (e.g., `forms/warrikal/index.ts`)
3. The form will automatically be available through the main `forms/index.ts` export

## Usage

```typescript
// Import generic forms
import { MyExposuresFormPage, HazardIdentificationPage } from '../pages/forms'

// Import contractor-specific forms
import { TakeControlFormPage, FatigueManagementStep1Page } from '../pages/forms'
```
