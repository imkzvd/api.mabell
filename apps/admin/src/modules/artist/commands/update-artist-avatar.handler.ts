import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ArtistService } from '@core/app/components/artist/artist.service';
import { UpdateArtistAvatarCommand } from '@core/app/cqrs/artist/commands/update-artist-avatar/update-artist-avatar.command';
import { UpdateArtistAvatarHandler as CoreUpdateArtistAvatarHandler } from '@core/app/cqrs/artist/commands/update-artist-avatar/update-artist-avatar.handler';

@CommandHandler(UpdateArtistAvatarCommand)
export class UpdateArtistAvatarHandler implements ICommandHandler<UpdateArtistAvatarCommand> {
  private readonly _coreHandler: CoreUpdateArtistAvatarHandler;

  constructor(@Inject(ArtistService) service: ArtistService) {
    this._coreHandler = new CoreUpdateArtistAvatarHandler(service);
  }

  execute(command: UpdateArtistAvatarCommand) {
    return this._coreHandler.execute(command);
  }
}
