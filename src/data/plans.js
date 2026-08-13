// ═══════════════════════════════════════════════════════════════
// Telecom Plan Data — Updated August 2026
// Sources: jio.com, airtel.in, myvi.in (verified Aug 2026)
// ═══════════════════════════════════════════════════════════════

// ─── Jio Prepaid Plans ─────────────────────────────────────────
// Source: jio.com/selfcare/plans/mobility/prepaid-plans-list/
export const jioPlans = [
  { id: 'jio-329', price: 329, dailyData: 1.5, validity: 28, label: '₹329 · 1.5 GB/day · 28 days' },
  { id: 'jio-349', price: 349, dailyData: 2,   validity: 28, label: '₹349 · 2 GB/day · 28 days (5G)' },
  { id: 'jio-399', price: 399, dailyData: 2.5, validity: 28, label: '₹399 · 2.5 GB/day · 28 days (5G)' },
  { id: 'jio-899', price: 899, dailyData: 2,   validity: 90, label: '₹899 · 2 GB/day · 90 days (5G)' },
  { id: 'jio-999', price: 999, dailyData: 2,   validity: 98, label: '₹999 · 2 GB/day · 98 days (5G)' },
  { id: 'jio-3599', price: 3599, dailyData: 2.5, validity: 365, label: '₹3599 · 2.5 GB/day · 365 days' },
];

// ─── Airtel Prepaid Plans ──────────────────────────────────────
// Note: Airtel discontinued ₹299, ₹579, ₹619, ₹649 plans in Aug 2026.
// Source: airtel.in/recharge-online
export const airtelPlans = [
  { id: 'airtel-349', price: 349, dailyData: 2,   validity: 28, label: '₹349 · 2 GB/day · 28 days (5G)' },
  { id: 'airtel-409', price: 409, dailyData: 2.5, validity: 28, label: '₹409 · 2.5 GB/day · 28 days (5G)' },
  { id: 'airtel-449', price: 449, dailyData: 3,   validity: 28, label: '₹449 · 3 GB/day · 28 days (5G)' },
  { id: 'airtel-899', price: 899, dailyData: 1.5, validity: 84, label: '₹899 · 1.5 GB/day · 84 days' },
  { id: 'airtel-979', price: 979, dailyData: 2,   validity: 84, label: '₹979 · 2 GB/day · 84 days (5G)' },
  { id: 'airtel-3599', price: 3599, dailyData: 2, validity: 365, label: '₹3599 · 2 GB/day · 365 days' },
  { id: 'airtel-3999', price: 3999, dailyData: 2.5, validity: 365, label: '₹3999 · 2.5 GB/day · 365 days' },
];

// ─── Vi (Vodafone Idea) Prepaid Plans ──────────────────────────
// Source: myvi.in/prepaid/best-prepaid-plans
export const viPlans = [
  { id: 'vi-299',  price: 299,  dailyData: 1,   validity: 28,  label: '₹299 · 1 GB/day · 28 days' },
  { id: 'vi-349',  price: 349,  dailyData: 1.5, validity: 28,  label: '₹349 · 1.5 GB/day · 28 days (Hero Unlimited)' },
  { id: 'vi-479',  price: 479,  dailyData: 2,   validity: 28,  label: '₹479 · 2 GB/day · 28 days (Hero Unlimited)' },
  { id: 'vi-949',  price: 949,  dailyData: 1.5, validity: 84,  label: '₹949 · 1.5 GB/day · 84 days' },
  { id: 'vi-979',  price: 979,  dailyData: 2,   validity: 84,  label: '₹979 · 2 GB/day · 84 days (Hero Unlimited)' },
  { id: 'vi-3599', price: 3599, dailyData: 2,   validity: 365, label: '₹3599 · 2 GB/day · 365 days (Hero Unlimited)' },
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
