import { Database } from 'lucide-react';
import ComparisonBar from './ComparisonBar';
import { formatData } from '../utils/calculations';
import { useLanguage } from '../context/LanguageContext';
import './DataComparison.css';

export default function DataComparison({ currentDataGB, bsnlDataGB }) {
  const { t } = useLanguage();
  return (
    <div className="data-comparison">
      <div className="data-comparison__header">
        <Database size={18} className="data-comparison__icon" />
        <h3>{t('compare.data.title')}</h3>
      </div>
      <ComparisonBar
        label1={t('compare.data.mobile')}
        value1={Math.round(currentDataGB)}
        label2={t('compare.data.fiber')}
        value2={bsnlDataGB}
        unit={`${t('picker.data')}${t('card.mo')}`}
        color1="var(--color-danger)"
        color2="linear-gradient(90deg, var(--color-primary), var(--color-primary-light))"
        delay={400}
      />
      <div className="data-comparison__highlight">
        <span className="data-comparison__highlight-value">
          {formatData(bsnlDataGB - currentDataGB)}
        </span>
        <span className="data-comparison__highlight-label">{t('compare.data.more')}</span>
      </div>
    </div>
  );
}
