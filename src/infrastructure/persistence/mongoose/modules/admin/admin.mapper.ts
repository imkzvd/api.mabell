import { Types } from 'mongoose';
import type { Admin as AdminDocument } from './admin.document';
import { ReadMapper, WriteMapper } from '../../base/mapper.interface';
import { Admin, AdminId } from '../../../../../core/domain/components/admin/admin.entity';
import { AdminFactory } from '../../../../../core/domain/components/admin/admin.factory';
import { HashedPasswordVO } from '../../../../../core/domain/common/vos/hashed-password.vo';
import { AdminDTO } from '../../../../../core/app/components/admin/repository/dtos/admin.dto';

class AdminMapper
  implements WriteMapper<AdminDocument, Admin>, ReadMapper<AdminDocument, AdminDTO>
{
  toDocument(entity: Admin): AdminDocument {
    return {
      _id: new Types.ObjectId(entity.getId()),
      username: entity.getUsername().value,
      password: entity.getPassword().value,
      name: entity.getName().value,
      role: entity.getRole().value,
      isBlocked: entity.getBlockedStatus(),
      createdAt: entity.getCreatedAt(),
      updatedAt: entity.getUpdatedAt(),
    };
  }

  toEntity(doc: AdminDocument): Admin {
    return AdminFactory.create({
      id: doc._id.toHexString() as AdminId,
      username: doc.username,
      password: HashedPasswordVO.create(doc.password),
      name: doc.name,
      isBlocked: doc.isBlocked,
      role: doc.role,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }

  toDTO(doc: AdminDocument): AdminDTO {
    return new AdminDTO(
      doc._id.toHexString(),
      doc.username,
      doc.name,
      doc.isBlocked,
      doc.role,
      doc.createdAt,
      doc.updatedAt,
    );
  }

  toPopulatedDTO(doc: AdminDocument): AdminDTO {
    return this.toDTO(doc);
  }
}

export default new AdminMapper();
