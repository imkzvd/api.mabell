import { LoginAdminPayload } from '../types';
import { UnauthorizedException } from '../../../../shared/exceptions';
import { AdminReadRepository, PasswordService } from '../../../ports';
import { AdminId } from '../../../../domain/components/admin/types';

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
      throw new UnauthorizedException('Your account is blocked.');
    }

    return foundAdmin.id;
  }
}
