import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateUserCommand } from './update-user.command';
import {
  USER_WRITE_REPOSITORY_DI_TOKEN,
  UserWriteRepository,
} from '../../../../../domain/components/user/repository/user-write-repository.port';
import { NotFoundException } from '../../../../../shared/exceptions';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(
    @Inject(USER_WRITE_REPOSITORY_DI_TOKEN)
    private readonly _userWriteRepository: UserWriteRepository,
  ) {}

  async execute({ id, payload }: UpdateUserCommand) {
    const foundUser = await this._userWriteRepository.findById(id);

    if (!foundUser) {
      throw new NotFoundException(`There is no admin with the specified ID`);
    }

    if (payload.name) {
      foundUser.updateName(payload.name);
    }

    if (payload.birthDate) {
      foundUser.updateBirthDate(payload.birthDate);
    }

    if (payload.region) {
      foundUser.updateRegion(payload.region);
    }
    if (payload.genres) {
      foundUser.updateGenres(payload.genres);
    }

    if (typeof payload.isPremium === 'boolean') {
      foundUser.updatePremiumStatus(payload.isPremium);
    }

    if (typeof payload.isBlocked === 'boolean') {
      foundUser.updateBlockedStatus(payload.isBlocked);
    }

    if (typeof payload.isPublic === 'boolean') {
      foundUser.updatePublicStatus(payload.isPublic);
    }

    return this._userWriteRepository.save(foundUser);
  }
}
