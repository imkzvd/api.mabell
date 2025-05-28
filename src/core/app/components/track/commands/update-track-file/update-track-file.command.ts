import { Command } from '@nestjs/cqrs';
import { UpdateTrackFilePayload } from '../../types';
import { TrackId } from '../../../../../domain/components/track/types';

export class UpdateTrackFileCommand extends Command<TrackId> {
  constructor(
    public readonly id: string,
    public readonly payload: UpdateTrackFilePayload,
  ) {
    super();
  }
}
