import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateAlbumCoverCommand } from './update-album-cover.command';
import { AlbumService } from '../../../../components/album/album.service';

@CommandHandler(UpdateAlbumCoverCommand)
export class UpdateAlbumCoverHandler implements ICommandHandler<UpdateAlbumCoverCommand> {
  constructor(@Inject(AlbumService) private readonly _albumService: AlbumService) {}

  async execute({ id, payload }: UpdateAlbumCoverCommand) {
    return await this._albumService.updateAlbumCover(id, payload);
  }
}
