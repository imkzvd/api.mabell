import { UserId } from '../../../../domain/components/user/types';
import { PlaylistId } from '../../../../domain/components/playlist/types';
import { StoredFileDTO } from './common/dtos/stored-file.dto';
import { TmpFileDTO } from './common/dtos/tmp-file.dto';

export const USER_FILE_STORAGE_DI_TOKEN = Symbol('USER_FILE_STORAGE_DI_TOKEN');

export interface UserFileStorage {
  saveUserAvatar(id: UserId, file: TmpFileDTO): Promise<StoredFileDTO>;

  deleteUserAvatar(id: UserId): Promise<void>;

  deleteUserDirectory(id: UserId): Promise<void>;

  savePlaylistCover(id: UserId, playlistId: PlaylistId, file: TmpFileDTO): Promise<StoredFileDTO>;

  deletePlaylistCover(id: UserId, playlistId: PlaylistId): Promise<void>;

  deletePlaylistDirectory(id: UserId, playlistId: PlaylistId): Promise<void>;
}
