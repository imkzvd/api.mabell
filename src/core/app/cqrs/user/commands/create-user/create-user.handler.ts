import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateUserCommand } from './create-user.command';
import { UserService } from '../../../../components/user/user.service';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(@Inject(UserService) private readonly _userService: UserService) {}

  async execute() {
    return await this._userService.createUser();
  }
}
