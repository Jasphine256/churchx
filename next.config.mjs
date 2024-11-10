// Import the necessary module
import withPWA from 'next-pwa';

// Configure PWA settings
const withPWAConfig = {
  dest: 'public',
  // Place additional PWA-related options here if needed
};

// Define Next.js configuration
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['mongoose'],
  },
  webpack(config) {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
};

// Export the configuration with PWA
export default withPWA(withPWAConfig)(nextConfig);
