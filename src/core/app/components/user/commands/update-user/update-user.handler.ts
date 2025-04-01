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

    foundUser.updateName(payload.name || foundUser.getName().value);
    foundUser.updateBirthDate(payload.birthDate || foundUser.getBirthDate());
    foundUser.updateRegion(payload.region || foundUser.getRegion().value);
    foundUser.updateGenres(payload.genres || foundUser.getGenres().map(({ value }) => value));
    foundUser.updatePremiumStatus(payload.isPremium ?? foundUser.getPremiumStatus());
    foundUser.updateBlockedStatus(payload.isBlocked || foundUser.getBlockedStatus());
    foundUser.updatePublicStatus(payload.isPublic ?? foundUser.getPublicStatus());

    return this._userWriteRepository.save(foundUser);
  }
}
