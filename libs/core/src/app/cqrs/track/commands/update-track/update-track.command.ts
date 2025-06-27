import { Command } from '@core/app/types';
import { TrackId } from '@core/domain/components/track/types';
import { UpdateTrackPayload } from '@core/app/components/track/types';

export class UpdateTrackCommand extends Command<TrackId> {
  constructor(
    public readonly id: string,
    public readonly payload: UpdateTrackPayload,
  ) {
    super();
  }
}
