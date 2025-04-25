import { ReadRepository } from '../../../../common/base/read-repository/read-repository.interface';
import { PlaylistDTO } from './dtos/playlist.dto';
import { PlaylistFilter } from '../../../../../domain/components/playlist/repository/playlist.filter';
import { PlaylistWithOwnerDTO } from './dtos/playlist-with-owner.dto';

export const PLAYLIST_READ_REPOSITORY_DI_TOKEN = Symbol('PLAYLIST_READ_REPOSITORY_DI_TOKEN');

export type PlaylistReadRepository = ReadRepository<
  PlaylistDTO,
  PlaylistFilter,
  PlaylistWithOwnerDTO
>;
