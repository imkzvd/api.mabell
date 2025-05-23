import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateAdminCommand } from './update-admin.command';
import { AdminService } from '../../admin.service';
import { EVENT_BUS_DI_TOKEN, EventBus } from '../../../../common/ports/event-bus.port';
import { AdminUpdatedEvent } from '../../../../common/events/admin-updated.event';

@CommandHandler(UpdateAdminCommand)
export class UpdateAdminHandler implements ICommandHandler<UpdateAdminCommand> {
  constructor(
    @Inject(AdminService) private _adminService: AdminService,
    @Inject(EVENT_BUS_DI_TOKEN) private _eb: EventBus,
  ) {}

  async execute({ id, payload }: UpdateAdminCommand) {
    const updatedAdmin = await this._adminService.updateAdmin(id, payload);

    this._eb.publish(new AdminUpdatedEvent({ admin: updatedAdmin }));
  }
}
