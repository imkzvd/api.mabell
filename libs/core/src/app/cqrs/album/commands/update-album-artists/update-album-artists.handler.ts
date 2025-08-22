import { CommandHandler } from '../../../../types';
import { UpdateAlbumArtistsCommand } from './update-album-artists.command';
import { ArtistVerifyService } from '../../../../components/artist';
import { AlbumUpdateService } from '../../../../components/album';
import { NotFoundException } from '../../../../../shared/exceptions';

export class UpdateAlbumArtistsHandler implements CommandHandler<UpdateAlbumArtistsCommand> {
  constructor(
    private readonly _artistVerifyService: ArtistVerifyService,
    private readonly _albumUpdateService: AlbumUpdateService,
  ) {}

  async execute({ id, artistIds }: UpdateAlbumArtistsCommand) {
    const { foundIds: foundArtistIds, missingIds: missingArtistIds } =
      await this._artistVerifyService.verifyByIds(artistIds);

    if (missingArtistIds.length) {
      throw new NotFoundException('Artist does not exist');
    }

    await this._albumUpdateService.updateArtistsById(id, {
      artists: foundArtistIds,
    });
  }
}
