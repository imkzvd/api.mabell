import { Event } from '@core/app/common/ports/event-bus.port';
import { ArtistId } from '@core/domain/components/artist/types';

export type ArtistCreatedEventPayload = {
  id: ArtistId;
  name: string;
  avatar: string | null;
};

export class ArtistCreatedEvent extends Event<ArtistCreatedEventPayload> {
  public readonly name = 'artist.created';

  constructor(public readonly payload: ArtistCreatedEventPayload) {
    super();
  }
}
