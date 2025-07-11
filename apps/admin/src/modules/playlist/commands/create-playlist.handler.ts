import { CommandHandler } from '@nestjs/cqrs';
import { CreatePlaylistCommand } from '@core/app/cqrs/playlist/commands/create-playlist/create-playlist.command';
import { CreatePlaylistHandler as CoreCreatePlaylistHandler } from '@core/app/cqrs/playlist/commands/create-playlist/create-playlist.handler';
import { UserVerifyService } from '@core/app/components/user/services/user-verify.service';
import { PlaylistCreateService } from '@core/app/components/playlist/services/playlist-create.service';

@CommandHandler(CreatePlaylistCommand)
export class CreatePlaylistHandler extends CoreCreatePlaylistHandler {
  constructor(userVerifyService: UserVerifyService, playlistCreateService: PlaylistCreateService) {
    super(userVerifyService, playlistCreateService);
  }
}
