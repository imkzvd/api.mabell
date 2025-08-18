import { Command } from '../../../../types';
import { ArtistId } from '../../../../../domain/components/artist/types';

export class CreateArtistCommand extends Command<{ id: ArtistId }> {
  constructor() {
    super();
  }
}
