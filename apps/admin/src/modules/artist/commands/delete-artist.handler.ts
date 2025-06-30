import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteArtistCommand } from '@core/app/cqrs/artist/commands/delete-artist/delete-artist.command';
import { DeleteArtistHandler as CoreDeleteArtistHandler } from '@core/app/cqrs/artist/commands/delete-artist/delete-artist.handler';
import { ArtistService } from '@core/app/components/artist/artist.service';

@CommandHandler(DeleteArtistCommand)
export class DeleteArtistHandler implements ICommandHandler<DeleteArtistCommand> {
  private readonly _coreHandler: CoreDeleteArtistHandler;

  constructor(@Inject(ArtistService) service: ArtistService) {
    this._coreHandler = new CoreDeleteArtistHandler(service);
  }

  execute(command: DeleteArtistCommand) {
    return this._coreHandler.execute(command);
  }
}
