import { ArrowLeft, RotateCcw, Share2, IndianRupee, Phone, Tv, Wifi } from 'lucide-react';
import SavingsCounter from './SavingsCounter';
import SpeedComparison from './SpeedComparison';
import DataComparison from './DataComparison';
import { bsnlFiberPlans } from '../data/plans';
import {
  calculateTotalCurrentCost,
  calculateSavings,
  calculateTotalData,
  formatCurrency,
} from '../utils/calculations';
import './SavingsResult.css';

export default function SavingsResult({ members, selectedPlanId, onBack, onReset }) {
  const bsnlPlan = bsnlFiberPlans.find((p) => p.id === selectedPlanId);
  const totalCurrentCost = calculateTotalCurrentCost(members);
  const savings = calculateSavings(totalCurrentCost, bsnlPlan);
  const totalCurrentData = calculateTotalData(members);

  const handleShare = async () => {
    const text = `🏠 BSNL Fiber Savings Calculator\n\nOur family has ${members.length} phone(s) spending ${formatCurrency(totalCurrentCost)}/month on recharges.\n\nWith BSNL ${bsnlPlan.name} plan at ₹${bsnlPlan.price}/month, we save:\n💰 ${formatCurrency(savings.monthly)}/month\n📅 ${formatCurrency(savings.yearly)}/year\n\nPlus: ${bsnlPlan.speed} Mbps speed & ${bsnlPlan.dataLimit} GB data!\n\nCheck your savings too!`;

    if (navigator.share) {
      try {
        await navigator.share({ title: 'BSNL Fiber Savings', text });
      } catch (err) {
        // User cancelled
      }
    } else {
      try {
        await navigator.clipboard.writeText(text);
        alert('Copied to clipboard! Share it with your family.');
      } catch (err) {
        // Fallback
      }
    }
  };

  const isPositiveSavings = savings.monthly > 0;

  return (
    <div className="savings-result">
      {/* Hero */}
      <SavingsCounter
        daily={savings.daily}
        monthly={savings.monthly}
        yearly={savings.yearly}
      />

      {/* Cost Breakdown */}
      <div className="savings-result__breakdown">
        <h3 className="savings-result__section-title">
          <IndianRupee size={16} />
          Cost Breakdown
        </h3>
        <div className="savings-result__cost-row">
          <div className="savings-result__cost-item savings-result__cost-item--current">
            <span className="savings-result__cost-item-label">
              {members.length} Phone{members.length > 1 ? 's' : ''} (Current)
            </span>
            <span className="savings-result__cost-item-value">
              {formatCurrency(totalCurrentCost)}
              <small>/mo</small>
            </span>
          </div>
          <div className="savings-result__cost-vs">vs</div>
          <div className="savings-result__cost-item savings-result__cost-item--bsnl">
            <span className="savings-result__cost-item-label">
              BSNL {bsnlPlan.name}
            </span>
            <span className="savings-result__cost-item-value">
              {formatCurrency(bsnlPlan.price)}
              <small>/mo</small>
            </span>
          </div>
        </div>
      </div>

      {/* Speed Comparison */}
      <SpeedComparison bsnlSpeed={bsnlPlan.speed} />

      {/* Data Comparison */}
      <DataComparison
        currentDataGB={totalCurrentData}
        bsnlDataGB={bsnlPlan.dataLimit}
      />

      {/* Bonus Benefits */}
      <div className="savings-result__benefits">
        <h3 className="savings-result__section-title">
          <Wifi size={16} />
          Bonus Benefits
        </h3>
        <div className="savings-result__benefits-list">
          <div className="savings-result__benefit">
            <Wifi size={16} />
            <span>Everyone at home uses WiFi — no separate recharge per phone</span>
          </div>
          <div className="savings-result__benefit">
            <Phone size={16} />
            <span>Unlimited calls to any network included</span>
          </div>
          {bsnlPlan.extras.filter(e => e !== 'Unlimited Calls').length > 0 && (
            <div className="savings-result__benefit">
              <Tv size={16} />
              <span>Free OTT: {bsnlPlan.extras.filter(e => e !== 'Unlimited Calls').join(', ')}</span>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="savings-result__actions">
        <button className="savings-result__share" onClick={handleShare}>
          <Share2 size={18} />
          <span>Share with Family</span>
        </button>
        <div className="savings-result__secondary-actions">
          <button className="savings-result__back" onClick={onBack}>
            <ArrowLeft size={16} />
            Change Plan
          </button>
          <button className="savings-result__reset" onClick={onReset}>
            <RotateCcw size={16} />
            Start Over
          </button>
        </div>
      </div>
    </div>
  );
}
