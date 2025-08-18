import { Command } from '../../../../types';
import { TrackId } from '../../../../../domain/components/track/types';

export class CreateTrackCommand extends Command<{ id: TrackId }> {
  constructor(public readonly albumId: string) {
    super();
  }
}
