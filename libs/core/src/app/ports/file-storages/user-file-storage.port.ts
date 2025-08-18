import { TmpFileDTO, StoredFileDTO } from '../../dtos';

export interface UserFileStorage {
  saveUserAvatar(id: string, file: TmpFileDTO): Promise<StoredFileDTO>;

  deleteUserAvatar(id: string): Promise<void>;

  deleteUserDirectory(id: string): Promise<void>;

  savePlaylistCover(id: string, playlistId: string, file: TmpFileDTO): Promise<StoredFileDTO>;

  deletePlaylistCover(id: string, playlistId: string): Promise<void>;

  deletePlaylistDirectory(id: string, playlistId: string): Promise<void>;
}
