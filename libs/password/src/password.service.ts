import * as bcrypt from 'bcrypt';
import * as generatePassword from 'generate-password';
import * as process from 'process';
import { App } from '@api.mabell/core';

export class PasswordService implements App.Ports.PasswordService {
  generate(options: { hash: false }): Promise<string>;
  generate(options: { hash: true }): Promise<{ password: string; hashPassword: string }>;
  async generate(options?: Partial<{ length: number; hash: boolean }>) {
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

  hash(password: string) {
    return bcrypt.hash(password, (process.env.DEFAULT_HASH_SALT as string) || 10);
  }

  validate(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
  }
}
