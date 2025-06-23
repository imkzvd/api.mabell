import { UserId } from '@core/domain/components/user/types';
import { PlaylistId } from '@core/domain/components/playlist/types';
import { StoredFileDTO } from './common/dtos/stored-file.dto';
import { TmpFileDTO } from './common/dtos/tmp-file.dto';

export interface UserFileStorage {
  saveUserAvatar(id: UserId, file: TmpFileDTO): Promise<StoredFileDTO>;

  deleteUserAvatar(id: UserId): Promise<void>;

  deleteUserDirectory(id: UserId): Promise<void>;

  savePlaylistCover(id: UserId, playlistId: PlaylistId, file: TmpFileDTO): Promise<StoredFileDTO>;

  deletePlaylistCover(id: UserId, playlistId: PlaylistId): Promise<void>;

  deletePlaylistDirectory(id: UserId, playlistId: PlaylistId): Promise<void>;
}
