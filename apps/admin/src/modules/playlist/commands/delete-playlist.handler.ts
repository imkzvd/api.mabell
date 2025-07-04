import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { PlaylistService } from '@core/app/components/playlist/playlist.service';
import { DeletePlaylistCommand } from '@core/app/cqrs/playlist/commands/delete-playlist/delete-playlist.command';
import { DeletePlaylistHandler as CoreDeletePlaylistHandler } from '@core/app/cqrs/playlist/commands/delete-playlist/delete-playlist.handler';

@CommandHandler(DeletePlaylistCommand)
export class DeletePlaylistHandler extends CoreDeletePlaylistHandler {
  constructor(@Inject(PlaylistService) readonly service: PlaylistService) {
    super(service);
  }
}
