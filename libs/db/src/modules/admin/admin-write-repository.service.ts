import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Domain } from '@api.mabell/core';
import { Admin } from './admin.schema';
import AdminMapper from './admin.mapper';
import { AdminDocument } from './types';

@Injectable()
export class AdminWriteRepository implements Domain.Admin.AdminWriteRepository {
  constructor(
    @InjectModel(Admin.name)
    private readonly _adminModel: Model<AdminDocument>,
  ) {}

  async save(entity: Domain.Admin.Admin) {
    const mappedDoc = AdminMapper.toPersistenceEntity(entity);

    await this._adminModel.findByIdAndUpdate({ _id: mappedDoc._id }, mappedDoc, {
      new: true,
      upsert: true,
      runValidators: true,
    });
  }

  async deleteById(adminId: string) {
    const result = await this._adminModel.deleteOne({ _id: adminId }).exec();

    return result.deletedCount ? (adminId as Domain.Admin.AdminId) : null;
  }

  async findById(adminId: string) {
    const foundDoc = await this._adminModel.findOne({ _id: adminId }).lean<Admin>().exec();

    return foundDoc ? AdminMapper.toDomainEntity(foundDoc) : null;
  }

  async existsByUsername(username: string) {
    const foundDoc = await this._adminModel.exists({ username });

    return foundDoc ? (foundDoc._id.toHexString() as Domain.Admin.AdminId) : null;
  }

  async getNextIndex(): Promise<number> {
    return (await this._adminModel.countDocuments()) + 1;
  }
}
