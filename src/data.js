// All content comes from verifix.ae. Edit this file to change what the screens show.

export const REGULATORS = [
  {
    id: 'vara',
    short: 'VARA',
    full: 'Virtual Assets Regulatory Authority, Dubai',
    audience: 'Virtual asset service providers',
    journey: 'uae_vara_vasp',
    icon: 'coin',
  },
  {
    id: 'cbuae',
    short: 'CBUAE',
    full: 'Central Bank of the UAE',
    audience: 'Banks, exchange houses, finance companies',
    journey: 'uae_cbuae_fi',
    icon: 'bank',
  },
  {
    id: 'cma',
    short: 'CMA',
    full: 'Capital Market Authority',
    audience: 'Capital market participants',
    journey: 'uae_cma_markets',
    icon: 'chart',
  },
  {
    id: 'dfsa',
    short: 'DFSA',
    full: 'Dubai Financial Services Authority',
    audience: 'DIFC-licensed firms',
    journey: 'uae_dfsa_difc',
    icon: 'scale',
  },
  {
    id: 'fsra',
    short: 'FSRA',
    full: 'Financial Services Regulatory Authority, ADGM',
    audience: 'ADGM-licensed firms',
    journey: 'uae_fsra_adgm',
    icon: 'building',
  },
]

// Sample audit trail from the VerifiX home page (illustrative)
export const EXAMPLE_FLOW = [
  { time: '09:14:02', title: 'Created', text: 'Verification created, journey started.' },
  { time: '09:14:09', title: 'Verified', text: 'Document authenticated, face matched.' },
  { time: '09:14:11', title: 'Screened', text: 'Screening run, 1 potential match.' },
  { time: '10:02:47', title: 'Reviewed', text: 'Analyst reviewed the match and requested source of funds.' },
  { time: '14:31:20', title: 'Approved', text: 'Approved, evidence record sealed.' },
]

export const CHECKS = [
  'Document verification',
  'NFC chip read',
  'Passive liveness',
  'Active liveness',
  'Face match (1:1)',
  'Proof of address',
  'Database validation',
  'Phone and email verification',
]

export const EVIDENCE = [
  {
    title: 'Evidence pack per case',
    text: 'Every decision keeps the documents, screening results, scores, and reviewer actions that produced it, exportable as a single case file when an examiner asks.',
  },
  {
    title: 'Audit trail you did not have to build',
    text: 'Who checked what, when, and on which policy version is recorded automatically, with no spreadsheets reconstructed after the fact.',
  },
  {
    title: 'Ongoing obligations run themselves',
    text: 'Rescreening and periodic review run on the cadence set for your license type, so lapses are not something you have to remember.',
  },
]
