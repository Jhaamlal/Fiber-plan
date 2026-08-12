// ═══════════════════════════════════════════════════════════════
// Telecom Plan Data — Updated August 2026
// Sources: jio.com, airtel.in, myvi.in (verified via web search)
// ═══════════════════════════════════════════════════════════════

// ─── Jio Prepaid Plans ─────────────────────────────────────────
export const jioPlans = [
  { id: 'jio-199', price: 199, dailyData: 1.5, validity: 18, label: '₹199 · 1.5 GB/day · 18 days' },
  { id: 'jio-209', price: 209, dailyData: 1,   validity: 22, label: '₹209 · 1 GB/day · 22 days' },
  { id: 'jio-239', price: 239, dailyData: 1.5, validity: 22, label: '₹239 · 1.5 GB/day · 22 days' },
  { id: 'jio-249', price: 249, dailyData: 1,   validity: 28, label: '₹249 · 1 GB/day · 28 days' },
  { id: 'jio-299', price: 299, dailyData: 1.5, validity: 28, label: '₹299 · 1.5 GB/day · 28 days' },
  { id: 'jio-349', price: 349, dailyData: 2,   validity: 28, label: '₹349 · 2 GB/day · 28 days' },
  { id: 'jio-579', price: 579, dailyData: 1.5, validity: 56, label: '₹579 · 1.5 GB/day · 56 days' },
  { id: 'jio-666', price: 666, dailyData: 1.5, validity: 70, label: '₹666 · 1.5 GB/day · 70 days' },
  { id: 'jio-799', price: 799, dailyData: 1.5, validity: 84, label: '₹799 · 1.5 GB/day · 84 days' },
  { id: 'jio-859', price: 859, dailyData: 2,   validity: 84, label: '₹859 · 2 GB/day · 84 days' },
];

// ─── Airtel Prepaid Plans ──────────────────────────────────────
// Note: Airtel discontinued ₹299, ₹579, ₹619, ₹649 plans in Aug 2026
// ₹349 is now the entry-level daily data plan
export const airtelPlans = [
  { id: 'airtel-349', price: 349, dailyData: 1.5, validity: 28, label: '₹349 · 1.5 GB/day · 28 days' },
  { id: 'airtel-379', price: 379, dailyData: 2,   validity: 30, label: '₹379 · 2 GB/day · 30 days' },
  { id: 'airtel-409', price: 409, dailyData: 2.5, validity: 28, label: '₹409 · 2.5 GB/day · 28 days' },
  { id: 'airtel-449', price: 449, dailyData: 3,   validity: 28, label: '₹449 · 3 GB/day · 28 days' },
  { id: 'airtel-899', price: 899, dailyData: 1.5, validity: 84, label: '₹899 · 1.5 GB/day · 84 days' },
  { id: 'airtel-979', price: 979, dailyData: 2,   validity: 84, label: '₹979 · 2 GB/day · 84 days' },
];

// ─── Vi (Vodafone Idea) Prepaid Plans ──────────────────────────
// Source: myvi.in/prepaid/best-prepaid-plans (JSON-LD structured data)
export const viPlans = [
  { id: 'vi-299',  price: 299,  dailyData: 1,   validity: 28,  label: '₹299 · 1 GB/day · 28 days' },
  { id: 'vi-365',  price: 365,  dailyData: 2,   validity: 28,  label: '₹365 · 2 GB/day · 28 days (SuperHero)' },
  { id: 'vi-450',  price: 450,  dailyData: 3,   validity: 28,  label: '₹450 · Unlimited · 28 days (NonStop Hero)' },
  { id: 'vi-649',  price: 649,  dailyData: 2,   validity: 56,  label: '₹649 · 2 GB/day · 56 days (SuperHero)' },
  { id: 'vi-790',  price: 790,  dailyData: 3,   validity: 56,  label: '₹790 · Unlimited · 56 days (NonStop Hero)' },
  { id: 'vi-979',  price: 979,  dailyData: 2,   validity: 84,  label: '₹979 · 2 GB/day · 84 days (SuperHero)' },
  { id: 'vi-1180', price: 1180, dailyData: 3,   validity: 84,  label: '₹1180 · Unlimited · 84 days (NonStop Hero)' },
];

// ─── Operator metadata ────────────────────────────────────────
export const operators = [
  { id: 'jio',    name: 'Jio',    color: '#0A3D91', plans: jioPlans },
  { id: 'airtel', name: 'Airtel', color: '#ED1C24', plans: airtelPlans },
  { id: 'vi',     name: 'Vi',     color: '#6C2EB9', plans: viPlans },
];

// ─── BSNL Bharat Fiber Plans (Pre-GST) ─────────────────────────
export const bsnlFiberPlans = [
  {
    id: 'bsnl-259',
    name: 'Rural Entry',
    price: 259,
    speed: 25,
    dataLimit: 700,
    afterLimitSpeed: 2,
    extras: ['Unlimited Calls', 'Prasar Bharati OTT'],
    badge: null,
  },
  {
    id: 'bsnl-399-rural',
    name: 'Rural Home WiFi',
    price: 399,
    speed: 40,
    dataLimit: 1400,
    afterLimitSpeed: 4,
    extras: ['Unlimited Calls'],
    badge: null,
  },
  {
    id: 'bsnl-399-spark',
    name: 'Spark',
    price: 399,
    speed: 50,
    dataLimit: 3300,
    afterLimitSpeed: 4,
    extras: ['Unlimited Calls'],
    badge: 'Popular',
  },
  {
    id: 'bsnl-699',
    name: 'Basic Plus OTT',
    price: 699,
    speed: 100,
    dataLimit: 4000,
    afterLimitSpeed: 4,
    extras: ['Unlimited Calls', 'SonyLIV', 'ZEE5'],
    badge: 'Best Value',
  },
];

// ─── Helper: get plans for an operator ─────────────────────────
export function getPlansForOperator(operatorId) {
  const op = operators.find(o => o.id === operatorId);
  return op ? op.plans : [];
}
