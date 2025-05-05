import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BadRequestException, NotFoundException } from '../../../../../shared/exceptions';
import {
  ALBUM_WRITE_REPOSITORY_DI_TOKEN,
  AlbumWriteRepository,
} from '../../../../../domain/components/album/repository/album-write-repository.port';
import { UpdateAlbumArtistsCommand } from './update-album-artists.command';
import {
  ARTIST_WRITE_REPOSITORY_DI_TOKEN,
  ArtistWriteRepository,
} from '../../../../../domain/components/artist/repository/artist-write-repository.port';
import {
  TRACK_WRITE_REPOSITORY_DI_TOKEN,
  TrackWriteRepository,
} from '../../../../../domain/components/track/repository/track-write-repository.port';

@CommandHandler(UpdateAlbumArtistsCommand)
export class UpdateAlbumArtistsHandler implements ICommandHandler<UpdateAlbumArtistsCommand> {
  constructor(
    @Inject(ALBUM_WRITE_REPOSITORY_DI_TOKEN)
    private readonly _albumWriteRepository: AlbumWriteRepository,
    @Inject(ARTIST_WRITE_REPOSITORY_DI_TOKEN)
    private readonly _artistWriteRepository: ArtistWriteRepository,
    @Inject(TRACK_WRITE_REPOSITORY_DI_TOKEN)
    private readonly _trackWriteRepository: TrackWriteRepository,
  ) {}

  async execute({ id, artists }: UpdateAlbumArtistsCommand) {
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

    const foundTracks = await this._trackWriteRepository.findByAlbumId(foundAlbum.getId());

    if (foundTracks.total) {
      foundTracks.items.forEach((i) => i.updateArtists(foundAlbum.getArtists()));

      await this._trackWriteRepository.saveMany(foundTracks.items);
    }

    return this._albumWriteRepository.save(foundAlbum);
  }
}
