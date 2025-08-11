import * as bcrypt from 'bcrypt';
import * as generatePassword from 'generate-password';
import * as process from 'process';
import { PasswordService as PasswordServicePort, HashedPasswordVO } from '@api.mabell/core';

export class PasswordService implements PasswordServicePort {
  generate(options: { hash: false }): Promise<string>;
  generate(options: { hash: true }): Promise<{ password: string; hashPassword: HashedPasswordVO }>;
  async generate(options?: Partial<{ length: number; hash: boolean }>): Promise<
    | string
    | {
        password: string;
        hashPassword: HashedPasswordVO;
      }
  > {
    const generatedPassword = generatePassword.generate({
      numbers: true,
      uppercase: true,
      strict: true,
      length: options?.length || 8,
    });

    if (!options?.hash) {
      return generatedPassword;
    }

    const hashPassword = await this.hash(generatedPassword);

    return {
      password: generatedPassword,
      hashPassword,
    };
  }

  async hash(password: string): Promise<HashedPasswordVO> {
    const hashPassword = await bcrypt.hash(
      password,
      (process.env.DEFAULT_HASH_SALT as string) || 10,
    );

    return HashedPasswordVO.create(hashPassword);
  }

  validate(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
