import { Event } from '../ports/event-bus.port';
import { TrackId } from '../../../domain/components/track/types';

export type TracksDeletedPayload = {
  ids: TrackId[];
};

export class TracksDeletedEvent implements Event<TracksDeletedPayload> {
  public readonly name = 'tracks.deleted';

  constructor(public readonly payload: TracksDeletedPayload) {}
}
