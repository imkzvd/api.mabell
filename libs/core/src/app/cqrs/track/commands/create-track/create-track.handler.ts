import { CommandHandler } from '@core/app/types';
import { NotFoundException } from '@core/shared/exceptions';
import { CreateTrackCommand } from '@core/app/cqrs/track/commands/create-track/create-track.command';
import { AlbumVerifyService } from '@core/app/components/album/services/album-verify.service';
import { TrackCreateService } from '@core/app/components/track/services/track-create.service';
import { AlbumService } from '@core/app/components/album/services/album.service';

export class CreateTrackHandler implements CommandHandler<CreateTrackCommand> {
  constructor(
    private readonly _albumVerifyService: AlbumVerifyService,
    private readonly _albumService: AlbumService,
    private readonly _trackCreateService: TrackCreateService,
  ) {}

  async execute({ albumId }: CreateTrackCommand) {
    const verifiedAlbumId = await this._albumVerifyService.verify(albumId);
    const albumArtistIds = await this._albumService.getArtistIds(albumId);

    if (!verifiedAlbumId) {
      throw new NotFoundException('Album does not exist');
    }

    return await this._trackCreateService.create({
      albumId: verifiedAlbumId,
      artistIds: albumArtistIds,
    });
  }
}
