import { Event } from '@core/app/common/ports/event-bus.port';
import { TrackId } from '@core/domain/components/track/types';
import { AlbumId } from '@core/domain/components/album/types';
import { ArtistId } from '@core/domain/components/artist/types';

export type TracksUpdatedEventPayload = {
  tracks: {
    id: TrackId;
    name: string;
    album: { id: AlbumId; name: string; isPublic: boolean };
    artists: { id: ArtistId; name: string; isPublic: boolean }[];
    featArtists: { id: ArtistId; name: string; isPublic: boolean }[];
    cover: string | null;
    isPublic: boolean;
    isExplicit: boolean;
  }[];
};

export class TracksUpdatedEvent extends Event<TracksUpdatedEventPayload> {
  public readonly name = 'tracks.updated';

  constructor(public readonly payload: TracksUpdatedEventPayload) {
    super();
  }
}
