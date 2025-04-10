import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseReadRepository } from '../../base/base-read-repository.abstract';
import { Album as AlbumDocument } from './album.document';
import { AlbumPopulatedDocument } from './types';
import { AlbumReadRepository } from '../../../../../core/app/components/album/ports/repository/album-read-repository.port';
import { AlbumDTO } from '../../../../../core/app/components/album/dtos/album.dto';
import { SimplifiedAlbumDTO } from '../../../../../core/app/components/album/dtos/simplified-album.dto';
import { AlbumFilter } from '../../../../../core/app/components/album/ports/repository/album.filter';
import AlbumMapper from './album.mapper';

@Injectable()
export class AlbumReadRepositoryAdapter
  extends BaseReadRepository<AlbumPopulatedDocument, AlbumDTO, SimplifiedAlbumDTO, AlbumFilter>
  implements AlbumReadRepository
{
  constructor(
    @InjectModel(AlbumDocument.name)
    private readonly _userModel: Model<AlbumPopulatedDocument>,
  ) {
    super(_userModel, AlbumMapper, [{ path: 'artists' }]);
  }
}
