import { Event } from '@core/app/common/ports/event-bus.port';
import { TrackId } from '@core/domain/components/track/types';

export type TrackDeletedEventPayload = {
  id: TrackId;
};

export class TrackDeletedEvent extends Event<TrackDeletedEventPayload> {
  public readonly name = 'track.deleted';

  constructor(public readonly payload: TrackDeletedEventPayload) {
    super();
  }
}
