import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { NotFoundException } from '../../../../../shared/exceptions';
import { UpdateArtistByIdCommand } from './update-artist-by-id.command';
import {
  ARTIST_WRITE_REPOSITORY_DI_TOKEN,
  ArtistWriteRepository,
} from '../../../../../domain/components/artist/repository/artist-write-repository.port';

@CommandHandler(UpdateArtistByIdCommand)
export class UpdateArtistByIdHandler implements ICommandHandler<UpdateArtistByIdCommand> {
  constructor(
    @Inject(ARTIST_WRITE_REPOSITORY_DI_TOKEN)
    private readonly _artistWriteRepository: ArtistWriteRepository,
  ) {}

  async execute({ id, payload }: UpdateArtistByIdCommand) {
    const foundArtist = await this._artistWriteRepository.findById(id);

    if (!foundArtist) {
      throw new NotFoundException(`There is no artist with the specified ID`);
    }

    if (payload.name) {
      foundArtist.updateName(payload.name);
    }

    if (payload.birtName) {
      foundArtist.updateBirthName(payload.birtName);
    }

    if (payload.birthDate) {
      foundArtist.updateBirthDate(payload.birthDate);
    }

    if (payload.genres) {
      foundArtist.updateGenres(payload.genres);
    }

    if (payload.biography) {
      foundArtist.updateBiography(payload.biography);
    }

    if (typeof payload.isActive === 'boolean') {
      foundArtist.updateActiveStatus(payload.isActive);
    }

    if (typeof payload.isPublic === 'boolean') {
      foundArtist.updatePublicStatus(payload.isPublic);
    }

    return this._artistWriteRepository.save(foundArtist);
  }
}
