import { Command } from '@core/app/types';
import { LoginAdminPayload } from '@core/app/components/admin/types';
import { AdminId } from '@core/domain/components/admin/types';

export class LoginAdminCommand extends Command<AdminId> {
  constructor(public readonly payload: LoginAdminPayload) {
    super();
  }
}
