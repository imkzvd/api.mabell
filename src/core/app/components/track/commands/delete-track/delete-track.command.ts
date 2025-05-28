import { Command } from '@nestjs/cqrs';
import { TrackId } from '../../../../../domain/components/track/types';

export class DeleteTrackCommand extends Command<TrackId> {
  constructor(public readonly id: string) {
    super();
  }
}
