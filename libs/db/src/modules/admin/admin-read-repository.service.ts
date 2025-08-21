import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { Model } from 'mongoose';
import { App, Shared } from '@api.mabell/core';
import { Admin } from './admin.schema';
import AdminMapper from './admin.mapper';
import { AdminDocument } from './types';

@Injectable()
export class AdminReadRepository implements App.Ports.AdminReadRepository {
  constructor(
    @InjectModel(Admin.name)
    private readonly _adminModel: Model<AdminDocument>,
  ) {}

  async findById(adminId: string) {
    const foundDoc = await this._adminModel.findById(adminId, null).lean<Admin>().exec();

    if (!foundDoc) {
      return null;
    }

    return AdminMapper.toDTO(foundDoc);
  }

  async findByUsername(username: string) {
    const filter = { username };
    const foundDoc = await this._adminModel.findOne(filter).lean<Admin>().exec();

    if (!foundDoc) {
      return null;
    }

    return AdminMapper.toDTO(foundDoc);
  }

  async find(
    options?: Partial<{
      pagination: Shared.DTOs.OffsetLimitPaginationDTO;
    }>,
  ) {
    const docsTotal = await this._adminModel.countDocuments();

    const foundDocs = await this._adminModel
      .find({}, null, {
        limit: options?.pagination?.limit ?? 50,
        skip: options?.pagination?.offset ?? 0,
        sort: { createdAt: -1 },
      })
      .lean<Admin[]>()
      .exec();

    return new App.DTOs.AdminsDTO(
      foundDocs.map((doc) => AdminMapper.toDTO(doc)),
      docsTotal,
      options?.pagination?.limit || 50,
      options?.pagination?.offset || 0,
      (options?.pagination?.limit || 50) + (options?.pagination?.offset || 0) < docsTotal,
    );
  }
}
