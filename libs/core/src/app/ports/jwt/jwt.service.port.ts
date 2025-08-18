import { TokenType } from './types';

export interface JWTService {
  create<CustomPayload extends Record<string, any>>(options: {
    type: TokenType;
    subject: string;
    secret: string;
    expiresIn: number;
    jti?: string;
    payload?: CustomPayload;
  }): string;

  decode<Payload extends Record<string, any>>(token: string, secret: string): Payload | null;
}
