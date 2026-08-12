import { ArrowLeft, RotateCcw, Share2, IndianRupee, Phone, Tv, Wifi, Star } from 'lucide-react';
import SavingsCounter from './SavingsCounter';
import SpeedComparison from './SpeedComparison';
import DataComparison from './DataComparison';
import { useLanguage } from '../context/LanguageContext';
import { bsnlFiberPlans } from '../data/plans';
import {
  calculateTotalCurrentCost,
  calculateSavings,
  calculateTotalData,
  formatCurrency,
} from '../utils/calculations';
import './SavingsResult.css';

export default function SavingsResult({ members, selectedPlanId, onBack, onReset }) {
  const { t } = useLanguage();
  const bsnlPlan = bsnlFiberPlans.find((p) => p.id === selectedPlanId);
  const totalCurrentCost = calculateTotalCurrentCost(members);
  const savings = calculateSavings(totalCurrentCost, bsnlPlan);
  const totalCurrentData = calculateTotalData(members);

  const handleShare = async () => {
    const text = `🏠 ${t('savings.share_title')}\n\nOur family has ${members.length} phone(s) spending ${formatCurrency(totalCurrentCost)}/month on recharges.\n\nWith BSNL ${t(`plan.${bsnlPlan.id}`)} plan at ₹${bsnlPlan.price}/month, we save:\n💰 ${formatCurrency(savings.monthly)}/month\n📅 ${formatCurrency(savings.yearly)}/year\n\nPlus: ${bsnlPlan.speed} Mbps speed & ${bsnlPlan.dataLimit} GB data!\n\nCheck your savings too!`;

    if (navigator.share) {
      try {
        await navigator.share({ title: t('savings.share_title'), text });
      } catch (err) {
        // User cancelled
      }
    } else {
      try {
        await navigator.clipboard.writeText(text);
        alert(t('savings.shared'));
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

      <div className="savings-result__grid">
        {/* Cost Breakdown */}
        <div className="savings-result__breakdown">
          <h3 className="savings-result__section-title">
            <IndianRupee size={16} />
            {t('savings.cost_breakdown')}
          </h3>
          <div className="savings-result__cost-row">
            <div className="savings-result__cost-item savings-result__cost-item--current">
              <span className="savings-result__cost-item-label">
                {members.length} {t('general.phones')} {t('savings.phones_current')}
              </span>
              <span className="savings-result__cost-item-value">
                {formatCurrency(totalCurrentCost)}
                <small>/mo</small>
              </span>
            </div>
            <div className="savings-result__cost-vs">vs</div>
            <div className="savings-result__cost-item savings-result__cost-item--bsnl">
              <span className="savings-result__cost-item-label">
                {t(`plan.${bsnlPlan.id}`)} {t('savings.fiber_plan')}
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
            {t('savings.bonus_benefits')}
          </h3>
          <div className="savings-result__benefits-list">
            <div className="savings-result__benefit">
              <Tv size={16} />
              <span>{t('savings.benefit_wifi')}</span>
            </div>
            <div className="savings-result__benefit">
              <Phone size={16} />
              <span>{t('savings.benefit_calls')}</span>
            </div>
            {bsnlPlan.extras.filter(e => e !== 'Unlimited Calls').length > 0 && (
              <div className="savings-result__benefit">
                <Star size={16} className="savings-result__benefit-star" />
                <span>{t('savings.benefit_ott')}: {bsnlPlan.extras.filter(e => e !== 'Unlimited Calls').join(', ')}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="savings-result__actions">
        <button className="savings-result__share" onClick={handleShare}>
          <Share2 size={18} />
          <span>{t('savings.share')}</span>
        </button>
        <div className="savings-result__secondary-actions">
          <button className="savings-result__back" onClick={onBack}>
            <ArrowLeft size={16} />
            {t('savings.change_plan')}
          </button>
          <button className="savings-result__reset" onClick={onReset}>
            <RotateCcw size={16} />
            {t('savings.start_over')}
          </button>
        </div>
      </div>
    </div>
  );
}
