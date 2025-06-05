import { Command } from '@nestjs/cqrs';
import { TrackId } from '../../../../../domain/components/track/types';
import { UpdateTrackPayload } from '../../../../components/track/types';

export class UpdateTrackCommand extends Command<TrackId> {
  constructor(
    public readonly id: string,
    public readonly payload: UpdateTrackPayload,
  ) {
    super();
  }
}
