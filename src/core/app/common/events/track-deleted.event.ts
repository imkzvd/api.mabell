import { Event } from '../ports/event-bus.port';
import { TrackId } from '../../../domain/components/track/types';

export type TrackDeletedPayload = {
  id: TrackId;
};

export class TrackDeletedEvent implements Event<TrackDeletedPayload> {
  public readonly name = 'track.deleted';

  constructor(public readonly payload: TrackDeletedPayload) {}
}
