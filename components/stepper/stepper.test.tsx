import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import useStepper from "../../hooks/useStepper";
import Stepper from "./stepper";
import STEPS from "./steps";

jest.mock("../../hooks/useStepper");

const mockedUseStepper = useStepper as jest.Mock;

beforeEach(() => {
  jest.clearAllMocks();
});

test("renders step buttons and titles", () => {
  // default mock: first step active
  mockedUseStepper.mockReturnValue({ currentStep: 0, goToStep: jest.fn() });

  render(<Stepper />);

  // buttons for each step
  const buttons = screen.getAllByRole("button");
  expect(buttons).toHaveLength(STEPS.length);

  // each step title is rendered
  STEPS.forEach((s) => {
    expect(screen.getByText(s.title)).toBeInTheDocument();
  });
});

test("clicking a step button calls goToStep with its index", () => {
  const goToStep = jest.fn();
  mockedUseStepper.mockReturnValue({ currentStep: 0, goToStep });

  render(<Stepper />);

  const second = screen.getAllByRole("button")[1];
  fireEvent.click(second);

  expect(goToStep).toHaveBeenCalledWith(1);
});

test("buttons reflect active styling based on currentStep", () => {
  mockedUseStepper.mockReturnValue({ currentStep: 2, goToStep: jest.fn() });

  render(<Stepper />);

  const buttons = screen.getAllByRole("button");

  // indexes 0..2 should have active color, index 3 (if exists) should not
  buttons.forEach((btn, idx) => {
    if (idx <= 2) {
      expect(btn).toHaveClass("bg-blue-500");
    } else {
      expect(btn).not.toHaveClass("bg-blue-500");
    }
  });
});
