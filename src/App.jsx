import { useState, useCallback } from 'react';
import Header from './components/Header';
import StepIndicator from './components/StepIndicator';
import MemberInput from './components/MemberInput';
import FiberPlanPicker from './components/FiberPlanPicker';
import SavingsResult from './components/SavingsResult';
import Footer from './components/Footer';
import { LanguageProvider } from './context/LanguageContext';
import { jioPlans } from './data/plans';
import { calculateTotalData, recommendPlan } from './utils/calculations';
import { bsnlFiberPlans } from './data/plans';

function createDefaultMember() {
  return {
    id: Date.now(),
    name: '',
    operator: 'jio',
    plan: jioPlans[4], // ₹299 plan as default
  };
}

export default function App() {
  const [step, setStep] = useState(1);
  const [members, setMembers] = useState([createDefaultMember()]);
  const [selectedPlanId, setSelectedPlanId] = useState(null);

  // Calculate recommended plan based on household data usage
  const totalData = calculateTotalData(members);
  const recommendedPlanId = recommendPlan(totalData, bsnlFiberPlans);

  const handleGoToStep2 = useCallback(() => {
    // Auto-select recommended plan if nothing selected
    if (!selectedPlanId) {
      setSelectedPlanId(recommendedPlanId);
    }
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedPlanId, recommendedPlanId]);

  const handleGoToStep3 = useCallback(() => {
    setStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleBack = useCallback((toStep) => {
    setStep(toStep);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleReset = useCallback(() => {
    setMembers([createDefaultMember()]);
    setSelectedPlanId(null);
    setStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <LanguageProvider>
      <div className="app">
        <Header />
        <StepIndicator currentStep={step} />

        {step === 1 && (
          <MemberInput
            members={members}
            onMembersChange={setMembers}
            onNext={handleGoToStep2}
          />
        )}

        {step === 2 && (
          <FiberPlanPicker
            selectedPlanId={selectedPlanId}
            onSelectPlan={setSelectedPlanId}
            recommendedPlanId={recommendedPlanId}
            onNext={handleGoToStep3}
            onBack={() => handleBack(1)}
          />
        )}

        {step === 3 && (
          <SavingsResult
            members={members}
            selectedPlanId={selectedPlanId}
            onBack={() => handleBack(2)}
            onReset={handleReset}
          />
        )}

        <Footer />
      </div>
    </LanguageProvider>
  );
}
