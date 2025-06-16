import { Query } from '@nestjs/cqrs';
import { RefreshTokenDTO } from '../../../../../domain/components/refresh-token/repository/dtos/refresh-token.dto';

export class GetOwnerTokensQuery extends Query<RefreshTokenDTO[]> {
  constructor(public readonly ownerId: string) {
    super();
  }
}
