import { Command } from '@nestjs/cqrs';
import { TrackId } from '../../../../../domain/components/track/types';

export class UpdateTrackFeatArtistsCommand extends Command<TrackId> {
  constructor(
    public readonly id: string,
    public readonly artistIds: string[],
  ) {
    super();
  }
}
