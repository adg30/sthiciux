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
      'Complete one verified exchange or trust-building action to reach Limited access.',
  },
  limited: {
    score: 45,
    label: 'LIMITED',
    level: 'Level 2: Limited',
    message:
      '43 more points unlock Premium, Trust, Insights, and Priority access.',
  },
  full: {
    score: 88,
    label: 'FULL ACCESS',
    level: 'Level 3: Certified',
    message:
      'All access categories are visible. Your network tier is certified.',
  },
}

export const GATE_REQUIRED_SCORE = 31

export const STABILIZING_DELAY_MS = 1000

export const OTHER_PARTY_CONFIRM_DELAY_MS = 1800

export const GATE_UNLOCK_NAV_DELAY_MS = 600

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

export function getScoreTone(score: number): ScorePreset {
  if (score >= SCORE_PRESETS.full.score) return 'full'
  if (score >= SCORE_PRESETS.limited.score) return 'limited'
  return 'restricted'
}

export type VouchActionId =
  | 'message-partner'
  | 'mesh-exchange'
  | 'lower-tier'
  | 'verify-signal'

export const VOUCH_ACTIONS = [
  {
    id: 'message-partner' as const,
    channel: 'COMM-LINK',
    title: 'Message a past exchange partner',
    description: 'Reconnect through the encrypted Comm-Link',
    detailTitle: 'Comm-Link Action',
    detailBody:
      'Open an existing encrypted conversation and continue a verified working relationship.',
    why: 'Returning to a known partner reinforces a trustworthy exchange history without asking anyone to vouch for you.',
    potential: '+8',
    continueTo: '/comm-link',
    continueLabel: 'CONTINUE TO COMM-LINK',
  },
  {
    id: 'mesh-exchange' as const,
    channel: 'MESH',
    title: 'Participate in a Mesh Exchange',
    description: 'Complete a verified barangay exchange',
    detailTitle: 'Mesh Exchange Action',
    detailBody:
      'Join a need or offer, agree on logistics, then confirm completion with the other business.',
    why: 'Mutual confirmation creates a verified record. A vouch may be offered afterward, but is never requested.',
    potential: '+12',
    continueTo: '/mesh',
    continueLabel: 'CONTINUE TO MESH BOARD',
  },
  {
    id: 'lower-tier' as const,
    channel: 'DISCOVER',
    title: 'Try a lower-tier supplier',
    description: 'Build a record through accessible suppliers',
    detailTitle: 'Lower-Tier Supplier Action',
    detailBody:
      'Start with suppliers your current score can already reach, then grow access through verified activity.',
    why: 'Accessible exchanges still create a trustworthy trail and help unlock higher-tier paths later.',
    potential: '+6',
    continueTo: '/discovery',
    continueLabel: 'CONTINUE TO DISCOVERY',
  },
  {
    id: 'verify-signal' as const,
    channel: 'SIGNAL',
    title: 'Verify a barangay supply signal',
    description: 'Help confirm availability for the community',
    detailTitle: 'Supply Signal Action',
    detailBody:
      'Stabilize a local scarcity report and treat the result as community intelligence, not a purchase signal alone.',
    why: 'Helping verify local reports strengthens the network without exposing private business identities.',
    potential: '+10',
    continueTo: '/scarcity',
    continueLabel: 'CONTINUE TO SUPPLY SIGNAL',
  },
]

export interface MockSupplier {
  id: string
  category: string
  distance: string
  name: string
  barangay: string
  /** Minimum Vouch Score needed to attempt this supplier's access gate. */
  requiredScore: number
  availabilityNote: string
  nodeCode: string
  matchConfidence: string
}

export function isSupplierAccessible(supplier: Pick<MockSupplier, 'requiredScore'>, score: number): boolean {
  return score >= supplier.requiredScore
}

export const MOCK_SUPPLIERS = [
  {
    id: 's1',
    category: 'Grocery',
    distance: '1.2 km',
    name: 'Barangay Fresh Supply Co.',
    barangay: 'Poblacion',
    requiredScore: 0,
    availabilityNote: 'Restocks from nearby verified vendors every Tuesday and Friday.',
    nodeCode: 'NX-04',
    matchConfidence: '92% match',
  },
  {
    id: 's2',
    category: 'Cooking Oil',
    distance: '2.0 km',
    name: 'Luzon Oil Traders',
    barangay: 'Market zone',
    requiredScore: GATE_REQUIRED_SCORE,
    availabilityNote: 'Higher-volume stock requires stronger verified trust before identity reveal.',
    nodeCode: 'NX-11',
    matchConfidence: '88% match',
  },
  {
    id: 's3',
    category: 'Packaging',
    distance: '3.5 km',
    name: 'Metro Pack Solutions',
    barangay: 'South cluster',
    requiredScore: SCORE_PRESETS.limited.score,
    availabilityNote: 'Shared through trust-gated discovery to reduce unnecessary identity exposure.',
    nodeCode: 'NX-19',
    matchConfidence: '81% match',
  },
] satisfies MockSupplier[]

export type SignalResult =
  | 'verified'
  | 'no-data'
  | 'forming'
  | 'conflicting'
  | 'normal'

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
  shortLabel: string
  distance: string
  business: string
  relationship: MeshRelationshipState
  barangay: string
  consentSummary: string
  fulfillmentNote: string
  quantity: string
  neededBy: string
  exchangeType: string
}

export const MESH_ITEMS = [
  {
    id: 'm1',
    businessId: 'b1',
    name: 'Cooking oil',
    shortLabel: 'Oil',
    distance: '1.8 km',
    business: 'Aling Rosa Store',
    relationship: 'connected',
    barangay: 'Poblacion',
    consentSummary: 'Identity already shared through an existing Mesh relationship.',
    fulfillmentNote: 'Ready for direct exchange coordination through Comm-Link.',
    quantity: '12 × 1L bottles',
    neededBy: 'Tomorrow · 4:00 PM',
    exchangeType: 'Purchase or equivalent stock',
  },
  {
    id: 'm2',
    businessId: 'b2',
    name: 'Rice',
    shortLabel: 'Rice',
    distance: '~1 km',
    business: 'Grain Hub MSME',
    relationship: 'pending',
    barangay: 'Market zone',
    consentSummary: 'A request is in progress, but both businesses still need to confirm.',
    fulfillmentNote: 'Hold identity details until both sides explicitly accept.',
    quantity: '2 × 25kg sacks',
    neededBy: 'Friday · morning',
    exchangeType: 'Direct swap or purchase',
  },
  {
    id: 'm3',
    businessId: 'b3',
    name: 'Packaging',
    shortLabel: 'Pack',
    distance: '~3 km',
    business: 'PackRight Trading',
    relationship: 'anonymous',
    barangay: 'South cluster',
    consentSummary: 'Inventory is visible first while both identities remain protected.',
    fulfillmentNote: 'Use the listing to decide whether to request a protected introduction.',
    quantity: '40 medium boxes',
    neededBy: 'This week',
    exchangeType: 'Purchase',
  },
  {
    id: 'm4',
    businessId: 'b4',
    name: 'Bottled water',
    shortLabel: 'Water',
    distance: '~2.5 km',
    business: 'ClearSpring Retail',
    relationship: 'anonymous',
    barangay: 'Riverside',
    consentSummary: 'The Mesh hides identity until both parties accept the exchange.',
    fulfillmentNote: 'Good for urgent supply checks without exposing the seller immediately.',
    quantity: '8 cases',
    neededBy: 'Tomorrow · noon',
    exchangeType: 'Purchase',
  },
  {
    id: 'm5',
    businessId: 'b5',
    name: 'Delivery crates',
    shortLabel: 'Crates',
    distance: '~4 km',
    business: 'North Route Logistics',
    relationship: 'anonymous',
    barangay: 'North route',
    consentSummary: 'Shared as a protected network post, not a public listing.',
    fulfillmentNote: 'Useful when a logistics need is real but contacts should stay private.',
    quantity: '15 crates',
    neededBy: 'Next delivery window',
    exchangeType: 'Borrow / return',
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

export const RECENT_SEARCHES = [
  'Cooking oil suppliers nearby',
  'Packaging within 3 km',
  'Rice wholesaler',
]
