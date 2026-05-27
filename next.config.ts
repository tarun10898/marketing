import type { NextConfig } from 'next';
import { securityHeaders } from './config/security';

const nextConfig: NextConfig = {
	poweredByHeader: false,
	reactStrictMode: true,
	async headers() {
		return [
			{
				source: '/(.*)',
				headers: [...securityHeaders],
			},
		];
	},
};

export default nextConfig;
