import * as bcrypt from 'bcrypt';
import * as generatePassword from 'generate-password';
import * as process from 'process';
import { PasswordService } from '../../../core/app/common/services/password-service.port';
import { HashedPasswordVO } from '../../../core/domain/common/vos/hashed-password.vo';

export class PasswordServiceAdapter implements PasswordService {
  generate(length: number) {
    return generatePassword.generate({
      length,
    });
  }

  async hash(password: string): Promise<HashedPasswordVO> {
    const hashPassword = await bcrypt.hash(
      password,
      (process.env.DEFAULT_HASH_SALT as string) || 10,
    );

    return HashedPasswordVO.create(hashPassword);
  }

  validate(password: string, hashedPassword: HashedPasswordVO): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword.value);
  }
}
