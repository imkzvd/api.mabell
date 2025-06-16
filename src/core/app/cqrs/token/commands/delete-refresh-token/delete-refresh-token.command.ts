import { Command } from '@nestjs/cqrs';
import { RefreshTokenId } from '../../../../../domain/components/refresh-token/types';

export class DeleteRefreshTokenCommand extends Command<RefreshTokenId> {
  constructor(public readonly id: string) {
    super();
  }
}
