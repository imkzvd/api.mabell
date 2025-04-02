import { StoredFileDTO } from '../../../../common/dtos/file/stored-file.dto';
import { TmpFileDTO } from '../../../upload/dtos/tmp-file.dto';
import { ArtistId } from '../../../../../domain/components/artist/artist.entity';

export const ARTIST_FILE_STORAGE_DI_TOKEN = Symbol('ARTIST_FILE_STORAGE_DI_TOKEN');

export interface ArtistFileStorage {
  saveAvatar(id: ArtistId, file: TmpFileDTO): Promise<StoredFileDTO>;
  deleteAvatar(id: ArtistId): Promise<void>;
  saveCover(id: ArtistId, file: TmpFileDTO): Promise<StoredFileDTO>;
  deleteCover(id: ArtistId): Promise<void>;
  deleteDirectory(id: ArtistId): Promise<void>;
}
