import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BadRequestException, NotFoundException } from '../../../../../shared/exceptions';
import {
  ALBUM_WRITE_REPOSITORY_DI_TOKEN,
  AlbumWriteRepository,
} from '../../../../../domain/components/album/repository/album-write-repository.port';
import { UpdateAlbumArtistsByIdCommand } from './update-album-artists-by-id.command';
import {
  ARTIST_WRITE_REPOSITORY_DI_TOKEN,
  ArtistWriteRepository,
} from '../../../../../domain/components/artist/repository/artist-write-repository.port';

@CommandHandler(UpdateAlbumArtistsByIdCommand)
export class UpdateAlbumArtistsByIdHandler
  implements ICommandHandler<UpdateAlbumArtistsByIdCommand>
{
  constructor(
    @Inject(ALBUM_WRITE_REPOSITORY_DI_TOKEN)
    private readonly _albumWriteRepository: AlbumWriteRepository,
    @Inject(ARTIST_WRITE_REPOSITORY_DI_TOKEN)
    private readonly _artistWriteRepository: ArtistWriteRepository,
  ) {}

  async execute({ id, artists }: UpdateAlbumArtistsByIdCommand) {
    const foundAlbum = await this._albumWriteRepository.findById(id);

    if (!foundAlbum) {
      throw new NotFoundException(`There is no album with the specified ID`);
    }

    if (foundAlbum.getMainArtist() !== artists[0]) {
      throw new BadRequestException('The main artist cannot be changed');
    }

    const foundArtistsResp = await this._artistWriteRepository.findByIds(artists);

    if (foundArtistsResp.missingIds.length) {
      throw new NotFoundException(`There is no artist with the specified ID`);
    }

    foundAlbum.updateArtists(foundArtistsResp.foundIds);

    return this._albumWriteRepository.save(foundAlbum);
  }
}
