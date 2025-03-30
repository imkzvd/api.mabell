import { HashedPasswordVO } from '../../../domain/common/vos/hashed-password.vo';

export const PASSWORD_SERVICE_DI_TOKEN = Symbol('PASSWORD_SERVICE_DI_TOKEN');

export interface PasswordService {
  generate: (length?: number) => string;
  hash: (password: string) => Promise<HashedPasswordVO>;
  validate: (password: string, hashedPassword: HashedPasswordVO) => Promise<boolean>;
}
