import { Command } from '../../../../types';
import { UpdateTrackFilePayload } from '../../../../components/track/types';

export class UpdateTrackFileCommand extends Command<void> {
  constructor(
    public readonly id: string,
    public readonly payload: UpdateTrackFilePayload,
  ) {
    super();
  }
}
