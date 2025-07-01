import { NotFoundException } from '@core/shared/exceptions';
import { ArtistService } from '@core/app/components/artist/artist.service';
import { AlbumService } from '@core/app/components/album/album.service';
import { CommandHandler } from '@core/app/types';
import { CreateAlbumCommand } from '@core/app/cqrs/album/commands/create-album/create-album.command';

export class CreateAlbumHandler implements CommandHandler<CreateAlbumCommand> {
  constructor(
    private readonly _artistService: ArtistService,
    private readonly _albumService: AlbumService,
  ) {}

  async execute({ artistId }: CreateAlbumCommand) {
    const verifiedArtistId = await this._artistService.verifyArtistId(artistId);

    if (!verifiedArtistId) {
      throw new NotFoundException('Artist not found');
    }

    return await this._albumService.createAlbum({ artistId: verifiedArtistId });
  }
}
