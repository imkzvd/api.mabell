import { BadRequestException, NotFoundException } from '@core/shared/exceptions';
import { AdminWriteRepository } from '@core/domain/components/admin/repository/admin-write-repository.port';
import { AdminRoles } from '@core/domain/components/admin/constants/admin-roles';
import { AdminId } from '@core/domain/components/admin/types';
import { EventBus } from '@core/app/common/ports/event-bus.port';
import { AdminDeletedEvent } from '@core/app/common/events/admin/admin-deleted.event';

export class AdminDeleteService {
  constructor(
    private readonly _EB: EventBus,
    private readonly _WR: AdminWriteRepository,
  ) {}

  async delete(id: string): Promise<AdminId> {
    const foundAdmin = await this._WR.findById(id);

    if (!foundAdmin) {
      throw new NotFoundException('Admin does not exist');
    }

    if (foundAdmin.getRole().value === AdminRoles.Owner) {
      throw new BadRequestException("You can't delete the owner.");
    }

    const deletedAdminId = await this._WR.deleteById(id);

    if (!deletedAdminId) {
      throw new NotFoundException('Admin does not exist');
    }

    this._EB.publish(new AdminDeletedEvent({ id: deletedAdminId }));

    return deletedAdminId;
  }
}
