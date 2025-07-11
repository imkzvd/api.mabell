import { UnauthorizedException } from '@core/shared/exceptions';
import { UserId } from '@core/domain/components/user/types';
import { UserReadRepository } from '@core/domain/components/user/repository/user-read-repository.port';
import { PasswordService } from '@core/app/common/ports/password-service.port';
import { LoginUserPayload } from '../types';

export class UserLoginService {
  constructor(
    private readonly _RR: UserReadRepository,
    private readonly _passwordService: PasswordService,
  ) {}

  async login({ username, password }: LoginUserPayload): Promise<UserId> {
    const foundUser = await this._RR.findByUsername(username);

    if (!foundUser) {
      throw new UnauthorizedException('Incorrect username or password.');
    }

    const isValidPassword = await this._passwordService.validate(password, foundUser.password);

    if (!isValidPassword) {
      throw new UnauthorizedException('Incorrect username or password.');
    }

    if (foundUser.isBlocked) {
      throw new UnauthorizedException('Your account is blocked');
    }

    return foundUser.id;
  }
}
