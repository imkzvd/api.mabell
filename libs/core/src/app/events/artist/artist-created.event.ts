import { Event } from '../../ports';
import { ArtistId } from '../../../../domain/components/artist';

export type ArtistCreatedEventPayload = {
  id: ArtistId;
  name: string;
  avatar: string | null;
  isPublic: boolean;
};

export class ArtistCreatedEvent extends Event<ArtistCreatedEventPayload> {
  public readonly name = 'artist.created';

  constructor(public readonly payload: ArtistCreatedEventPayload) {
    super();
  }
}
