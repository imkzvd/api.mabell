import { Command } from '@core/app/types';
import { TrackId } from '@core/domain/components/track/types';

export class UpdateTrackFeatArtistsCommand extends Command<TrackId> {
  constructor(
    public readonly id: string,
    public readonly artistIds: string[],
  ) {
    super();
  }
}
