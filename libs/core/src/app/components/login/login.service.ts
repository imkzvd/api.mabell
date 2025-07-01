import { UnauthorizedException } from '@core/shared/exceptions';
import { AdminId } from '@core/domain/components/admin/types';
import { UserId } from '@core/domain/components/user/types';
import { AdminReadRepository } from '@core/domain/components/admin/repository/admin-read-repository.port';
import { UserReadRepository } from '@core/domain/components/user/repository/user-read-repository.port';
import { LoginPayload } from './types';
import { PasswordService } from '../../common/ports/password-service.port';

export class LoginService {
  constructor(
    private readonly _adminRR: AdminReadRepository,
    private readonly _userRR: UserReadRepository,
    private readonly _passwordService: PasswordService,
  ) {}

  async loginAdmin({ username, password }: LoginPayload): Promise<AdminId> {
    const foundAdmin = await this._adminRR.findByUsername(username);

    if (!foundAdmin) {
      throw new UnauthorizedException('Incorrect username or password.');
    }

    const isValidPassword = await this._passwordService.validate(password, foundAdmin.password);

    if (!isValidPassword) {
      throw new UnauthorizedException('Incorrect username or password.');
    }

    if (foundAdmin.isBlocked) {
      throw new UnauthorizedException('Your account is blocked');
    }

    return foundAdmin.id;
  }

  async loginUser({ username, password }: LoginPayload): Promise<UserId> {
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
