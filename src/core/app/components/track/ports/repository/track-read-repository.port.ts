import { ReadRepository } from '../../../../common/base/read-repository/read-repository.interface';
import { TrackFilter } from './track.filter';
import { TrackDTO } from './dtos/track.dto';
import { TrackWithAlbumAndArtistsDTO } from './dtos/track-with-album-and-artists.dto';

export const TRACK_READ_REPOSITORY_DI_TOKEN = Symbol('TRACK_READ_REPOSITORY_DI_TOKEN');

export type TrackReadRepository = ReadRepository<
  TrackDTO,
  TrackFilter,
  TrackWithAlbumAndArtistsDTO
>;
