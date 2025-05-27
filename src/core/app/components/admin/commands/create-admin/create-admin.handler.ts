import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateAdminCommand } from './create-admin.command';
import { EVENT_BUS_DI_TOKEN, EventBus } from '../../../../common/ports/event-bus.port';
import { AdminService } from '../../admin.service';
import { AdminCreatedEvent } from '../../../../common/events/admin-created.event';

@CommandHandler(CreateAdminCommand)
export class CreateAdminHandler implements ICommandHandler<CreateAdminCommand> {
  constructor(
    @Inject(AdminService) private readonly _adminService: AdminService,
    @Inject(EVENT_BUS_DI_TOKEN) private readonly _eb: EventBus,
  ) {}

  async execute() {
    const createdAdminId = await this._adminService.createAdmin();

    this._eb.publish(new AdminCreatedEvent({ id: createdAdminId }));

    return createdAdminId;
  }
}
