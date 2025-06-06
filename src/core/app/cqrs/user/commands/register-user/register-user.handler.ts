import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RegisterUserCommand } from './register-user.command';
import { UserService } from '../../../../components/user/user.service';

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler implements ICommandHandler<RegisterUserCommand> {
  constructor(@Inject(UserService) private readonly _userService: UserService) {}

  async execute({ payload }: RegisterUserCommand) {
    return await this._userService.registerUser(payload);
  }
}
