import { X, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { operators, getPlansForOperator } from '../data/plans';
import { normalizeMonthlyCost, formatCurrency } from '../utils/calculations';
import './MemberCard.css';

export default function MemberCard({ member, index, onUpdate, onRemove, canRemove }) {
  const [showPlans, setShowPlans] = useState(false);
  const plans = getPlansForOperator(member.operator);
  const monthlyCost = member.plan
    ? normalizeMonthlyCost(member.plan.price, member.plan.validity)
    : 0;

  const handleOperatorChange = (operatorId) => {
    const operatorPlans = getPlansForOperator(operatorId);
    onUpdate({
      ...member,
      operator: operatorId,
      plan: operatorPlans[0] || null,
    });
    setShowPlans(false);
  };

  const handlePlanSelect = (plan) => {
    onUpdate({ ...member, plan });
    setShowPlans(false);
  };

  const operatorColor = operators.find(o => o.id === member.operator)?.color || '#6366F1';

  return (
    <div
      className="member-card"
      style={{ '--operator-color': operatorColor }}
    >
      <div className="member-card__header">
        <div className="member-card__number">{index + 1}</div>
        <input
          className="member-card__name"
          type="text"
          value={member.name}
          onChange={(e) => onUpdate({ ...member, name: e.target.value })}
          placeholder={`Phone ${index + 1}`}
          maxLength={20}
        />
        {canRemove && (
          <button
            className="member-card__remove"
            onClick={onRemove}
            aria-label="Remove member"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Operator Pills */}
      <div className="member-card__operators">
        {operators.map((op) => (
          <button
            key={op.id}
            className={`member-card__operator-pill ${
              member.operator === op.id ? 'member-card__operator-pill--active' : ''
            }`}
            onClick={() => handleOperatorChange(op.id)}
            style={{
              '--pill-color': op.color,
              '--pill-bg': op.id === 'jio'
                ? 'var(--color-jio-bg)'
                : op.id === 'airtel'
                ? 'var(--color-airtel-bg)'
                : 'var(--color-vi-bg)',
            }}
          >
            {op.name}
          </button>
        ))}
      </div>

      {/* Plan Selector */}
      <button
        className="member-card__plan-selector"
        onClick={() => setShowPlans(!showPlans)}
      >
        <div className="member-card__plan-info">
          {member.plan ? (
            <>
              <span className="member-card__plan-price">₹{member.plan.price}</span>
              <span className="member-card__plan-detail">
                {member.plan.dailyData} GB/day · {member.plan.validity} days
              </span>
            </>
          ) : (
            <span className="member-card__plan-detail">Select a plan</span>
          )}
        </div>
        <ChevronDown
          size={18}
          className={`member-card__chevron ${showPlans ? 'member-card__chevron--open' : ''}`}
        />
      </button>

      {/* Plan Dropdown */}
      {showPlans && (
        <div className="member-card__plan-list">
          {plans.map((plan) => (
            <button
              key={plan.id}
              className={`member-card__plan-option ${
                member.plan?.id === plan.id ? 'member-card__plan-option--selected' : ''
              }`}
              onClick={() => handlePlanSelect(plan)}
            >
              <span className="member-card__plan-option-price">₹{plan.price}</span>
              <span className="member-card__plan-option-data">
                {plan.dailyData} GB/day
              </span>
              <span className="member-card__plan-option-validity">
                {plan.validity} days
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Recharge Cost */}
      {member.plan && (
        <div className="member-card__cost">
          <span className="member-card__cost-label">Recharge amount</span>
          <span className="member-card__cost-value">
            ₹{member.plan.price}
            <span className="member-card__cost-validity"> / {member.plan.validity} days</span>
          </span>
        </div>
      )}
    </div>
  );
}
