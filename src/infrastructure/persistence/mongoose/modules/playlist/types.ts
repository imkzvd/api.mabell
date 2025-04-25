import { Overwrite } from 'utility-types';
import { Playlist } from './playlist.document';
import { User } from '../user/user.document';

export type PlaylistWithOwnerDocument = Overwrite<
  Playlist,
  {
    owner: User;
  }
>;
