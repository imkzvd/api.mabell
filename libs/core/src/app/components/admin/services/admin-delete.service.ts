import { AdminRoles, AdminWriteRepository } from '../../../../domain/components/admin';
import { BadRequestException, NotFoundException } from '../../../../shared/exceptions';
import { EventBus } from '../../../ports';
import { AdminId } from '../../../../domain/components/admin/types';
import { AdminDeletedEvent } from '../../../events';

export class AdminDeleteService {
  constructor(
    private readonly _EB: EventBus,
    private readonly _WR: AdminWriteRepository,
  ) {}

  async deleteById(adminId: string): Promise<AdminId> {
    const foundAdmin = await this._WR.findById(adminId);

    if (!foundAdmin) {
      throw new NotFoundException('Admin does not exist.');
    }

    if (foundAdmin.getRole().value === AdminRoles.Owner) {
      throw new BadRequestException("You can't delete the owner.");
    }

    const deletedAdminId = await this._WR.deleteById(adminId);

    if (!deletedAdminId) {
      throw new NotFoundException('Admin does not exist.');
    }

    this._EB.publish(new AdminDeletedEvent({ id: deletedAdminId }));

    return deletedAdminId;
  }
}
