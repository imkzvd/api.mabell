import { Inject } from '@nestjs/common';
import { AdminId } from '../../../domain/components/admin/types';
import { UserId } from '../../../domain/components/user/types';
import { LoginPayload } from './types';
import {
  ADMIN_READ_REPOSITORY_DI_TOKEN,
  AdminReadRepository,
} from '../../../domain/components/admin/repository/admin-read-repository.port';
import {
  USER_READ_REPOSITORY_DI_TOKEN,
  UserReadRepository,
} from '../../../domain/components/user/repository/user-read-repository.port';
import { UnauthorizedException } from '../../../shared/exceptions';
import {
  PASSWORD_SERVICE_DI_TOKEN,
  PasswordService,
} from '../../common/ports/password-service.port';

export class LoginService {
  constructor(
    @Inject(ADMIN_READ_REPOSITORY_DI_TOKEN) private readonly _adminRR: AdminReadRepository,
    @Inject(USER_READ_REPOSITORY_DI_TOKEN) private readonly _userRR: UserReadRepository,
    @Inject(PASSWORD_SERVICE_DI_TOKEN) private readonly _passwordService: PasswordService,
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
