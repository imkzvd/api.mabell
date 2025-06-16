import * as jwt from 'jsonwebtoken';
import { JWTService } from '../../../core/app/common/ports/jwt.service.port';

export class JWTServiceAdapter implements JWTService {
  create<Payload extends Record<string, any>>(
    payload: Payload,
    secret: string,
    expiresIn: number,
  ): string {
    return jwt.sign(payload, secret, { expiresIn });
  }

  decode<Payload extends Record<string, any>>(token: string, secret: string): Payload | null {
    try {
      return jwt.verify(token, secret) as Payload;
    } catch {
      return null;
    }
  }
}
