import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeleteUserCommand } from './delete-user.command';
import {
  USER_WRITE_REPOSITORY_DI_TOKEN,
  UserWriteRepository,
} from '../../../../../domain/components/user/repository/user-write-repository.port';
import { NotFoundException } from '../../../../../shared/exceptions';
import {
  USER_FILE_STORAGE_DI_TOKEN,
  UserFileStorage,
} from '../../ports/storage/user-file-storage.port';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(
    @Inject(USER_WRITE_REPOSITORY_DI_TOKEN)
    private readonly _userWriteRepository: UserWriteRepository,
    @Inject(USER_FILE_STORAGE_DI_TOKEN)
    private readonly _userFileStorage: UserFileStorage,
  ) {}

  async execute({ id }: DeleteUserCommand) {
    const deletedUserId = await this._userWriteRepository.deleteById(id);

    if (!deletedUserId) {
      throw new NotFoundException('User does not exist');
    }

    return this._userFileStorage.deleteDirectory(deletedUserId);
  }
}
