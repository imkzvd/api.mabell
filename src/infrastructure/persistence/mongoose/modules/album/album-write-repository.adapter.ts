import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Album as AlbumDocument } from './album.document';
import { BaseWriteRepository } from '../../base/base-write-repository.abstract';
import { Album, AlbumId } from '../../../../../core/domain/components/album/album.entity';
import { AlbumFilter } from '../../../../../core/domain/components/album/repository/album.filter';
import { AlbumWriteRepository } from '../../../../../core/domain/components/album/repository/album-write-repository.port';
import AlbumMapper from './album.mapper';

@Injectable()
export class AlbumWriteRepositoryAdapter
  extends BaseWriteRepository<AlbumDocument, Album, AlbumId, AlbumFilter>
  implements AlbumWriteRepository
{
  constructor(
    @InjectModel(AlbumDocument.name)
    private readonly _userModel: Model<AlbumDocument>,
  ) {
    super(_userModel, AlbumMapper);
  }
}
