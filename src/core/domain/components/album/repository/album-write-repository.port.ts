import { WriteRepository } from '../../../common/repository/write-repository.interface';
import { Album, AlbumId } from '../album.entity';
import { AlbumFilter } from './album.filter';

export const ALBUM_WRITE_REPOSITORY_DI_TOKEN = Symbol('ALBUM_WRITE_REPOSITORY_DI_TOKEN');

export type AlbumWriteRepository = WriteRepository<Album, AlbumId, AlbumFilter>;
