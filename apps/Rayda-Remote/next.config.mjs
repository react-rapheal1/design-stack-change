/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        optimizePackageImports: ["@untitledui/icons", "@untitledui/country-flags"],
    },
    transpilePackages: ["@rayda/shared"],
};

export default nextConfig;
