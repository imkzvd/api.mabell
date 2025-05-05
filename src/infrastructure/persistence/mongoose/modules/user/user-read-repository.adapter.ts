import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import UserMapper from './user.mapper';
import { UserReadRepository } from '../../../../../core/app/components/user/ports/repository/user-read-repository.port';
import { UserDTO } from '../../../../../core/app/components/user/ports/repository/dtos/user.dto';
import { User } from './user.schema';
import { UserDocument } from './types';

@Injectable()
export class UserReadRepositoryAdapter implements UserReadRepository {
  constructor(
    @InjectModel(User.name)
    private readonly _userModel: Model<UserDocument>,
  ) {}

  async findById(id: string, options?: Partial<{ isPublic: boolean }>): Promise<UserDTO | null> {
    const foundDoc = await this._userModel
      .findOne(
        {
          _id: id,
          ...(options?.isPublic !== undefined && { isPublic: options.isPublic }),
        },
        null,
      )
      .lean<User>()
      .exec();

    if (!foundDoc) {
      return null;
    }

    return UserMapper.toDTO(foundDoc);
  }
}
