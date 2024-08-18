import React, { useState } from 'react';

interface StepProps {
  children: React.ReactElement;
  step: number;
}

interface FunnelProps {
  children: Array<React.ReactElement<StepProps>>;
}

export const useFunnel = () => {
  const [step, setStep] = useState(0);

  const Step = ({ children }: StepProps) => {
    return children;
  };

  const Funnel = ({ children }: FunnelProps) => {
    const targetStep = children.find((childStep) => childStep.props.step === step);
    return Object.assign({}, targetStep, { Step });
  };

  Funnel.step = Step;
  return { Funnel, step, setStep };
};
