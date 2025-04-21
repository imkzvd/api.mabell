import { ReadRepository } from '../../../../common/base/read-repository/read-repository.interface';
import { AlbumFilter } from './album.filter';
import { AlbumDTO } from './dtos/album.dto';
import { AlbumWithArtistsDTO } from './dtos/album-with-artists.dto';

export const ALBUM_READ_REPOSITORY_DI_TOKEN = Symbol('ALBUM_READ_REPOSITORY_DI_TOKEN');

export type AlbumReadRepository = ReadRepository<AlbumDTO, AlbumFilter, AlbumWithArtistsDTO>;
