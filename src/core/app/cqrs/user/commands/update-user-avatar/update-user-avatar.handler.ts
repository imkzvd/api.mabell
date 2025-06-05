import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateUserAvatarCommand } from './update-user-avatar.command';
import { EVENT_BUS_DI_TOKEN, EventBus } from '../../../../common/ports/event-bus.port';
import { UserUpdatedEvent } from '../../../../common/events/user-updated.event';
import { UserService } from '../../../../components/user/user.service';

@CommandHandler(UpdateUserAvatarCommand)
export class UpdateUserAvatarHandler implements ICommandHandler<UpdateUserAvatarCommand> {
  constructor(
    @Inject(UserService) private readonly _userService: UserService,
    @Inject(EVENT_BUS_DI_TOKEN) private readonly _eb: EventBus,
  ) {}

  async execute({ id, payload }: UpdateUserAvatarCommand) {
    const updatedUserId = await this._userService.updateUserAvatar(id, payload);

    this._eb.publish(new UserUpdatedEvent({ id: updatedUserId }));

    return updatedUserId;
  }
}
