import { Event } from '../../ports';
import { TrackId } from '../../../../domain/components/track';

export type TrackDeletedEventPayload = {
  id: TrackId;
};

export class TrackDeletedEvent extends Event<TrackDeletedEventPayload> {
  public readonly name = 'track.deleted';

  constructor(public readonly payload: TrackDeletedEventPayload) {
    super();
  }
}
