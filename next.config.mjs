/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ["@untitledui/icons", "@untitledui/country-flags"],
  },
  output: "standalone",
  async redirects() {
    const redirects = [
      ["/dashboard", "/rayda-remote/dashboard"],
      ["/employees", "/rayda-remote/employees"],
      ["/equipment", "/rayda-remote/equipment"],
      ["/login", "/rayda-remote/signup"],
      ["/onboard-device", "/rayda-remote/onboard-device"],
      ["/onboard-device/marketplace", "/rayda-remote/onboard-device/marketplace"],
      ["/onboarding", "/rayda-remote/onboarding"],
      ["/onboarding/goal-1", "/rayda-remote/onboarding/goal-1"],
      ["/orders", "/rayda-remote/orders"],
      ["/orders/:orderId", "/rayda-remote/orders/:orderId"],
      ["/signup", "/rayda-remote/signup"],
      ["/signup/check-email", "/rayda-remote/signup/check-email"],
      ["/rfq-management", "/rayda-admin/rfq-management"],
      ["/rfq-management/:id", "/rayda-admin/rfq-management/:id"],
      ["/overview", "/remote-employees/overview"],
      ["/order-summary", "/remote-employees/order-summary"],
      ["/employee/overview", "/remote-employees/overview"],
      ["/employee/orders/:orderId", "/remote-employees/order-summary"],
      ["/vendor-portal/vendor-portal", "/vendor-portal"],
    ];
    return redirects.map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }));
  },
};

export default nextConfig;
