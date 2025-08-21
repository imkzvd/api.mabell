import { Command } from '../../../../types';
import { UpdateTrackPayload } from '../../../../components/track/types';

export class UpdateTrackCommand extends Command<void> {
  constructor(
    public readonly id: string,
    public readonly payload: UpdateTrackPayload,
  ) {
    super();
  }
}
