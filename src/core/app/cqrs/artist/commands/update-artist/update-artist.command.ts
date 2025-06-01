import { Command } from '@nestjs/cqrs';
import { ArtistId } from '../../../../../domain/components/artist/types';
import { UpdateArtistPayload } from '../../../../components/artist/types';

export class UpdateArtistCommand extends Command<ArtistId> {
  constructor(
    public readonly id: string,
    public readonly payload: UpdateArtistPayload,
  ) {
    super();
  }
}
