import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeleteUserAvatarCommand } from './delete-user-avatar.command';
import {
  USER_WRITE_REPOSITORY_DI_TOKEN,
  UserWriteRepository,
} from '../../../../../domain/components/user/repository/user-write-repository.port';
import {
  USER_FILE_STORAGE_DI_TOKEN,
  UserFileStorage,
} from '../../ports/storage/user-file-storage.port';
import { NotFoundException } from '../../../../../shared/exceptions';

@CommandHandler(DeleteUserAvatarCommand)
export class DeleteUserAvatarHandler implements ICommandHandler<DeleteUserAvatarCommand> {
  constructor(
    @Inject(USER_WRITE_REPOSITORY_DI_TOKEN)
    private readonly _userWriteRepository: UserWriteRepository,
    @Inject(USER_FILE_STORAGE_DI_TOKEN)
    private readonly _userFileStorage: UserFileStorage,
  ) {}

  async execute({ id }: DeleteUserAvatarCommand) {
    const foundUser = await this._userWriteRepository.findById(id);

    if (!foundUser) {
      throw new NotFoundException('User does not exist');
    }

    foundUser.deleteAvatar();
    foundUser.deleteColor();

    await this._userWriteRepository.save(foundUser);

    return this._userFileStorage.deleteUserAvatar(foundUser.getId());
  }
}
