import { Event } from '../../ports';
import { PlaylistId } from '../../../../domain/components/playlist';
import { UserId } from '../../../../domain/components/user';

export type PlaylistCreatedEventPayload = {
  id: PlaylistId;
  name: string;
  user: { id: UserId; name: string; isPublic: boolean };
  cover: string | null;
  isPublic: boolean;
};

export class PlaylistCreatedEvent extends Event<PlaylistCreatedEventPayload> {
  public readonly name = 'playlist.created';

  constructor(public readonly payload: PlaylistCreatedEventPayload) {
    super();
  }
}
