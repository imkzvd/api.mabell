import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ArtistService } from '@core/app/components/artist/artist.service';
import { UpdateArtistCoverCommand } from '@core/app/cqrs/artist/commands/update-artist-cover/update-artist-cover.command';
import { UpdateArtistCoverHandler as CoreUpdateArtistCoverHandler } from '@core/app/cqrs/artist/commands/update-artist-cover/update-artist-cover.handler';

@CommandHandler(UpdateArtistCoverCommand)
export class UpdateArtistCoverHandler implements ICommandHandler<UpdateArtistCoverCommand> {
  private readonly _coreHandler: CoreUpdateArtistCoverHandler;

  constructor(@Inject(ArtistService) service: ArtistService) {
    this._coreHandler = new CoreUpdateArtistCoverHandler(service);
  }

  execute(command: UpdateArtistCoverCommand) {
    return this._coreHandler.execute(command);
  }
}
