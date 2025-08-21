import { Event } from '../../ports/event-bus/types';
import { TrackEventPayload } from './types';

export class TrackCreatedEvent extends Event<TrackEventPayload> {
  public readonly name = 'track.created';

  constructor(public readonly payload: TrackEventPayload) {
    super();
  }
}
