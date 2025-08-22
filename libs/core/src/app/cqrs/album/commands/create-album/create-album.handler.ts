import { CreateAlbumCommand } from './create-album.command';
import { CommandHandler } from '../../../../types';
import { ArtistVerifyService } from '../../../../components/artist';
import { AlbumCreateService } from '../../../../components/album';
import { NotFoundException } from '../../../../../shared/exceptions';

export class CreateAlbumHandler implements CommandHandler<CreateAlbumCommand> {
  constructor(
    private readonly _artistVerifyService: ArtistVerifyService,
    private readonly _albumCreateService: AlbumCreateService,
  ) {}

  async execute({ artistId }: CreateAlbumCommand) {
    const verifiedArtistId = await this._artistVerifyService.verifyById(artistId);

    if (!verifiedArtistId) {
      throw new NotFoundException('Artist not found');
    }

    const id = await this._albumCreateService.create({ artistId: verifiedArtistId });

    return { id };
  }
}
