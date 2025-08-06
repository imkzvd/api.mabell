import { registerAs } from '@nestjs/config';

export default registerAs('typesense', () => ({
  host: process.env.TYPESENSE_HOST,
  port: parseInt(process.env.TYPESENSE_PORT || '6379', 10),
  protocol: process.env.TYPESENSE_PROTOCOL || 'http',
  key: process.env.TYPESENSE_KEY || 'xyz',
}));
