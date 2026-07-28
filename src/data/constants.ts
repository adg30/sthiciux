export const CAPABILITIES = [
  'Basic',
  'Regional',
  'Mesh',
  'High-Trust',
  'Logistics',
  'Trust',
  'Insights',
  'Priority',
] as const

export type Capability = (typeof CAPABILITIES)[number]

export type ScorePreset = 'restricted' | 'limited' | 'full'
export type ScorePresetMeta = {
  score: number
  label: string
  level: string
  message: string
}

export const SCORE_PRESETS: Record<ScorePreset, ScorePresetMeta> = {
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
      'Earn 16 more points to unlock high-trust suppliers through verified network activity.',
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

export type SupplierTrustState = 'gated' | 'available'
export interface MockSupplier {
  id: string
  category: string
  distance: string
  name: string
  barangay: string
  trustState: SupplierTrustState
  availabilityNote: string
}

export const MOCK_SUPPLIERS = [
  {
    id: 's1',
    category: 'Grocery',
    distance: '1.2 km',
    name: 'Barangay Fresh Supply Co.',
    barangay: 'Poblacion',
    trustState: 'available',
    availabilityNote: 'Restocks from nearby verified vendors every Tuesday and Friday.',
  },
  {
    id: 's2',
    category: 'Cooking Oil',
    distance: '2.0 km',
    name: 'Luzon Oil Traders',
    barangay: 'Market zone',
    trustState: 'gated',
    availabilityNote: 'Higher-volume stock requires stronger verified trust before identity reveal.',
  },
  {
    id: 's3',
    category: 'Packaging',
    distance: '3.5 km',
    name: 'Metro Pack Solutions',
    barangay: 'South cluster',
    trustState: 'gated',
    availabilityNote: 'Shared through the supplier forest to reduce unnecessary identity exposure.',
  },
] satisfies MockSupplier[]

export type ScarcitySignalStatus = 'Critical' | 'Limited' | 'Stable'
export interface ScarcitySignal {
  id: string
  name: string
  status: ScarcitySignalStatus
  reports: number
  radius: string
  confidence: number
  verifiedAt: string
  confidenceReason: string
}

export const SCARCITY_SIGNALS = [
  {
    id: 'oil',
    name: 'Cooking oil',
    status: 'Critical',
    reports: 12,
    radius: '1.4 km',
    confidence: 94,
    verifiedAt: '5 min ago',
    confidenceReason: 'Twelve reports aligned across nearby verified businesses.',
  },
  {
    id: 'rice',
    name: 'Rice',
    status: 'Limited',
    reports: 7,
    radius: '2.1 km',
    confidence: 81,
    verifiedAt: '9 min ago',
    confidenceReason: 'Signals cluster around the market zone but remain partially mixed.',
  },
  {
    id: 'packaging',
    name: 'Packaging',
    status: 'Stable',
    reports: 4,
    radius: '3.0 km',
    confidence: 76,
    verifiedAt: '12 min ago',
    confidenceReason: 'Reports remain light and are offset by steady supplier confirmations.',
  },
] satisfies ScarcitySignal[]

export type MeshRelationshipState = 'connected' | 'pending' | 'anonymous'
export interface MeshItem {
  id: string
  businessId: string
  name: string
  distance: string
  business: string
  relationship: MeshRelationshipState
  barangay: string
  consentSummary: string
  fulfillmentNote: string
}

export const MESH_ITEMS = [
  {
    id: 'm1',
    businessId: 'b1',
    name: 'Cooking oil',
    distance: '~2 km',
    business: 'Sari-Sari Provisions',
    relationship: 'connected',
    barangay: 'Poblacion',
    consentSummary: 'Identity already shared through an existing Mesh relationship.',
    fulfillmentNote: 'Ready for direct exchange coordination through Messages.',
  },
  {
    id: 'm2',
    businessId: 'b2',
    name: 'Rice (25kg)',
    distance: '~1 km',
    business: 'Grain Hub MSME',
    relationship: 'pending',
    barangay: 'Market zone',
    consentSummary: 'A request is in progress, but both businesses still need to confirm.',
    fulfillmentNote: 'Hold identity details until both sides explicitly accept.',
  },
  {
    id: 'm3',
    businessId: 'b3',
    name: 'Packaging boxes',
    distance: '~3 km',
    business: 'PackRight Trading',
    relationship: 'anonymous',
    barangay: 'South cluster',
    consentSummary: 'Inventory is visible first while both identities remain protected.',
    fulfillmentNote: 'Use the listing to decide whether to request a protected introduction.',
  },
  {
    id: 'm4',
    businessId: 'b4',
    name: 'Bottled water',
    distance: '~2.5 km',
    business: 'ClearSpring Retail',
    relationship: 'anonymous',
    barangay: 'Riverside',
    consentSummary: 'The Mesh hides identity until both parties accept the exchange.',
    fulfillmentNote: 'Good for urgent supply checks without exposing the seller immediately.',
  },
  {
    id: 'm5',
    businessId: 'b5',
    name: 'Delivery crates',
    distance: '~4 km',
    business: 'North Route Logistics',
    relationship: 'anonymous',
    barangay: 'North route',
    consentSummary: 'Shared as a protected network post, not a public listing.',
    fulfillmentNote: 'Useful when a logistics need is real but contacts should stay private.',
  },
] satisfies MeshItem[]

export type MeshRelationship = (typeof MESH_ITEMS)[number]['relationship']

export const COMM_CONTACTS = [
  { id: 's1', name: 'Barangay Fresh Supply Co.', detail: 'Grocery supplier · 1.2 km', source: 'Supplier Network' },
  ...MESH_ITEMS.filter((item) => item.relationship === 'connected').map((item) => ({
    id: item.businessId,
    name: item.business,
    detail: `${item.name} · ${item.distance}`,
    source: 'Mesh Connection',
  })),
]
