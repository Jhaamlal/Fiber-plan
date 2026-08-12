import { Plus, ArrowRight, Smartphone } from 'lucide-react';
import MemberCard from './MemberCard';
import { calculateTotalCurrentCost, formatCurrency } from '../utils/calculations';
import { useLanguage } from '../context/LanguageContext';
import './MemberInput.css';

export default function MemberInput({ members, onMembersChange, onNext }) {
  const { t } = useLanguage();
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

  const totalCost = calculateTotalCurrentCost(members);
  const hasPlans = members.some((m) => m.plan !== null);

  return (
    <div className="member-input">
      <div className="member-input__intro">
        <Smartphone size={20} className="member-input__intro-icon" />
        <p>{t('input.intro')}</p>
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
          <span>{t('input.add_phone')}</span>
        </button>
      )}

      {/* Running Total */}
      <div className="member-input__total">
        <div className="member-input__total-row">
          <span className="member-input__total-label">
            {members.length} {members.length > 1 ? t('general.phones') : t('general.phone')} · {t('input.total_spend')}
          </span>
          <span className="member-input__total-value">
            {formatCurrency(totalCost)}<span className="member-input__total-period">{t('card.mo')}</span>
          </span>
        </div>
      </div>

      {/* Next Button */}
      <button
        className="member-input__next"
        onClick={onNext}
        disabled={!hasPlans}
      >
        <span>{t('input.next')}</span>
        <ArrowRight size={20} />
      </button>
    </div>
  );
}
