import { Command } from '@nestjs/cqrs';
import { UpdateTrackPayload } from '../../types';
import { TrackId } from '../../../../../domain/components/track/types';

export class UpdateTrackCommand extends Command<TrackId> {
  constructor(
    public readonly id: string,
    public readonly payload: UpdateTrackPayload,
  ) {
    super();
  }
}
