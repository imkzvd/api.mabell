import { Event } from '../../ports';
import { PlaylistId } from '../../../../domain/components/playlist';
import { UserId } from '../../../../domain/components/user';

export type PlaylistUpdatedEventPayload = {
  id: PlaylistId;
  name: string;
  user: { id: UserId; name: string; isPublic: boolean };
  cover: string | null;
  isPublic: boolean;
};

export class PlaylistUpdatedEvent extends Event<PlaylistUpdatedEventPayload> {
  public readonly name = 'playlist.updated';

  constructor(public readonly payload: PlaylistUpdatedEventPayload) {
    super();
  }
}
