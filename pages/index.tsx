import Button from "../components/repareo/button";
import ButtonWrapper from "../components/repareo/buttonWrapper";
import Header from "../components/repareo/header";
import MainWrapper from "../components/repareo/mainWrapper";
import StepperWrapper from "../components/repareo/stepperWrapper";
import Stepper from "../components/stepper/stepper";
import STEPS from "../components/stepper/steps";
import useStepper from "../hooks/useStepper";

export default function Home() {
  const { currentStep, handleNextStep, handlePrevStep } = useStepper();
  return (
    <>
      <Header />
      <MainWrapper>
        <StepperWrapper>
          {/*TODO: Make sure the Stepper handles clicks on the button*/}
          <Stepper />
        </StepperWrapper>
        <ButtonWrapper>
          {currentStep > 0 && (
            <Button onClick={handlePrevStep}>Previous</Button>
          )}
          <Button onClick={handleNextStep}>
            {currentStep === STEPS.length ? "Finish" : "Next"}
          </Button>
        </ButtonWrapper>
      </MainWrapper>
    </>
  );
}
