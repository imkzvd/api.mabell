import { UnauthorizedException } from '@core/shared/exceptions';
import { UserId } from '@core/domain/components/user/types';
import { UserReadRepository } from '@core/domain/components/user/repository/user-read-repository.port';
import { LoginUserPayload } from '../types';
import { PasswordService } from '../../../common/ports/password-service.port';

export class UserLoginService {
  constructor(
    private readonly _userRR: UserReadRepository,
    private readonly _passwordService: PasswordService,
  ) {}

  async login({ username, password }: LoginUserPayload): Promise<UserId> {
    const foundUser = await this._userRR.findByUsername(username);

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
