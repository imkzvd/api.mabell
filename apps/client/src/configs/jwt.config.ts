import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  accessToken: {
    secret: process.env.JWT_ACCESS_SECRET,
    expiresIn: parseInt(process.env.JWT_ACCESS_EXPIRES_IN || '3600', 10),
  },
  refreshToken: {
    secret: process.env.JWT_REFRESH_SECRET,
    expiresIn: parseInt(process.env.JWT_REFRESH_EXPIRES_IN || '86400', 10),
  },
}));
