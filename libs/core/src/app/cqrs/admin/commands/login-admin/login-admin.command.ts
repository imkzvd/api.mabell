import { Command } from '../../../../types';
import { LoginAdminPayload } from '../../../../components/admin/types';
import { AdminId } from '../../../../../domain/components/admin/types';

export class LoginAdminCommand extends Command<{ id: AdminId }> {
  constructor(public readonly payload: LoginAdminPayload) {
    super();
  }
}
