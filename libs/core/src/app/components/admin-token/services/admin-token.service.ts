import { AdminRefreshTokenDTO } from '../../../dtos';
import { AdminRefreshTokenReadRepository } from '../../../ports';

export class AdminTokenService {
  constructor(private readonly _RR: AdminRefreshTokenReadRepository) {}

  findRefreshTokensByAdminId(adminId: string): Promise<AdminRefreshTokenDTO[]> {
    return this._RR.findByOwnerId(adminId);
  }
}
