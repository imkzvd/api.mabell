import { Command } from '@core/app/types';
import { TrackId } from '@core/domain/components/track/types';

export class CreateTrackCommand extends Command<TrackId> {
  constructor(public readonly albumId: string) {
    super();
  }
}
