import { Command } from '@nestjs/cqrs';
import { CreateAdminRefreshTokenPayload } from '../../../../components/token/types';

export class CreateAdminRefreshTokenCommand extends Command<string> {
  constructor(public readonly payload: CreateAdminRefreshTokenPayload) {
    super();
  }
}
