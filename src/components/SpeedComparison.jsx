import { Zap } from 'lucide-react';
import ComparisonBar from './ComparisonBar';
import { useLanguage } from '../context/LanguageContext';
import './SpeedComparison.css';

export default function SpeedComparison({ bsnlSpeed }) {
  const { t } = useLanguage();
  const mobileSpeed = 30; // Average 4G speed

  return (
    <div className="speed-comparison">
      <div className="speed-comparison__header">
        <Zap size={18} className="speed-comparison__icon" />
        <h3>{t('compare.speed.title')}</h3>
      </div>
      <ComparisonBar
        label1={t('compare.speed.mobile')}
        value1={mobileSpeed}
        label2={t('compare.speed.fiber')}
        value2={bsnlSpeed}
        unit={t('picker.speed')}
        color1="var(--color-danger)"
        color2="linear-gradient(90deg, var(--color-accent), var(--color-accent-light))"
        delay={200}
      />
      <p className="speed-comparison__note">
        {t('compare.speed.note')}
      </p>
    </div>
  );
}
