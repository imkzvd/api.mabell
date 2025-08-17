import { Event } from '../../ports/event-bus/types';
import { TrackEventPayload } from './types';

export class TracksUpdatedEvent extends Event<{
  tracks: TrackEventPayload[];
}> {
  public readonly name = 'tracks.updated';

  constructor(
    public readonly payload: {
      tracks: TrackEventPayload[];
    },
  ) {
    super();
  }
}
