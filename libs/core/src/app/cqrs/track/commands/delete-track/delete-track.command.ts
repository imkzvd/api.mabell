import { Command } from '@core/app/types';
import { TrackId } from '@core/domain/components/track/types';

export class DeleteTrackCommand extends Command<TrackId> {
  constructor(public readonly id: string) {
    super();
  }
}
