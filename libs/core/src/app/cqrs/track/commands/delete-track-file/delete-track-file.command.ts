import { Command } from '@core/app/types';
import { TrackId } from '@core/domain/components/track/types';

export class DeleteTrackFileCommand extends Command<TrackId> {
  constructor(public readonly id: string) {
    super();
  }
}
