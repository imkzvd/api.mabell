import * as jwt from 'jsonwebtoken';
import { JWTService } from '../../../core/app/common/ports/jwt.service.port';

export class JwtService implements JWTService {
  create<CustomPayload extends Record<string, any>>(options: {
    type: 'access' | 'refresh';
    subject: string;
    secret: string;
    expiresIn: number;
    jti?: string;
    payload?: CustomPayload;
  }): string {
    return jwt.sign(
      {
        type: options.type,
        ...options.payload,
      },
      options.secret,
      {
        expiresIn: options.expiresIn,
        subject: options.subject,
        ...(options.jti && { jwtid: options.jti }),
      },
    );
  }

  decode<Payload extends Record<string, any>>(token: string, secret: string): Payload | null {
    try {
      return jwt.verify(token, secret) as Payload;
    } catch {
      return null;
    }
  }
}
