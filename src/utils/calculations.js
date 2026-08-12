/**
 * Normalize a recharge plan's cost to a 30-day monthly cost.
 * @param {number} price - Plan price in ₹
 * @param {number} validity - Plan validity in days
 * @returns {number} Monthly cost (30-day normalized)
 */
export function normalizeMonthlyCost(price, validity) {
  return (price / validity) * 30;
}

/**
 * Calculate the total monthly cost across all family members.
 * @param {Array} members - Array of { operator, planId, plan }
 * @returns {number} Total monthly cost in ₹
 */
export function calculateTotalCurrentCost(members) {
  return members.reduce((total, member) => {
    if (!member.plan) return total;
    return total + normalizeMonthlyCost(member.plan.price, member.plan.validity);
  }, 0);
}

/**
 * Calculate the total recharge cost across all family members (exact sum of plan prices).
 * @param {Array} members - Array of { operator, planId, plan }
 * @returns {number} Total recharge cost in ₹
 */
export function calculateTotalRechargeCost(members) {
  return members.reduce((total, member) => {
    if (!member.plan) return total;
    return total + member.plan.price;
  }, 0);
}

/**
 * Calculate savings comparing current spend vs BSNL Fiber.
 * @param {number} totalCurrentMonthly - Total current monthly spend in ₹
 * @param {object} bsnlPlan - Selected BSNL plan { price, ... }
 * @returns {{ daily: number, monthly: number, yearly: number }}
 */
export function calculateSavings(totalCurrentMonthly, bsnlPlan) {
  const monthly = totalCurrentMonthly - bsnlPlan.price;
  return {
    daily: Math.round(monthly / 30),
    monthly: Math.round(monthly),
    yearly: Math.round(monthly * 12),
  };
}

/**
 * Calculate total monthly data consumed across all family members (in GB).
 * @param {Array} members - Array of { plan }
 * @returns {number} Total monthly data in GB
 */
export function calculateTotalData(members) {
  return members.reduce((total, member) => {
    if (!member.plan) return total;
    return total + member.plan.dailyData * 30;
  }, 0);
}

/**
 * Recommend the best BSNL plan based on household data consumption.
 * Picks the cheapest plan whose data limit covers the household's monthly usage.
 * @param {number} totalDataGB - Household monthly data in GB
 * @param {Array} bsnlPlans - Available BSNL plans
 * @returns {string} Recommended plan ID
 */
export function recommendPlan(totalDataGB, bsnlPlans) {
  // Find cheapest plan that covers the data needs
  const sorted = [...bsnlPlans].sort((a, b) => a.price - b.price);
  const recommended = sorted.find(p => p.dataLimit >= totalDataGB);
  // If no plan covers it, recommend the largest
  return recommended ? recommended.id : sorted[sorted.length - 1].id;
}

/**
 * Format a number as Indian currency (₹X,XXX).
 * @param {number} amount
 * @returns {string}
 */
export function formatCurrency(amount) {
  const absAmount = Math.abs(Math.round(amount));
  return '₹' + absAmount.toLocaleString('en-IN');
}

/**
 * Format GB amount.
 * @param {number} gb
 * @returns {string}
 */
export function formatData(gb) {
  if (gb >= 1000) {
    return (gb / 1000).toFixed(1).replace(/\.0$/, '') + ' TB';
  }
  return Math.round(gb) + ' GB';
}
