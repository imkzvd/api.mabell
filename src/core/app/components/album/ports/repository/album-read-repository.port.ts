import { ReadRepository } from '../../../../common/base/read-repository/read-repository.interface';
import { AlbumDTO } from '../../dtos/album.dto';
import { AlbumFilter } from './album.filter';
import { AlbumWithArtistsAndTracksDTO } from '../../dtos/album-with-artists-and-tracks.dto';

export const ALBUM_READ_REPOSITORY_DI_TOKEN = Symbol('ALBUM_READ_REPOSITORY_DI_TOKEN');

export type AlbumReadRepository = ReadRepository<
  AlbumDTO,
  AlbumFilter,
  AlbumWithArtistsAndTracksDTO
>;
