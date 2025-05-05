import { Overwrite } from 'utility-types';
import { Playlist } from './playlist.schema';
import { User } from '../user/user.schema';
import { HydratedDocument } from 'mongoose';
import { UserDocument } from '../user/types';

export type PlaylistDocument = HydratedDocument<Playlist>;

export type PlaylistWithOwnerDocument = Overwrite<
  PlaylistDocument,
  {
    owner: UserDocument;
  }
>;

export type PlaylistWithOwner = Overwrite<
  Playlist,
  {
    owner: User;
  }
>;
