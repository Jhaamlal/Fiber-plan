import { Database } from 'lucide-react';
import ComparisonBar from './ComparisonBar';
import { formatData } from '../utils/calculations';
import './DataComparison.css';

export default function DataComparison({ currentDataGB, bsnlDataGB }) {
  return (
    <div className="data-comparison">
      <div className="data-comparison__header">
        <Database size={18} className="data-comparison__icon" />
        <h3>Data Comparison</h3>
      </div>
      <ComparisonBar
        label1="Current (all phones combined)"
        value1={Math.round(currentDataGB)}
        label2="BSNL Fiber"
        value2={bsnlDataGB}
        unit="GB/mo"
        color1="var(--color-danger)"
        color2="linear-gradient(90deg, var(--color-primary), var(--color-primary-light))"
        delay={400}
      />
      <div className="data-comparison__highlight">
        <span className="data-comparison__highlight-value">
          {formatData(bsnlDataGB - currentDataGB)}
        </span>
        <span className="data-comparison__highlight-label">more data with Fiber!</span>
      </div>
    </div>
  );
}
