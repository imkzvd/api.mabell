import { Command } from '@nestjs/cqrs';
import { AdminRefreshTokenId } from '../../../../../domain/components/admin-refresh-token/types';

export class DeleteAdminRefreshTokenCommand extends Command<AdminRefreshTokenId> {
  constructor(public readonly id: string) {
    super();
  }
}
