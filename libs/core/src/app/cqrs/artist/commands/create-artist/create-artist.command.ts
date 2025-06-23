import { Command } from '@nestjs/cqrs';
import { ArtistId } from '../../../../../domain/components/artist/types';

export class CreateArtistCommand extends Command<ArtistId> {
  constructor() {
    super();
  }
}
