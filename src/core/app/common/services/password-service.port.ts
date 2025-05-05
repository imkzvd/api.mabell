import { HashedPasswordVO } from '../../../domain/common/vos/hashed-password.vo';

export const PASSWORD_SERVICE_DI_TOKEN = Symbol('PASSWORD_SERVICE_DI_TOKEN');

export interface PasswordService {
  generate: <HashOptions extends boolean = false>(
    options?: Partial<{
      length: number;
      hash: HashOptions;
    }>,
  ) => Promise<
    HashOptions extends false
      ? string
      : {
          password: string;
          hashPassword: HashedPasswordVO;
        }
  >;
  hash: (password: string) => Promise<HashedPasswordVO>;
  validate: (password: string, hashedPassword: HashedPasswordVO) => Promise<boolean>;
}
