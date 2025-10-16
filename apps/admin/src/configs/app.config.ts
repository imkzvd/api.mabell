import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: parseInt(process.env.ADMIN_APP_PORT || '3000', 10),
  apiURL: process.env.ADMIN_API_URL,
  env: process.env.NODE_ENV,
  mabellUserId: process.env.MABELL_USER_ID,
}));
