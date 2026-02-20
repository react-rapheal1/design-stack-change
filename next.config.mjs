/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        optimizePackageImports: ["@untitledui/icons", "@untitledui/country-flags"],
    },
};

export default nextConfig;
