import { NameVO } from './vos/name.vo';
import { ArtistId } from '../artist/artist.entity';
import { Track, TrackId } from './track.entity';
import { AlbumId } from '../album/album.entity';
import { DurationVO } from './vos/duration.vo';

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
