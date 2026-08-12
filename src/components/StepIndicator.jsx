import { Check } from 'lucide-react';
import './StepIndicator.css';

const steps = [
  { number: 1, label: 'Your Phones' },
  { number: 2, label: 'Choose Plan' },
  { number: 3, label: 'Your Savings' },
];

export default function StepIndicator({ currentStep }) {
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
