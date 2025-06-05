import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { UpdateUserEmailCommand } from './update-user-email.command';
import { EVENT_BUS_DI_TOKEN, EventBus } from '../../../../common/ports/event-bus.port';
import { UserEmailUpdatedEvent } from '../../../../common/events/user-email-updated.event';
import { UserService } from '../../../../components/user/user.service';

@CommandHandler(UpdateUserEmailCommand)
export class UpdateUserEmailHandler implements ICommandHandler<UpdateUserEmailCommand> {
  constructor(
    @Inject(UserService) private readonly _userService: UserService,
    @Inject(EVENT_BUS_DI_TOKEN) private readonly _eb: EventBus,
  ) {}

  async execute({ id, email }: UpdateUserEmailCommand) {
    const updatedUserId = await this._userService.updateUserEmail(id, email);

    this._eb.publish(new UserEmailUpdatedEvent({ id: updatedUserId }));

    return updatedUserId;
  }
}
