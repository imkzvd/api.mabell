import { Command } from '@core/app/types';
import { LoginPayload } from '@core/app/components/login/types';
import { AdminId } from '@core/domain/components/admin/types';

export class LoginAdminCommand extends Command<AdminId> {
  constructor(public readonly payload: LoginPayload) {
    super();
  }
}
