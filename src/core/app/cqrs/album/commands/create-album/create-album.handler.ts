import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateAlbumCommand } from './create-album.command';
import { NotFoundException } from '../../../../../shared/exceptions';
import { ArtistService } from '../../../../components/artist/artist.service';
import { AlbumService } from '../../../../components/album/album.service';

@CommandHandler(CreateAlbumCommand)
export class CreateAlbumHandler implements ICommandHandler<CreateAlbumCommand> {
  constructor(
    @Inject(ArtistService) private readonly _artistService: ArtistService,
    @Inject(AlbumService) private readonly _albumService: AlbumService,
  ) {}

  async execute({ artistId }: CreateAlbumCommand) {
    const verifiedArtistId = await this._artistService.verifyArtistId(artistId);

    if (!verifiedArtistId) {
      throw new NotFoundException('Artist not found');
    }

    return await this._albumService.createAlbum({ artistId: verifiedArtistId });
  }
}
