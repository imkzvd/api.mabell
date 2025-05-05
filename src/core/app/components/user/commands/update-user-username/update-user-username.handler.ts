import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateUserUsernameCommand } from './update-user-username.command';
import {
  USER_WRITE_REPOSITORY_DI_TOKEN,
  UserWriteRepository,
} from '../../../../../domain/components/user/repository/user-write-repository.port';
import { DuplicationException, NotFoundException } from '../../../../../shared/exceptions';

@CommandHandler(UpdateUserUsernameCommand)
export class UpdateUserUsernameHandler implements ICommandHandler<UpdateUserUsernameCommand> {
  constructor(
    @Inject(USER_WRITE_REPOSITORY_DI_TOKEN)
    private readonly _userWriteRepository: UserWriteRepository,
  ) {}

  async execute({ id, username }: UpdateUserUsernameCommand) {
    const foundUser = await this._userWriteRepository.findById(id);

    if (!foundUser) {
      throw new NotFoundException(`There is no user with the specified ID`);
    }

    if (foundUser.getUsername().value === username) {
      return;
    }

    const existsUserId = await this._userWriteRepository.existsByUsername(username);

    if (existsUserId) {
      throw new DuplicationException(`The user with this username already exist`);
    }

    foundUser.updateUsername(username);

    return this._userWriteRepository.save(foundUser);
  }
}
