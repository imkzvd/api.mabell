import { Command } from '@nestjs/cqrs';
import { TrackId } from '../../../../../domain/components/track/types';
import { UpdateTrackFilePayload } from '../../../../components/track/types';

export class UpdateTrackFileCommand extends Command<TrackId> {
  constructor(
    public readonly id: string,
    public readonly payload: UpdateTrackFilePayload,
  ) {
    super();
  }
}
