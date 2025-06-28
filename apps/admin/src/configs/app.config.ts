import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: parseInt(process.env.ADMIN_APP_PORT || '3000', 10),
  apiURL: process.env.API_URL,
  env: process.env.NODE_ENV,
}));
