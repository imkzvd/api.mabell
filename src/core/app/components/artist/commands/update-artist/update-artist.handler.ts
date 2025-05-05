import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { NotFoundException } from '../../../../../shared/exceptions';
import { UpdateArtistCommand } from './update-artist.command';
import {
  ARTIST_WRITE_REPOSITORY_DI_TOKEN,
  ArtistWriteRepository,
} from '../../../../../domain/components/artist/repository/artist-write-repository.port';

@CommandHandler(UpdateArtistCommand)
export class UpdateArtistHandler implements ICommandHandler<UpdateArtistCommand> {
  constructor(
    @Inject(ARTIST_WRITE_REPOSITORY_DI_TOKEN)
    private readonly _artistWriteRepository: ArtistWriteRepository,
  ) {}

  async execute({ id, payload }: UpdateArtistCommand) {
    const foundArtist = await this._artistWriteRepository.findById(id);

    if (!foundArtist) {
      throw new NotFoundException(`There is no artist with the specified ID`);
    }

    if (payload.name) {
      foundArtist.updateName(payload.name);
    }

    if (payload.birthName) {
      foundArtist.updateBirthName(payload.birthName);
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
