export const appRoutes = {
  raydaAdmin: {
    root: "/rayda-admin",
    rfqManagement: "/rayda-admin/rfq-management",
    rfqDetails: (id: string) => `/rayda-admin/rfq-management/${id}`,
  },
  raydaRemote: {
    root: "/rayda-remote",
    dashboard: "/rayda-remote/dashboard",
    employees: "/rayda-remote/employees",
    equipment: "/rayda-remote/equipment",
    onboardDevice: "/rayda-remote/onboard-device",
    marketplace: "/rayda-remote/onboard-device/marketplace",
    onboarding: "/rayda-remote/onboarding",
    onboardingGoalOne: "/rayda-remote/onboarding/goal-1",
    orders: "/rayda-remote/orders",
    orderDetails: (id: string) => `/rayda-remote/orders/${id}`,
    signup: "/rayda-remote/signup",
    signupCheckEmail: "/rayda-remote/signup/check-email",
  },
  vendorPortal: {
    root: "/vendor-portal",
  },
  remoteEmployees: {
    root: "/remote-employees",
    overview: "/remote-employees/overview",
    orderSummary: "/remote-employees/order-summary",
  },
} as const;
