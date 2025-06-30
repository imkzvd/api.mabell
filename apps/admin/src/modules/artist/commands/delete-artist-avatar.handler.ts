import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ArtistService } from '@core/app/components/artist/artist.service';
import { DeleteArtistAvatarCommand } from '@core/app/cqrs/artist/commands/delete-artist-avatar/delete-artist-avatar.command';
import { DeleteArtistAvatarHandler as CoreDeleteArtistAvatarHandler } from '@core/app/cqrs/artist/commands/delete-artist-avatar/delete-artist-avatar.handler';

@CommandHandler(DeleteArtistAvatarCommand)
export class DeleteArtistAvatarHandler implements ICommandHandler<DeleteArtistAvatarCommand> {
  private readonly _coreHandler: CoreDeleteArtistAvatarHandler;

  constructor(@Inject(ArtistService) service: ArtistService) {
    this._coreHandler = new CoreDeleteArtistAvatarHandler(service);
  }

  execute(command: DeleteArtistAvatarCommand) {
    return this._coreHandler.execute(command);
  }
}
