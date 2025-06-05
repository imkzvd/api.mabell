import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RefreshAdminPasswordCommand } from './refresh-admin-password.command';
import { EVENT_BUS_DI_TOKEN, EventBus } from '../../../../common/ports/event-bus.port';
import { AdminPasswordRefreshedEvent } from '../../../../common/events/admin-password-refreshed.event';
import { AdminService } from '../../../../components/admin/admin.service';

@CommandHandler(RefreshAdminPasswordCommand)
export class RefreshAdminPasswordHandler implements ICommandHandler<RefreshAdminPasswordCommand> {
  constructor(
    @Inject(AdminService) private readonly _adminService: AdminService,
    @Inject(EVENT_BUS_DI_TOKEN) private readonly _eb: EventBus,
  ) {}

  async execute({ id }: RefreshAdminPasswordCommand) {
    const deletionResult = await this._adminService.refreshAdminPassword(id);

    this._eb.publish(new AdminPasswordRefreshedEvent(deletionResult));

    return deletionResult;
  }
}
