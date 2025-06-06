import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeleteAlbumCommand } from './delete-album.command';
import { AlbumService } from '../../../../components/album/album.service';

@CommandHandler(DeleteAlbumCommand)
export class DeleteAlbumHandler implements ICommandHandler<DeleteAlbumCommand> {
  constructor(@Inject(AlbumService) private readonly _albumService: AlbumService) {}

  async execute({ id }: DeleteAlbumCommand) {
    return await this._albumService.deleteAlbum(id);
  }
}
