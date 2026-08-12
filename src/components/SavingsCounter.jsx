import { useState, useEffect, useRef } from 'react';
import { formatCurrency } from '../utils/calculations';
import './SavingsCounter.css';

export default function SavingsCounter({ daily, monthly, yearly }) {
  const [activeTab, setActiveTab] = useState('monthly');
  const [displayValue, setDisplayValue] = useState(0);
  const animationRef = useRef(null);

  const values = { daily, monthly, yearly };
  const labels = { daily: 'Per Day', monthly: 'Per Month', yearly: 'Per Year' };
  const targetValue = values[activeTab];

  useEffect(() => {
    const duration = 1200;
    const startTime = performance.now();
    const startValue = 0;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(startValue + (targetValue - startValue) * eased));

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [targetValue]);

  const isPositive = targetValue > 0;

  return (
    <div className="savings-counter">
      {/* Tab Selector */}
      <div className="savings-counter__tabs">
        {Object.entries(labels).map(([key, label]) => (
          <button
            key={key}
            className={`savings-counter__tab ${
              activeTab === key ? 'savings-counter__tab--active' : ''
            }`}
            onClick={() => setActiveTab(key)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Counter */}
      <div className={`savings-counter__value ${isPositive ? 'savings-counter__value--positive' : 'savings-counter__value--negative'}`}>
        <span className="savings-counter__prefix">{isPositive ? 'You Save' : 'Extra Cost'}</span>
        <span className="savings-counter__amount">{formatCurrency(displayValue)}</span>
        <span className="savings-counter__period">{labels[activeTab].toLowerCase()}</span>
      </div>

      {isPositive && (
        <p className="savings-counter__note">
          That's {formatCurrency(yearly)} saved every year! 🎉
        </p>
      )}
    </div>
  );
}
