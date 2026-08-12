import { Plus, ArrowRight, Smartphone } from 'lucide-react';
import MemberCard from './MemberCard';
import { calculateTotalRechargeCost, formatCurrency } from '../utils/calculations';
import './MemberInput.css';

export default function MemberInput({ members, onMembersChange, onNext }) {
  const addMember = () => {
    if (members.length >= 10) return;
    onMembersChange([
      ...members,
      {
        id: Date.now(),
        name: '',
        operator: 'jio',
        plan: null,
      },
    ]);
  };

  const updateMember = (index, updatedMember) => {
    const updated = [...members];
    updated[index] = updatedMember;
    onMembersChange(updated);
  };

  const removeMember = (index) => {
    const updated = members.filter((_, i) => i !== index);
    onMembersChange(updated);
  };

  const totalCost = calculateTotalRechargeCost(members);
  const hasPlans = members.some((m) => m.plan !== null);

  return (
    <div className="member-input">
      <div className="member-input__intro">
        <Smartphone size={20} className="member-input__intro-icon" />
        <p>Add each phone in your household and select their current recharge plan.</p>
      </div>

      <div className="member-input__list">
        {members.map((member, index) => (
          <MemberCard
            key={member.id}
            member={member}
            index={index}
            onUpdate={(updated) => updateMember(index, updated)}
            onRemove={() => removeMember(index)}
            canRemove={members.length > 1}
          />
        ))}
      </div>

      {members.length < 10 && (
        <button className="member-input__add" onClick={addMember}>
          <Plus size={20} />
          <span>Add Another Phone</span>
        </button>
      )}

      {/* Running Total */}
      <div className="member-input__total">
        <div className="member-input__total-row">
          <span className="member-input__total-label">
            {members.length} phone{members.length > 1 ? 's' : ''} · Total recharge amount
          </span>
          <span className="member-input__total-value">
            {formatCurrency(totalCost)}
          </span>
        </div>
      </div>

      {/* Next Button */}
      <button
        className="member-input__next"
        onClick={onNext}
        disabled={!hasPlans}
      >
        <span>Choose BSNL Fiber Plan</span>
        <ArrowRight size={18} />
      </button>
    </div>
  );
}
