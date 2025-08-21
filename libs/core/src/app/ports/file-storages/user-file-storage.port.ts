import { TmpFileDTO, StoredFileDTO } from '../../dtos';

export interface UserFileStorage {
  saveUserAvatar(userId: string, file: TmpFileDTO): Promise<StoredFileDTO>;

  deleteUserAvatar(userId: string): Promise<void>;

  deleteUserDirectory(userId: string): Promise<void>;

  savePlaylistCover(userId: string, playlistId: string, file: TmpFileDTO): Promise<StoredFileDTO>;

  deletePlaylistCover(userId: string, playlistId: string): Promise<void>;

  deletePlaylistDirectory(userId: string, playlistId: string): Promise<void>;
}
