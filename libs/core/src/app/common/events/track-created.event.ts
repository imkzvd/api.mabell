import { Event } from '@core/app/common/ports/event-bus.port';
import { TrackId } from '@core/domain/components/track/types';

export type TrackCreatedEventPayload = {
  id: TrackId;
  name: string;
  album: { id: string; name: string };
  artists: { id: string; name: string };
  featArtists: { id: string; name: string };
  cover: string | null;
  isExplicit: boolean;
};

export class TrackCreatedEvent extends Event<TrackCreatedEventPayload> {
  public readonly name = 'track.created';

  constructor(public readonly payload: TrackCreatedEventPayload) {
    super();
  }
}
