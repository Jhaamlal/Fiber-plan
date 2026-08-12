import { useEffect, useState } from 'react';
import './ComparisonBar.css';

export default function ComparisonBar({ label1, value1, label2, value2, unit, color1, color2, delay = 0 }) {
  const [animate, setAnimate] = useState(false);
  const maxValue = Math.max(value1, value2);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className="comparison-bar" style={{ animationDelay: `${delay}ms` }}>
      {/* Bar 1 */}
      <div className="comparison-bar__row">
        <span className="comparison-bar__label">{label1}</span>
        <div className="comparison-bar__track">
          <div
            className="comparison-bar__fill"
            style={{
              width: animate ? `${(value1 / maxValue) * 100}%` : '0%',
              background: color1,
            }}
          />
        </div>
        <span className="comparison-bar__value">{value1.toLocaleString('en-IN')} {unit}</span>
      </div>

      {/* Bar 2 */}
      <div className="comparison-bar__row">
        <span className="comparison-bar__label">{label2}</span>
        <div className="comparison-bar__track">
          <div
            className="comparison-bar__fill"
            style={{
              width: animate ? `${(value2 / maxValue) * 100}%` : '0%',
              background: color2,
            }}
          />
        </div>
        <span className="comparison-bar__value">{value2.toLocaleString('en-IN')} {unit}</span>
      </div>
    </div>
  );
}
