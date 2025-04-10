import { ReadRepository } from '../../../../common/base/read-repository/read-repository.interface';
import { SimplifiedAlbumDTO } from '../../dtos/simplified-album.dto';
import { AlbumDTO } from '../../dtos/album.dto';
import { AlbumFilter } from './album.filter';

export const ALBUM_READ_REPOSITORY_DI_TOKEN = Symbol('ALBUM_READ_REPOSITORY_DI_TOKEN');

export type AlbumReadRepository = ReadRepository<AlbumDTO, SimplifiedAlbumDTO, AlbumFilter>;
