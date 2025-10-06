import { useCallback, useEffect, useState } from "react";
import STEPS from "../components/stepper/steps";

let storeCurrent = 0;
const listeners = new Set<(s: number) => void>();
let initialized = false;

function notify(step: number) {
  listeners.forEach((l) => l(step));
}

function setStore(step: number) {
  storeCurrent = step;
  notify(step);
}

export default function useStepper(initialStep = 0) {
  if (!initialized) {
    storeCurrent = initialStep;
    initialized = true;
  }

  const [current, setCurrent] = useState<number>(storeCurrent);

  useEffect(() => {
    const l = (s: number) => setCurrent(s);
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  }, []);

  const handleNextStep = useCallback(() => {
    if (STEPS && storeCurrent >= STEPS.length) return;
    setStore(storeCurrent + 1);
  }, []);
  const handlePrevStep = useCallback(() => {
    setStore(Math.max(0, storeCurrent - 1));
  }, []);
  const goToStep = useCallback((index: number) => setStore(index), []);

  return {
    currentStep: current,
    handleNextStep,
    handlePrevStep,
    goToStep,
  };
}
