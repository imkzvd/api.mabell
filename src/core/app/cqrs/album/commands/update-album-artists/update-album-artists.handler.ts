import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateAlbumArtistsCommand } from './update-album-artists.command';
import { NotFoundException } from '../../../../../shared/exceptions';
import { ArtistService } from '../../../../components/artist/artist.service';
import { AlbumService } from '../../../../components/album/album.service';

@CommandHandler(UpdateAlbumArtistsCommand)
export class UpdateAlbumArtistsHandler implements ICommandHandler<UpdateAlbumArtistsCommand> {
  constructor(
    @Inject(ArtistService) private readonly _artistService: ArtistService,
    @Inject(AlbumService) private readonly _albumService: AlbumService,
  ) {}

  async execute({ id, artists }: UpdateAlbumArtistsCommand) {
    const verifiedArtistIdsResult = await this._artistService.verifyArtistIds(artists);

    if (verifiedArtistIdsResult.missingIds.length) {
      throw new NotFoundException('Artist does not exist');
    }

    return await this._albumService.updateAlbumArtists(id, {
      artists: verifiedArtistIdsResult.foundIds,
    });
  }
}
