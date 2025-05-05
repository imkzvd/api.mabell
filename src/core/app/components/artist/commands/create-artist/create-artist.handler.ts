import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateArtistCommand } from './create-artist.command';
import {
  ARTIST_WRITE_REPOSITORY_DI_TOKEN,
  ArtistWriteRepository,
} from '../../../../../domain/components/artist/repository/artist-write-repository.port';
import { ArtistFactory } from '../../../../../domain/components/artist/artist.factory';
import { ID_SERVICE_DI_TOKEN, IdService } from '../../../../common/services/id-service.port';
import { ArtistId } from '../../../../../domain/components/artist/artist.entity';

@CommandHandler(CreateArtistCommand)
export class CreateArtistHandler implements ICommandHandler<CreateArtistCommand> {
  constructor(
    @Inject(ARTIST_WRITE_REPOSITORY_DI_TOKEN)
    private readonly _artistWriteRepository: ArtistWriteRepository,
    @Inject(ID_SERVICE_DI_TOKEN)
    private readonly _idService: IdService<ArtistId>,
  ) {}

  async execute({ name }: CreateArtistCommand) {
    const generatedId = this._idService.generate();
    const nextArtistIndex = await this._artistWriteRepository.getNextIndex();
    const createdArtist = ArtistFactory.create({
      id: generatedId,
      name: name || `Artist #${nextArtistIndex}`,
    });

    await this._artistWriteRepository.save(createdArtist);

    return {
      id: createdArtist.getId(),
    };
  }
}
