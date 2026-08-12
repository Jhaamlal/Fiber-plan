import { Zap } from 'lucide-react';
import ComparisonBar from './ComparisonBar';
import './SpeedComparison.css';

export default function SpeedComparison({ bsnlSpeed }) {
  const mobileSpeed = 30; // Average 4G speed

  return (
    <div className="speed-comparison">
      <div className="speed-comparison__header">
        <Zap size={18} className="speed-comparison__icon" />
        <h3>Speed Comparison</h3>
      </div>
      <ComparisonBar
        label1="Mobile 4G (avg.)"
        value1={mobileSpeed}
        label2={`BSNL Fiber`}
        value2={bsnlSpeed}
        unit="Mbps"
        color1="var(--color-danger)"
        color2="linear-gradient(90deg, var(--color-accent), var(--color-accent-light))"
        delay={200}
      />
      <p className="speed-comparison__note">
        Fiber speed is dedicated to your home — all devices share this simultaneously over WiFi.
      </p>
    </div>
  );
}
