import { Command } from '../../../../types';
import { UpdateAdminPayload } from '../../../../components/admin/types';

export class UpdateAdminCommand extends Command<void> {
  constructor(
    public readonly id: string,
    public readonly payload: UpdateAdminPayload,
  ) {
    super();
  }
}
