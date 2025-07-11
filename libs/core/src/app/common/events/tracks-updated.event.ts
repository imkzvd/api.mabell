import { Event } from '@core/app/common/ports/event-bus.port';
import { TrackId } from '@core/domain/components/track/types';

export type TracksUpdatedEventPayload = {
  tracks: {
    id: TrackId;
    name: string;
    album: { id: string; name: string };
    artists: { id: string; name: string };
    featArtists: { id: string; name: string };
    cover: string | null;
    isExplicit: boolean;
  }[];
};

export class TracksUpdatedEvent extends Event<TracksUpdatedEventPayload> {
  public readonly name = 'tracks.updated';

  constructor(public readonly payload: TracksUpdatedEventPayload) {
    super();
  }
}
