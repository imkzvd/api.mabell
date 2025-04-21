import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseReadRepository } from '../../base/base-read-repository.abstract';
import { Album as AlbumDocument } from './album.document';
import { AlbumReadRepository } from '../../../../../core/app/components/album/ports/repository/album-read-repository.port';
import { AlbumFilter } from '../../../../../core/app/components/album/ports/repository/album.filter';
import AlbumMapper from './album.mapper';
import { AlbumDTO } from '../../../../../core/app/components/album/ports/repository/dtos/album.dto';
import { AlbumWithArtistsDocument } from './types';
import { AlbumWithArtistsDTO } from '../../../../../core/app/components/album/ports/repository/dtos/album-with-artists.dto';

@Injectable()
export class AlbumReadRepositoryAdapter
  extends BaseReadRepository<
    AlbumDocument,
    AlbumDTO,
    AlbumFilter,
    AlbumWithArtistsDocument,
    AlbumWithArtistsDTO
  >
  implements AlbumReadRepository
{
  constructor(
    @InjectModel(AlbumDocument.name)
    private readonly _userModel: Model<AlbumDocument>,
  ) {
    super(_userModel, AlbumMapper, [{ path: 'artists' }]);
  }
}
