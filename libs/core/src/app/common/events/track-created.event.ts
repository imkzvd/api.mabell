import { Event } from '../ports/event-bus.port';
import { TrackId } from '@core/domain/components/track/types';

export type TrackCreatedPayload = {
  id: TrackId;
};

export class TrackCreatedEvent implements Event<TrackCreatedPayload> {
  public readonly name = 'track.created';

  constructor(public readonly payload: TrackCreatedPayload) {}
}
