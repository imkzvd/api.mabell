import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin as AdminDocument } from './admin.document';
import AdminMapper from './admin.mapper';
import { BaseWriteRepository } from '../../base/base-write-repository.abstract';
import { Admin, AdminId } from '../../../../../core/domain/components/admin/admin.entity';
import { AdminFilter } from '../../../../../core/domain/components/admin/repository/admin.filter';
import { AdminWriteRepository } from '../../../../../core/domain/components/admin/repository/admin-write-repository.port';

@Injectable()
export class AdminWriteRepositoryAdapter
  extends BaseWriteRepository<AdminDocument, Admin, AdminId, AdminFilter>
  implements AdminWriteRepository
{
  constructor(
    @InjectModel(AdminDocument.name)
    private readonly _adminModel: Model<AdminDocument>,
  ) {
    super(_adminModel, AdminMapper);
  }
}
