import { Event } from '../../ports/event-bus/types';
import { TrackEventPayload } from './types';

export class TrackUpdatedEvent extends Event<TrackEventPayload> {
  public readonly name = 'track.updated';

  constructor(public readonly payload: TrackEventPayload) {
    super();
  }
}
