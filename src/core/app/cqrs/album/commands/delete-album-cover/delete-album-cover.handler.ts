import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeleteAlbumCoverCommand } from './delete-album-cover.command';
import { AlbumService } from '../../../../components/album/album.service';

@CommandHandler(DeleteAlbumCoverCommand)
export class DeleteAlbumCoverHandler implements ICommandHandler<DeleteAlbumCoverCommand> {
  constructor(@Inject(AlbumService) private readonly _albumService: AlbumService) {}

  async execute({ id }: DeleteAlbumCoverCommand) {
    return await this._albumService.deleteAlbumCover(id);
  }
}
