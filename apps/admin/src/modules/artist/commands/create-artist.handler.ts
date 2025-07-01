import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateArtistCommand } from '@core/app/cqrs/artist/commands/create-artist/create-artist.command';
import { CreateArtistHandler as CoreCreateArtistHandler } from '@core/app/cqrs/artist/commands/create-artist/create-artist.handler';
import { ArtistService } from '@core/app/components/artist/artist.service';

@CommandHandler(CreateArtistCommand)
export class CreateArtistHandler implements ICommandHandler<CreateArtistCommand> {
  private readonly _coreHandler: CoreCreateArtistHandler;

  constructor(@Inject(ArtistService) readonly service: ArtistService) {
    this._coreHandler = new CoreCreateArtistHandler(service);
  }

  execute() {
    return this._coreHandler.execute();
  }
}
