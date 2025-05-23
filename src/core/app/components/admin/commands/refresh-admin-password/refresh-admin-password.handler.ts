import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RefreshAdminPasswordCommand } from './refresh-admin-password.command';
import { AdminService } from '../../admin.service';
import { EVENT_BUS_DI_TOKEN, EventBus } from '../../../../common/ports/event-bus.port';
import { AdminRefreshedPasswordEvent } from '../../../../common/events/admin-refreshed-password.event';

@CommandHandler(RefreshAdminPasswordCommand)
export class RefreshAdminPasswordHandler implements ICommandHandler<RefreshAdminPasswordCommand> {
  constructor(
    @Inject(AdminService) private readonly _adminService: AdminService,
    @Inject(EVENT_BUS_DI_TOKEN) private readonly _eb: EventBus,
  ) {}

  async execute({ id }: RefreshAdminPasswordCommand) {
    const { password } = await this._adminService.refreshAdminPassword(id);

    this._eb.publish(new AdminRefreshedPasswordEvent({ adminId: id, password }));

    return { password };
  }
}
