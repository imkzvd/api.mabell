import { Event } from '../../ports';
import { TrackId } from '../../../../domain/components/track';

export type TracksDeletedEventPayload = {
  ids: TrackId[];
};

export class TracksDeletedEvent extends Event<TracksDeletedEventPayload> {
  public readonly name = 'tracks.deleted';

  constructor(public readonly payload: TracksDeletedEventPayload) {
    super();
  }
}
