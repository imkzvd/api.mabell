import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RegisterUserCommand } from './register-user.command';
import { UserService } from '../../user.service';
import { EVENT_BUS_DI_TOKEN, EventBus } from '../../../../common/ports/event-bus.port';
import { UserRegisteredEvent } from '../../../../common/events/user-registered.event';

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler implements ICommandHandler<RegisterUserCommand> {
  constructor(
    @Inject(UserService) private readonly _userService: UserService,
    @Inject(EVENT_BUS_DI_TOKEN) private readonly _eb: EventBus,
  ) {}

  async execute({ payload }: RegisterUserCommand) {
    const { id } = await this._userService.registerUser(payload);

    this._eb.publish(new UserRegisteredEvent({ id }));

    return { id };
  }
}
