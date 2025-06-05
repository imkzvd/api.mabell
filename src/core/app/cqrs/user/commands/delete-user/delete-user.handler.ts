import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeleteUserCommand } from './delete-user.command';
import { EVENT_BUS_DI_TOKEN, EventBus } from '../../../../common/ports/event-bus.port';
import { UserDeletedEvent } from '../../../../common/events/user-deleted.event';
import { UserService } from '../../../../components/user/user.service';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(
    @Inject(UserService) private readonly _userService: UserService,
    @Inject(EVENT_BUS_DI_TOKEN) private readonly _eb: EventBus,
  ) {}

  async execute({ id }: DeleteUserCommand) {
    const deletedUserId = await this._userService.deleteUser(id);

    this._eb.publish(new UserDeletedEvent({ id: deletedUserId }));

    return deletedUserId;
  }
}
