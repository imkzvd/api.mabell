export const JWT_SERVICE_DI_TOKEN = Symbol.for('JWT_SERVICE_DI_TOKEN');

export const TokenTypes = {
  Access: 'access',
  Refresh: 'refresh',
} as const;

export type TokenType = (typeof TokenTypes)[keyof typeof TokenTypes];

export type BaseTokenPayload = {
  sub: string;
  iat: number;
  exp: number;
  type: TokenType;
};

export type BaseTokenWithIdPayload = BaseTokenPayload & {
  jti: string;
};

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
