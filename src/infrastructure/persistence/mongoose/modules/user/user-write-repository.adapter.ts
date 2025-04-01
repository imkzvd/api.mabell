import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User as UserDocument } from './user.document';
import { BaseWriteRepository } from '../../base/base-write-repository.abstract';
import UserMapper from './user.mapper';
import { User, UserId } from '../../../../../core/domain/components/user/user.entity';
import { UserFilter } from '../../../../../core/domain/components/user/repository/user.filter';
import { UserWriteRepository } from '../../../../../core/domain/components/user/repository/user-write-repository.port';

@Injectable()
export class UserWriteRepositoryAdapter
  extends BaseWriteRepository<UserDocument, User, UserId, UserFilter>
  implements UserWriteRepository
{
  constructor(
    @InjectModel(UserDocument.name)
    private readonly _userModel: Model<UserDocument>,
  ) {
    super(_userModel, UserMapper);
  }
}
