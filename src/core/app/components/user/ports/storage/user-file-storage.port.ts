import { StoredFileDTO } from '../../../../common/dtos/file/stored-file.dto';
import { TmpFileDTO } from '../../../upload/dtos/tmp-file.dto';
import { UserId } from '../../../../../domain/components/user/user.entity';

export const USER_FILE_STORAGE_DI_TOKEN = Symbol('USER_FILE_STORAGE_DI_TOKEN');

export interface UserFileStorage {
  saveAvatar(id: UserId, file: TmpFileDTO): Promise<StoredFileDTO>;
  deleteAvatar(id: UserId): Promise<void>;
  deleteDirectory(id: UserId): Promise<void>;
}
