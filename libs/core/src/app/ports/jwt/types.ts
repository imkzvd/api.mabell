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
