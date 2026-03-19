export const PROTOCOL = 'http'; // or 'https' if SSL is configured
export const ADDRESS = { local: '192.168.88.47', production: 'https://affiliatespublishers.com' };
export const PORT = '8001';

// export const BASE_URL = `${PROTOCOL}://${ADDRESS.local}:${PORT}/public`;
export const BASE_URL = ADDRESS.production;
