import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin as AdminDocument } from './admin.document';
import AdminMapper from './admin.mapper';
import { BaseReadRepository } from '../../base/base-read-repository.abstract';
import { AdminDTO } from '../../../../../core/app/components/admin/dtos/admin.dto';
import { SimplifiedAdminDTO } from '../../../../../core/app/components/admin/dtos/simplified-admin.dto';
import { AdminFilter } from '../../../../../core/app/components/admin/repository/admin.filter';
import { AdminReadRepository } from '../../../../../core/app/components/admin/repository/admin-read-repository.port';

@Injectable()
export class AdminReadRepositoryAdapter
  extends BaseReadRepository<AdminDocument, AdminDTO, SimplifiedAdminDTO, AdminFilter>
  implements AdminReadRepository
{
  constructor(
    @InjectModel(AdminDocument.name)
    private readonly _adminModel: Model<AdminDocument>,
  ) {
    super(_adminModel, AdminMapper);
  }
}
