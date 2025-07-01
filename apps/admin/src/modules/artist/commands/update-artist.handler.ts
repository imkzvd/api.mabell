import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ArtistService } from '@core/app/components/artist/artist.service';
import { UpdateArtistCommand } from '@core/app/cqrs/artist/commands/update-artist/update-artist.command';
import { UpdateArtistHandler as CoreUpdateArtistHandler } from '@core/app/cqrs/artist/commands/update-artist/update-artist.handler';

@CommandHandler(UpdateArtistCommand)
export class UpdateArtistHandler implements ICommandHandler<UpdateArtistCommand> {
  private readonly _coreHandler: CoreUpdateArtistHandler;

  constructor(@Inject(ArtistService) service: ArtistService) {
    this._coreHandler = new CoreUpdateArtistHandler(service);
  }

  execute(command: UpdateArtistCommand) {
    return this._coreHandler.execute(command);
  }
}
