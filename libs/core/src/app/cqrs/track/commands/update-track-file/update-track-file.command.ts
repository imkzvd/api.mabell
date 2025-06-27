import { Command } from '@core/app/types';
import { TrackId } from '@core/domain/components/track/types';
import { UpdateTrackFilePayload } from '@core/app/components/track/types';

export class UpdateTrackFileCommand extends Command<TrackId> {
  constructor(
    public readonly id: string,
    public readonly payload: UpdateTrackFilePayload,
  ) {
    super();
  }
}
