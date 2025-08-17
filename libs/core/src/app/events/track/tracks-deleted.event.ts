import { Event } from '../../ports/event-bus/types';
import { TrackId } from '../../../domain/components/track/types';

export type TracksDeletedEventPayload = {
  ids: TrackId[];
};

export class TracksDeletedEvent extends Event<TracksDeletedEventPayload> {
  public readonly name = 'tracks.deleted';

  constructor(public readonly payload: TracksDeletedEventPayload) {
    super();
  }
}
