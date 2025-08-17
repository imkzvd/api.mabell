import { Event } from '../../ports';
import { ArtistId } from '../../../../domain/components/artist';

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
