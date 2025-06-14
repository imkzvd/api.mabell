export const TOKEN_SERVICE_DI_TOKEN = Symbol.for('TOKEN_SERVICE_DI_TOKEN');

export interface TokenService {
  create<TokenPayload extends Record<string, any>>(
    payload: TokenPayload,
    secret: string,
    expiresIn: number,
  ): string;

  decode<TokenPayload extends Record<string, any>>(
    token: string,
    secret: string,
  ): TokenPayload | null;
}
