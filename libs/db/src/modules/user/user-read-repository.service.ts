import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { App } from '@api.mabell/core';
import UserMapper from './user.mapper';
import { User } from './user.schema';
import { UserDocument } from './types';

@Injectable()
export class UserReadRepository implements App.Ports.UserReadRepository {
  constructor(
    @InjectModel(User.name)
    private readonly _userModel: Model<UserDocument>,
  ) {}

  async findById(userId: string, options?: Partial<{ isPublic: boolean }>) {
    const foundDoc = await this._userModel
      .findOne(
        {
          _id: userId,
          ...(options?.isPublic !== undefined && { isPublic: options.isPublic }),
        },
        null,
      )
      .lean<User>()
      .exec();

    return foundDoc ? UserMapper.toDTO(foundDoc) : null;
  }

  async findByUsername(username: string) {
    const foundDoc = await this._userModel.findOne({ username }).lean<User>().exec();

    return foundDoc ? UserMapper.toDTO(foundDoc) : null;
  }
}
