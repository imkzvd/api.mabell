import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateUserCommand } from './create-user.command';
import { EVENT_BUS_DI_TOKEN, EventBus } from '../../../../common/ports/event-bus.port';
import { UserCreatedEvent } from '../../../../common/events/user-created.event';
import { UserService } from '../../../../components/user/user.service';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @Inject(UserService) private readonly _userService: UserService,
    @Inject(EVENT_BUS_DI_TOKEN) private readonly _eb: EventBus,
  ) {}

  async execute() {
    const createdUserId = await this._userService.createUser();

    this._eb.publish(new UserCreatedEvent({ id: createdUserId }));

    return createdUserId;
  }
}
