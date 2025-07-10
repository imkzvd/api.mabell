import { UnauthorizedException } from '@core/shared/exceptions';
import { AdminId } from '@core/domain/components/admin/types';
import { AdminReadRepository } from '@core/domain/components/admin/repository/admin-read-repository.port';
import { LoginPayload } from '../types';
import { PasswordService } from '../../../common/ports/password-service.port';

export class AdminLoginService {
  constructor(
    private readonly _adminRR: AdminReadRepository,
    private readonly _passwordService: PasswordService,
  ) {}

  async login({ username, password }: LoginPayload): Promise<AdminId> {
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
}
