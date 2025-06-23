import { Event } from '../ports/event-bus.port';
import { TrackId } from '../../../domain/components/track/types';

export type TrackUpdatedPayload = {
  id: TrackId;
};

export class TrackUpdatedEvent implements Event<TrackUpdatedPayload> {
  public readonly name = 'track.updated';

  constructor(public readonly payload: TrackUpdatedPayload) {}
}
