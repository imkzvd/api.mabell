import { Command } from '@nestjs/cqrs';
import { TrackId } from '../../../../../domain/components/track/types';

export class CreateTrackCommand extends Command<TrackId> {
  constructor(public readonly albumId: string) {
    super();
  }
}
