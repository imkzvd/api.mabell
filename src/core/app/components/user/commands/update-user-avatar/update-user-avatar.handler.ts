import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateUserAvatarCommand } from './update-user-avatar.command';
import {
  USER_WRITE_REPOSITORY_DI_TOKEN,
  UserWriteRepository,
} from '../../../../../domain/components/user/repository/user-write-repository.port';
import {
  TMP_FILE_STORAGE_DI_TOKEN,
  TmpFileStorage,
} from '../../../upload/storage/tmp-file-storage.port';
import {
  USER_FILE_STORAGE_DI_TOKEN,
  UserFileStorage,
} from '../../ports/storage/user-file-storage.port';
import { BadRequestException, NotFoundException } from '../../../../../shared/exceptions';

@CommandHandler(UpdateUserAvatarCommand)
export class UpdateUserAvatarHandler implements ICommandHandler<UpdateUserAvatarCommand> {
  constructor(
    @Inject(USER_WRITE_REPOSITORY_DI_TOKEN)
    private readonly _userWriteRepository: UserWriteRepository,
    @Inject(TMP_FILE_STORAGE_DI_TOKEN)
    private readonly _tmpFileStorage: TmpFileStorage,
    @Inject(USER_FILE_STORAGE_DI_TOKEN)
    private readonly _userFileStorage: UserFileStorage,
  ) {}

  async execute({ id, payload }: UpdateUserAvatarCommand) {
    const foundUser = await this._userWriteRepository.findById(id);

    if (!foundUser) {
      throw new NotFoundException('User does not exist');
    }

    const tmpFileData = await this._tmpFileStorage.findById(payload.fileId);

    if (!tmpFileData) {
      throw new BadRequestException('The file has not been uploaded');
    }

    const storedFileData = await this._userFileStorage.saveAvatar(foundUser.getId(), tmpFileData);
    await this._tmpFileStorage.deleteById(tmpFileData.id);

    foundUser.updateAvatar(storedFileData.path);
    foundUser.updateColor(payload.color || foundUser.getColor());

    return this._userWriteRepository.save(foundUser);
  }
}
