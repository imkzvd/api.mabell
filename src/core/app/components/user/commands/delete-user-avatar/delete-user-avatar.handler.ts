import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeleteUserAvatarCommand } from './delete-user-avatar.command';
import { UserService } from '../../user.service';
import { EVENT_BUS_DI_TOKEN, EventBus } from '../../../../common/ports/event-bus.port';
import { UserUpdatedEvent } from '../../../../common/events/user-updated.event';

@CommandHandler(DeleteUserAvatarCommand)
export class DeleteUserAvatarHandler implements ICommandHandler<DeleteUserAvatarCommand> {
  constructor(
    @Inject(UserService) private readonly _userService: UserService,
    @Inject(EVENT_BUS_DI_TOKEN) private readonly _eb: EventBus,
  ) {}

  async execute({ id }: DeleteUserAvatarCommand) {
    const updatedUserId = await this._userService.deleteUserAvatar(id);

    this._eb.publish(new UserUpdatedEvent({ id: updatedUserId }));

    return updatedUserId;
  }
}
