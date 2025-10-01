import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: parseInt(process.env.CLIENT_APP_PORT || '4000', 10),
  apiURL: process.env.CLIENT_API_URL,
  env: process.env.NODE_ENV,
}));
