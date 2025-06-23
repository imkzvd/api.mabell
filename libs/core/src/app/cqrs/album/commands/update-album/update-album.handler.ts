import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateAlbumCommand } from './update-album.command';
import { AlbumService } from '../../../../components/album/album.service';

@CommandHandler(UpdateAlbumCommand)
export class UpdateAlbumHandler implements ICommandHandler<UpdateAlbumCommand> {
  constructor(@Inject(AlbumService) private readonly _albumService: AlbumService) {}

  async execute({ id, payload }: UpdateAlbumCommand) {
    return await this._albumService.updateAlbum(id, payload);
  }
}
