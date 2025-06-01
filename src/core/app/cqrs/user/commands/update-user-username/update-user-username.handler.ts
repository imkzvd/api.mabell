import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateUserUsernameCommand } from './update-user-username.command';
import { EVENT_BUS_DI_TOKEN, EventBus } from '../../../../common/ports/event-bus.port';
import { UserUpdatedEvent } from '../../../../common/events/user-updated.event';
import { UserService } from '../../../../components/user/user.service';

@CommandHandler(UpdateUserUsernameCommand)
export class UpdateUserUsernameHandler implements ICommandHandler<UpdateUserUsernameCommand> {
  constructor(
    @Inject(UserService) private readonly _userService: UserService,
    @Inject(EVENT_BUS_DI_TOKEN) private readonly _eb: EventBus,
  ) {}

  async execute({ id, username }: UpdateUserUsernameCommand) {
    const updatedUserId = await this._userService.updateUserUsername(id, username);

    this._eb.publish(new UserUpdatedEvent({ id: updatedUserId }));

    return updatedUserId;
  }
}
