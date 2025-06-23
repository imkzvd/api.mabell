import { HashedPasswordVO } from '@core/domain/common/vos/hashed-password.vo';

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

  validate: (password: string, hashedPassword: string) => Promise<boolean>;
}
