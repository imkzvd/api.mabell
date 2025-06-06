import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateTrackCommand } from './create-track.command';
import { NotFoundException } from '../../../../../shared/exceptions';
import { AlbumService } from '../../../../components/album/album.service';
import { TrackService } from '../../../../components/track/track.service';

@CommandHandler(CreateTrackCommand)
export class CreateTrackHandler implements ICommandHandler<CreateTrackCommand> {
  constructor(
    @Inject(AlbumService) private readonly _albumService: AlbumService,
    @Inject(TrackService) private readonly _trackService: TrackService,
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
