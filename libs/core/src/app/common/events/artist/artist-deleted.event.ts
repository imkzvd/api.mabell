import { Event } from '@core/app/common/ports/event-bus.port';
import { ArtistId } from '@core/domain/components/artist/types';

export type ArtistDeletedEventPayload = {
  id: ArtistId;
};

export class ArtistDeletedEvent extends Event<ArtistDeletedEventPayload> {
  public readonly name = 'artist.deleted';

  constructor(public readonly payload: ArtistDeletedEventPayload) {
    super();
  }
}
