import { Event } from '@core/app/common/ports/event-bus.port';
import { TrackId } from '@core/domain/components/track/types';

export type TracksDeletedEventPayload = {
  ids: TrackId[];
};

export class TracksDeletedEvent extends Event<TracksDeletedEventPayload> {
  public readonly name = 'tracks.deleted';

  constructor(public readonly payload: TracksDeletedEventPayload) {
    super();
  }
}
