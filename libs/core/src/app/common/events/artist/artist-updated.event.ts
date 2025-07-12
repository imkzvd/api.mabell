import { Event } from '@core/app/common/ports/event-bus.port';
import { ArtistId } from '@core/domain/components/artist/types';

export type ArtistUpdatedEventPayload = {
  id: ArtistId;
  name: string;
  avatar: string | null;
  isPublic: boolean;
};

export class ArtistUpdatedEvent extends Event<ArtistUpdatedEventPayload> {
  public readonly name = 'artist.updated';

  constructor(public readonly payload: ArtistUpdatedEventPayload) {
    super();
  }
}
