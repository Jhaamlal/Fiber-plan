import { ArrowRight, ArrowLeft, Zap, Star, Check, Wifi } from 'lucide-react';
import { bsnlFiberPlans } from '../data/plans';
import { useLanguage } from '../context/LanguageContext';
import { formatData } from '../utils/calculations';
import './FiberPlanPicker.css';

export default function FiberPlanPicker({
  selectedPlanId,
  onSelectPlan,
  recommendedPlanId,
  onNext,
  onBack,
}) {
  const { t } = useLanguage();
  return (
    <div className="fiber-picker">
      <div className="fiber-picker__intro">
        <Wifi size={20} className="fiber-picker__intro-icon" />
        <p>{t('picker.intro')}</p>
      </div>

      <div className="fiber-picker__list">
        {bsnlFiberPlans.map((plan) => {
          const isSelected = selectedPlanId === plan.id;
          const isRecommended = recommendedPlanId === plan.id;

          return (
            <button
              key={plan.id}
              className={`fiber-card ${isSelected ? 'fiber-card--selected' : ''} ${
                isRecommended ? 'fiber-card--recommended' : ''
              }`}
              onClick={() => onSelectPlan(plan.id)}
            >
              {/* Badges */}
              <div className="fiber-card__badges">
                {isRecommended && (
                  <span className="fiber-card__badge fiber-card__badge--recommended">
                    <Star size={12} /> {t('picker.best_for_you')}
                  </span>
                )}
                {plan.badge && (
                  <span className="fiber-card__badge fiber-card__badge--info">
                    {plan.badge}
                  </span>
                )}
              </div>

              {/* Plan Header */}
              <div className="fiber-card__header">
                <div className="fiber-card__name">{t(`plan.${plan.id}`)}</div>
                <div className="fiber-card__price">
                  <span className="fiber-card__price-amount">₹{plan.price}</span>
                  <span className="fiber-card__price-period">{t('card.mo')}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="fiber-card__stats">
                <div className="fiber-card__stat">
                  <Zap size={14} />
                  <span>{plan.speed} Mbps</span>
                </div>
                <div className="fiber-card__stat">
                  <span className="fiber-card__stat-dot" />
                  <span>{formatData(plan.dataLimit)}</span>
                </div>
                <div className="fiber-card__stat fiber-card__stat--muted">
                  After: {plan.afterLimitSpeed} Mbps
                </div>
              </div>

              {/* Extras */}
              <div className="fiber-card__extras">
                {plan.extras.map((extra, i) => (
                  <span key={i} className="fiber-card__extra">
                    <Check size={12} /> {extra === 'Unlimited Calls' ? t('general.unlimited_calls') : extra}
                  </span>
                ))}
              </div>

              {/* Selection Indicator */}
              {isSelected && (
                <div className="fiber-card__selected-indicator">
                  <Check size={16} />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="fiber-picker__nav">
        <button className="fiber-picker__back" onClick={onBack}>
          <ArrowLeft size={18} />
          <span>{t('picker.back')}</span>
        </button>
        <button
          className="fiber-picker__next"
          onClick={onNext}
          disabled={!selectedPlanId}
        >
          <span>{t('picker.next')}</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
