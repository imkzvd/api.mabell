import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateArtistCommand } from './create-artist.command';
import {
  ARTIST_WRITE_REPOSITORY_DI_TOKEN,
  ArtistWriteRepository,
} from '../../../../../domain/components/artist/repository/artist-write-repository.port';
import { ArtistFactory } from '../../../../../domain/components/artist/artist.factory';

@CommandHandler(CreateArtistCommand)
export class CreateArtistHandler implements ICommandHandler<CreateArtistCommand> {
  constructor(
    @Inject(ARTIST_WRITE_REPOSITORY_DI_TOKEN)
    private readonly _artistWriteRepository: ArtistWriteRepository,
  ) {}

  async execute({ name }: CreateArtistCommand) {
    const generatedId = this._artistWriteRepository.generateId();
    const createdArtist = ArtistFactory.create({
      id: generatedId,
      name,
    });

    await this._artistWriteRepository.save(createdArtist);

    return {
      id: createdArtist.getId(),
    };
  }
}
