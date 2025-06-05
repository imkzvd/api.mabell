import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateUserPasswordCommand } from './update-user-password.command';
import { EVENT_BUS_DI_TOKEN, EventBus } from '../../../../common/ports/event-bus.port';
import { UserPasswordUpdatedEvent } from '../../../../common/events/user-password-updated.event';
import { UserService } from '../../../../components/user/user.service';

@CommandHandler(UpdateUserPasswordCommand)
export class UpdateUserPasswordHandler implements ICommandHandler<UpdateUserPasswordCommand> {
  constructor(
    @Inject(UserService) private readonly _userService: UserService,
    @Inject(EVENT_BUS_DI_TOKEN) private readonly _eb: EventBus,
  ) {}

  async execute({ id, payload }: UpdateUserPasswordCommand) {
    const updatedUserId = await this._userService.updateUserPassword(id, payload);

    this._eb.publish(new UserPasswordUpdatedEvent({ id: updatedUserId }));

    return updatedUserId;
  }
}
