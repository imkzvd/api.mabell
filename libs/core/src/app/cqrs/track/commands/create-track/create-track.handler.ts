import { CommandHandler } from '@core/app/types';
import { NotFoundException } from '@core/shared/exceptions';
import { AlbumService } from '@core/app/components/album/album.service';
import { TrackService } from '@core/app/components/track/track.service';
import { CreateTrackCommand } from '@core/app/cqrs/track/commands/create-track/create-track.command';

export class CreateTrackHandler implements CommandHandler<CreateTrackCommand> {
  constructor(
    private readonly _albumService: AlbumService,
    private readonly _trackService: TrackService,
  ) {}

  async execute({ albumId }: CreateTrackCommand) {
    const verifiedAlbumId = await this._albumService.verifyAlbumId(albumId);
    const albumArtistIds = await this._albumService.getAlbumArtistsById(albumId);

    if (!verifiedAlbumId) {
      throw new NotFoundException('Album does not exist');
    }

    return await this._trackService.createTrack({
      albumId: verifiedAlbumId,
      artistIds: albumArtistIds,
    });
  }
}
