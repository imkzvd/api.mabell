import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ArtistService } from '@core/app/components/artist/artist.service';
import { DeleteArtistCoverCommand } from '@core/app/cqrs/artist/commands/delete-artist-cover/delete-artist-cover.command';
import { DeleteArtistCoverHandler as CoreDeleteArtistCoverHandler } from '@core/app/cqrs/artist/commands/delete-artist-cover/delete-artist-cover.handler';

@CommandHandler(DeleteArtistCoverCommand)
export class DeleteArtistCoverHandler implements ICommandHandler<DeleteArtistCoverCommand> {
  private readonly _coreHandler: CoreDeleteArtistCoverHandler;

  constructor(@Inject(ArtistService) service: ArtistService) {
    this._coreHandler = new CoreDeleteArtistCoverHandler(service);
  }

  execute(command: DeleteArtistCoverCommand) {
    return this._coreHandler.execute(command);
  }
}
