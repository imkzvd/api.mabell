import { WriteRepository } from '../../../common/repository/write-repository.interface';
import { Playlist, PlaylistId } from '../playlist.entity';
import { PlaylistFilter } from './playlist.filter';

export const PLAYLIST_WRITE_REPOSITORY_DI_TOKEN = Symbol('PLAYLIST_WRITE_REPOSITORY_DI_TOKEN');

export type PlaylistWriteRepository = WriteRepository<Playlist, PlaylistId, PlaylistFilter>;
