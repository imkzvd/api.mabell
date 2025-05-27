import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateAdminUsernameCommand } from './update-admin-username.command';
import { AdminService } from '../../admin.service';
import { EVENT_BUS_DI_TOKEN, EventBus } from '../../../../common/ports/event-bus.port';
import { AdminUpdatedEvent } from '../../../../common/events/admin-updated.event';

@CommandHandler(UpdateAdminUsernameCommand)
export class UpdateAdminUsernameHandler implements ICommandHandler<UpdateAdminUsernameCommand> {
  constructor(
    @Inject(AdminService) private _adminService: AdminService,
    @Inject(EVENT_BUS_DI_TOKEN) private _eb: EventBus,
  ) {}

  async execute({ id, username }: UpdateAdminUsernameCommand) {
    const updatedAdminId = await this._adminService.updateAdminUsername(id, username);

    this._eb.publish(new AdminUpdatedEvent({ id: updatedAdminId }));

    return updatedAdminId;
  }
}
