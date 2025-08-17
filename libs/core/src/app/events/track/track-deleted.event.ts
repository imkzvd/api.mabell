import { Event } from '../../ports/event-bus/types';
import { TrackId } from '../../../domain/components/track/types';

export type TrackDeletedEventPayload = {
  id: TrackId;
};

export class TrackDeletedEvent extends Event<TrackDeletedEventPayload> {
  public readonly name = 'track.deleted';

  constructor(public readonly payload: TrackDeletedEventPayload) {
    super();
  }
}
