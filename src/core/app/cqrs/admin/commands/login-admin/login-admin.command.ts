import { Command } from '@nestjs/cqrs';
import { LoginPayload } from '../../../../components/login/types';
import { AdminId } from '../../../../../domain/components/admin/types';

export class LoginAdminCommand extends Command<AdminId> {
  constructor(public readonly payload: LoginPayload) {
    super();
  }
}
