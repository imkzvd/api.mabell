import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { AdminTokenService } from '../../../../components/admin-token/admin-token.service';
import { ValidateRefreshTokenQuery } from './validate-refresh-token.query';

@QueryHandler(ValidateRefreshTokenQuery)
export class ValidateRefreshTokenHandler implements IQueryHandler<ValidateRefreshTokenQuery> {
  constructor(@Inject(AdminTokenService) private readonly _tokenService: AdminTokenService) {}

  async execute({ payload }: ValidateRefreshTokenQuery) {
    return await this._tokenService.validateRefreshToken(payload);
  }
}
