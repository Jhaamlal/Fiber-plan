import { Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './StepIndicator.css';

export default function StepIndicator({ currentStep }) {
  const { t } = useLanguage();

  const steps = [
    { number: 1, label: t('step.1') },
    { number: 2, label: t('step.2') },
    { number: 3, label: t('step.3') },
  ];

  return (
    <div className="step-indicator" role="navigation" aria-label="Progress">
      {steps.map((step, index) => (
        <div key={step.number} className="step-indicator__item">
          <div
            className={`step-indicator__circle ${
              currentStep > step.number
                ? 'step-indicator__circle--completed'
                : currentStep === step.number
                ? 'step-indicator__circle--active'
                : ''
            }`}
          >
            {currentStep > step.number ? (
              <Check size={14} strokeWidth={3} />
            ) : (
              step.number
            )}
          </div>
          <span
            className={`step-indicator__label ${
              currentStep >= step.number ? 'step-indicator__label--active' : ''
            }`}
          >
            {step.label}
          </span>
          {index < steps.length - 1 && (
            <div
              className={`step-indicator__line ${
                currentStep > step.number ? 'step-indicator__line--completed' : ''
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
