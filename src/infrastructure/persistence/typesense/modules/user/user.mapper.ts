import { UserDocument } from './user.document';
import { UserDTO } from '../../../../../core/app/components/user/dtos/user.dto';
import { IndexedUserDTO } from '../../../../../core/app/components/search/ports/search-service/dtos/indexed-user.dto';

class UserMapper {
  toDocument(dto: UserDTO): UserDocument {
    return new UserDocument(dto.id, dto.name, dto.email || undefined, dto.avatar || undefined);
  }

  toDTO(doc: UserDocument): IndexedUserDTO {
    return new IndexedUserDTO(doc.id, doc.name, doc.email || null, doc.avatar || null);
  }
}

export default new UserMapper();
