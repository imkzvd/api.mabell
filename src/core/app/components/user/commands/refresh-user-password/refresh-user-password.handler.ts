import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RefreshUserPasswordCommand } from './refresh-user-password.command';
import { UserService } from '../../user.service';
import { EVENT_BUS_DI_TOKEN, EventBus } from '../../../../common/ports/event-bus.port';
import { UserPasswordRefreshedEvent } from '../../../../common/events/user-password-refreshed.event';

@CommandHandler(RefreshUserPasswordCommand)
export class RefreshUserPasswordHandler implements ICommandHandler<RefreshUserPasswordCommand> {
  constructor(
    @Inject(UserService) private readonly _userService: UserService,
    @Inject(EVENT_BUS_DI_TOKEN) private readonly _eb: EventBus,
  ) {}

  async execute({ id }: RefreshUserPasswordCommand) {
    const result = await this._userService.refreshUserPassword(id);

    this._eb.publish(new UserPasswordRefreshedEvent(result));

    return result;
  }
}
