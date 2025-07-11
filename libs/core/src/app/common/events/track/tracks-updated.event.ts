import { Event } from '@core/app/common/ports/event-bus.port';
import { TrackId } from '@core/domain/components/track/types';
import { AlbumId } from '@core/domain/components/album/types';
import { ArtistId } from '@core/domain/components/artist/types';

export type TracksUpdatedEventPayload = {
  tracks: {
    id: TrackId;
    name: string;
    album: { id: AlbumId; name: string };
    artists: { id: ArtistId; name: string }[];
    featArtists: { id: ArtistId; name: string }[];
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
