export const STEP_0_QUESTIONS = [
  {
    key: "employeeCount",
    question: "How many employees are in your organization?",
    options: ["1–50", "51–200", "201–500", "500+"],
    multiSelect: false,
  },
  {
    key: "teamSetup",
    question: "How is your team set up?",
    options: ["Single office", "Multi-office", "Fully remote", "Hybrid"],
    multiSelect: false,
  },
  {
    key: "role",
    question: "What best describes your role?",
    options: ["IT Admin/Manager", "HR/People Ops", "Finance/Operations", "Founder wearing multiple hats"],
    multiSelect: false,
  },
] as const;

export const STEP_1_QUESTIONS = [
  {
    key: "itCoverage",
    question: "Do you have a dedicated IT person or team?",
    options: ["Yes, dedicated IT team", "Yes, one IT person", "No, IT is handled ad hoc"],
    multiSelect: false,
  },
  {
    key: "devicePolicy",
    question: "What is your device policy?",
    options: ["BYOD (Bring Your Own Device)", "Company-issued", "Both"],
    multiSelect: false,
  },
  {
    key: "mdm",
    question: "Do you use an MDM (Mobile Device Manager)?",
    options: ["Yes — Jamf", "Yes — Intune", "Yes — Kandji", "Yes — Other", "No", "Not sure"],
    multiSelect: false,
  },
] as const;

export const STEP_2_QUESTIONS = [
  {
    key: "laptopTypes",
    question: "What laptops does your company issue?",
    options: ["MacBooks", "Windows (HP, Dell, Lenovo…)", "Both"],
    multiSelect: false,
  },
  {
    key: "compliance",
    question: "Do you have any compliance requirements?",
    options: ["SOC 2", "ISO 27001", "HIPAA", "GDPR", "Cyber Essentials", "None", "Exploring"],
    multiSelect: true,
  },
] as const;

export const ALL_QUESTION_STEPS = [STEP_0_QUESTIONS, STEP_1_QUESTIONS, STEP_2_QUESTIONS];
