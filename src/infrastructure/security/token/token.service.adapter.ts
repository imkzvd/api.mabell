import * as jwt from 'jsonwebtoken';
import { TokenService } from '../../../core/app/common/ports/token.service.port';

export class TokenServiceAdapter implements TokenService {
  create<TokenPayload extends Record<string, any>>(
    payload: TokenPayload,
    secret: string,
    expiresIn: number,
  ): string {
    return jwt.sign(payload, secret, { expiresIn });
  }

  decode<TokenPayload extends Record<string, any>>(
    token: string,
    secret: string,
  ): TokenPayload | null {
    try {
      return jwt.verify(token, secret) as TokenPayload;
    } catch {
      return null;
    }
  }
}
