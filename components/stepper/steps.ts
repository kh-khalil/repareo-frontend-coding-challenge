export type StepItem = {
  id?: string | number;
  title: string;
  subtitle?: string;
};

const STEPS: StepItem[] = [
  { id: 1, title: "Create account", subtitle: "Personal information" },
  { id: 2, title: "Company details", subtitle: "Business info" },
  { id: 3, title: "Verification", subtitle: "Upload documents" },
  { id: 4, title: "Finish", subtitle: "Ready to go" },
];

export default STEPS;
