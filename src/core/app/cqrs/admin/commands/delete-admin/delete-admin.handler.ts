import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeleteAdminCommand } from './delete-admin.command';
import { EVENT_BUS_DI_TOKEN, EventBus } from '../../../../common/ports/event-bus.port';
import { AdminDeletedEvent } from '../../../../common/events/admin-deleted.event';
import { AdminService } from '../../../../components/admin/admin.service';

@CommandHandler(DeleteAdminCommand)
export class DeleteAdminHandler implements ICommandHandler<DeleteAdminCommand> {
  constructor(
    @Inject(AdminService) private readonly _adminService: AdminService,
    @Inject(EVENT_BUS_DI_TOKEN) private readonly _eb: EventBus,
  ) {}

  async execute({ id }: DeleteAdminCommand) {
    const deletedAdminId = await this._adminService.deleteAdmin(id);

    this._eb.publish(new AdminDeletedEvent({ id: deletedAdminId }));

    return deletedAdminId;
  }
}
