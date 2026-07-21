export const CAPABILITIES = [
  'Basic',
  'Regional',
  'Mesh',
  'Premium',
  'Logistics',
  'Trust',
  'Insights',
  'Priority',
] as const

export type Capability = (typeof CAPABILITIES)[number]

export type ScorePreset = 'restricted' | 'limited' | 'full'

export const SCORE_PRESETS: Record<
  ScorePreset,
  { score: number; label: string; level: string; message: string }
> = {
  restricted: {
    score: 15,
    label: 'RESTRICTED',
    level: 'Level 1: Unverified',
    message:
      'Earn 16 more points via a Mesh exchange or a peer vouch to reach Limited access.',
  },
  limited: {
    score: 45,
    label: 'LIMITED',
    level: 'Level 2: Limited',
    message:
      'Earn 16 more points to unlock premium suppliers — transitive vouching.',
  },
  full: {
    score: 88,
    label: 'FULL ACCESS',
    level: 'Level 3: Certified',
    message:
      'All categories visible and accessible. Your network tier is certified.',
  },
}

export const GATE_REQUIRED_SCORE = 31

export const STABILIZING_DELAY_MS = 1000

export const OTHER_PARTY_CONFIRM_DELAY_MS = 1800

export function getUnlockedCount(score: number): number {
  if (score >= SCORE_PRESETS.full.score) return CAPABILITIES.length
  if (score >= SCORE_PRESETS.limited.score) return 3
  return 0
}

export function getScoreLabel(score: number): string {
  if (score >= SCORE_PRESETS.full.score) return SCORE_PRESETS.full.label
  if (score >= SCORE_PRESETS.limited.score) return SCORE_PRESETS.limited.label
  return SCORE_PRESETS.restricted.label
}

export function getLevelLabel(score: number): string {
  if (score >= SCORE_PRESETS.full.score) return SCORE_PRESETS.full.level
  if (score >= SCORE_PRESETS.limited.score) return SCORE_PRESETS.limited.level
  return SCORE_PRESETS.restricted.level
}

export function getScoreMessage(score: number): string {
  if (score >= SCORE_PRESETS.full.score) return SCORE_PRESETS.full.message
  if (score >= SCORE_PRESETS.limited.score) return SCORE_PRESETS.limited.message
  return SCORE_PRESETS.restricted.message
}

export const VOUCH_ACTIONS = [
  {
    id: 'verify-location',
    title: 'Verify your business location',
    description: 'Confirm your barangay registration to build baseline trust.',
  },
  {
    id: 'mesh-exchange',
    title: 'Complete a Mesh exchange',
    description: 'Participate in a verified peer exchange within your network.',
  },
  {
    id: 'supplier-forest',
    title: 'Go through the supplier forest',
    description: 'Navigate anonymized supplier listings to learn access patterns.',
  },
  {
    id: 'peer-vouch',
    title: 'Receive a peer vouch',
    description: 'Voluntary endorsements from verified businesses raise your score.',
  },
  {
    id: 'scarcity-signal',
    title: 'Verify a scarcity signal',
    description: 'Confirm local supply conditions to contribute network intelligence.',
  },
]

export const MOCK_SUPPLIERS = [
  { id: 's1', category: 'Grocery', distance: '1.2 km', name: 'Barangay Fresh Supply Co.' },
  { id: 's2', category: 'Cooking Oil', distance: '2.0 km', name: 'Luzon Oil Traders' },
  { id: 's3', category: 'Packaging', distance: '3.5 km', name: 'Metro Pack Solutions' },
]

export const MESH_ITEMS = [
  { id: 'm1', name: 'Cooking oil', distance: '~2 km', business: 'Sari-Sari Provisions' },
  { id: 'm2', name: 'Rice (25kg)', distance: '~1 km', business: 'Grain Hub MSME' },
  { id: 'm3', name: 'Packaging boxes', distance: '~3 km', business: 'PackRight Trading' },
]
