import { Playlist } from './playlist.entity';
import { NameVO } from './vos/name.vo';
import { GenreVO } from '../../common/vos/genre.vo';
import { HexColorVO } from '../../common/vos/hex-color.vo';
import { DescriptionVO } from './vos/description.vo';
import { PlaylistId } from './types';
import { UserId } from '../user/types';
import { TrackId } from '../track/types';

export class PlaylistFactory {
  static create(props: {
    id: PlaylistId;
    user: UserId;
    name: string;
    genres?: string[];
    cover?: string | null;
    color?: string | null;
    description?: string;
    tracks?: { id: string; addedAt: Date }[];
    isPublic?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    return new Playlist(
      props.id,
      props.user,
      NameVO.create(props.name),
      props.genres?.map((genre: string) => GenreVO.create(genre)) || [],
      props.cover || null,
      props.color ? HexColorVO.create(props.color) : null,
      DescriptionVO.create(props.description || ''),
      new Map(props.tracks?.map(({ id, addedAt }) => [id as TrackId, addedAt])),
      props.isPublic ?? false,
      props.createdAt || new Date(),
      props.updatedAt || new Date(),
    );
  }
}
