import { NotFoundException } from '@core/shared/exceptions';
import { CommandHandler } from '@core/app/types';
import { CreateAlbumCommand } from '@core/app/cqrs/album/commands/create-album/create-album.command';
import { ArtistVerifyService } from '@core/app/components/artist/services/artist-verify.service';
import { AlbumCreateService } from '@core/app/components/album/services/album-create.service';

export class CreateAlbumHandler implements CommandHandler<CreateAlbumCommand> {
  constructor(
    private readonly _artistVerifyService: ArtistVerifyService,
    private readonly _albumCreateService: AlbumCreateService,
  ) {}

  async execute({ artistId }: CreateAlbumCommand) {
    const verifiedArtistId = await this._artistVerifyService.verify(artistId);

    if (!verifiedArtistId) {
      throw new NotFoundException('Artist not found');
    }

    return await this._albumCreateService.create({ artistId: verifiedArtistId });
  }
}
