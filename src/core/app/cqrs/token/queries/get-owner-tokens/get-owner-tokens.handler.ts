import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetOwnerTokensQuery } from './get-owner-tokens.query';
import { TokenService } from '../../../../components/token/token.service';

@QueryHandler(GetOwnerTokensQuery)
export class GetOwnerTokensHandler implements IQueryHandler<GetOwnerTokensQuery> {
  constructor(@Inject(TokenService) private readonly _tokenService: TokenService) {}

  async execute({ ownerId }: GetOwnerTokensQuery) {
    return await this._tokenService.getRefreshTokensByOwnerId(ownerId);
  }
}
