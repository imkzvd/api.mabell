import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { UserVerificationService } from '@core/app/components/user/services/user-verification.service';
import { PlaylistService } from '@core/app/components/playlist/playlist.service';
import { CreatePlaylistCommand } from '@core/app/cqrs/playlist/commands/create-playlist/create-playlist.command';
import { CreatePlaylistHandler as CoreCreatePlaylistHandler } from '@core/app/cqrs/playlist/commands/create-playlist/create-playlist.handler';

@CommandHandler(CreatePlaylistCommand)
export class CreatePlaylistHandler extends CoreCreatePlaylistHandler {
  constructor(
    @Inject(UserVerificationService) readonly userVerificationService: UserVerificationService,
    @Inject(PlaylistService) readonly playlistService: PlaylistService,
  ) {
    super(userVerificationService, playlistService);
  }
}
