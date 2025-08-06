import { Overwrite } from 'utility-types';
import { Playlist } from './playlist.schema';
import { User } from '../user/user.schema';
import { HydratedDocument } from 'mongoose';
import { UserDocument } from '../user/types';

export type PlaylistDocument = HydratedDocument<Playlist>;

export type PlaylistWithUserDocument = Overwrite<
  PlaylistDocument,
  {
    user: UserDocument;
  }
>;

export type PlaylistWithUser = Overwrite<
  Playlist,
  {
    user: User;
  }
>;
