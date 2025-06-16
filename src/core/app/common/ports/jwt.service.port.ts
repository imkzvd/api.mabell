export const JWT_SERVICE_DI_TOKEN = Symbol.for('JWT_SERVICE_DI_TOKEN');

export interface JWTService {
  create<Payload extends Record<string, any>>(
    payload: Payload,
    secret: string,
    expiresIn: number,
  ): string;

  decode<Payload extends Record<string, any>>(token: string, secret: string): Payload | null;
}
