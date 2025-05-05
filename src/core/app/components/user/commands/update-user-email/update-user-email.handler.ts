import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { UpdateUserEmailCommand } from './update-user-email.command';
import {
  USER_WRITE_REPOSITORY_DI_TOKEN,
  UserWriteRepository,
} from '../../../../../domain/components/user/repository/user-write-repository.port';
import { DuplicationException, NotFoundException } from '../../../../../shared/exceptions';

@CommandHandler(UpdateUserEmailCommand)
export class UpdateUserEmailHandler implements ICommandHandler<UpdateUserEmailCommand> {
  constructor(
    @Inject(USER_WRITE_REPOSITORY_DI_TOKEN)
    private readonly _userWriteRepository: UserWriteRepository,
  ) {}

  async execute({ id, email }: UpdateUserEmailCommand) {
    const foundUser = await this._userWriteRepository.findById(id);

    if (!foundUser) {
      throw new NotFoundException(`There is no user with the specified ID`);
    }

    if (foundUser.getEmail()?.value === email) {
      return;
    }

    const existsUserId = await this._userWriteRepository.existsByEmail(email);

    if (existsUserId) {
      throw new DuplicationException(`The user with this username already exist`);
    }

    foundUser.updateEmail(email);

    return this._userWriteRepository.save(foundUser);
  }
}
