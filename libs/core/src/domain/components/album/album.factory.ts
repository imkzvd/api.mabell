import { NameVO } from './vos/name.vo';
import { GenreVO } from '../../common/vos/genre.vo';
import { HexColorVO } from '../../common/vos/hex-color.vo';
import { Album } from './album.entity';
import { AlbumTypeVO } from './vos/album-type.vo';
import { AlbumTypes } from './constants/album-types';
import { DescriptionVO } from './vos/description.vo';
import { ReleaseDateVO } from './vos/release-date.vo';
import { AlbumId } from './types';
import { ArtistId } from '../artist/types';

export class AlbumFactory {
  static create(props: {
    id: AlbumId;
    name: string;
    artists: ArtistId[];
    type?: string;
    genres?: string[];
    cover?: string | null;
    color?: string | null;
    description?: string;
    releaseAt?: Date | null;
    isActive?: boolean;
    isPublic?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    return new Album(
      props.id,
      NameVO.create(props.name),
      new Set(props.artists),
      AlbumTypeVO.create(props.type || AlbumTypes.Album),
      props.genres?.map((genre: string) => GenreVO.create(genre)) || [],
      props.cover || null,
      props.color ? HexColorVO.create(props.color) : null,
      DescriptionVO.create(props.description || ''),
      props.releaseAt ? ReleaseDateVO.create(props.releaseAt) : null,
      props.isActive ?? false,
      props.isPublic ?? false,
      props.createdAt || new Date(),
      props.updatedAt || new Date(),
    );
  }
}
