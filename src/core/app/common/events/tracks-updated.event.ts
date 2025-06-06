import { Event } from '../ports/event-bus.port';
import { TrackId } from '../../../domain/components/track/types';

export type TracksUpdatedPayload = {
  ids: TrackId[];
};

export class TracksUpdatedEvent implements Event<TracksUpdatedPayload> {
  public readonly name = 'tracks.updated';

  constructor(public readonly payload: TracksUpdatedPayload) {}
}
