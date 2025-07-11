import { UnauthorizedException } from '@core/shared/exceptions';
import { AdminId } from '@core/domain/components/admin/types';
import { AdminReadRepository } from '@core/domain/components/admin/repository/admin-read-repository.port';
import { PasswordService } from '@core/app/common/ports/password-service.port';
import { LoginAdminPayload } from '../types';

export class AdminLoginService {
  constructor(
    private readonly _RR: AdminReadRepository,
    private readonly _passwordService: PasswordService,
  ) {}

  async login({ username, password }: LoginAdminPayload): Promise<AdminId> {
    const foundAdmin = await this._RR.findByUsername(username);

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
}
