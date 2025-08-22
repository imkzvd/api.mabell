import { CommandHandler } from '../../../../types';
import { CreateTrackCommand } from './create-track.command';
import { AlbumService, AlbumVerifyService } from '../../../../components/album';
import { TrackCreateService } from '../../../../components/track';
import { NotFoundException } from '../../../../../shared/exceptions';

export class CreateTrackHandler implements CommandHandler<CreateTrackCommand> {
  constructor(
    private readonly _albumVerifyService: AlbumVerifyService,
    private readonly _albumService: AlbumService,
    private readonly _trackCreateService: TrackCreateService,
  ) {}

  async execute({ albumId }: CreateTrackCommand) {
    const verifiedAlbumId = await this._albumVerifyService.verify(albumId);
    const albumArtistIds = await this._albumService.getArtistIdsById(albumId);

    if (!verifiedAlbumId) {
      throw new NotFoundException('Album does not exist');
    }

    const id = await this._trackCreateService.create({
      albumId: verifiedAlbumId,
      artistIds: albumArtistIds,
    });

    return { id };
  }
}
