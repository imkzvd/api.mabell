import { NameVO } from './vos/name.vo';
import { Track } from './track.entity';
import { DurationVO } from './vos/duration.vo';
import { TrackId } from './types';
import { AlbumId } from '../album/types';
import { ArtistId } from '../artist/types';

export class TrackFactory {
  static create(props: {
    id: TrackId;
    name: string;
    album: AlbumId;
    artists: ArtistId[];
    featArtists?: ArtistId[];
    trackNumber?: number;
    file?: string | null;
    tracks?: string[];
    duration?: number | null;
    isExplicit?: boolean;
    isActive?: boolean;
    isPublic?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    return new Track(
      props.id,
      NameVO.create(props.name),
      props.album,
      new Set(props.artists),
      new Set(props.featArtists),
      props.trackNumber ?? 0,
      props.file || null,
      props.duration ? DurationVO.create(props.duration) : null,
      props.isExplicit ?? false,
      props.isActive ?? false,
      props.isPublic ?? false,
      props.createdAt || new Date(),
      props.updatedAt || new Date(),
    );
  }
}
