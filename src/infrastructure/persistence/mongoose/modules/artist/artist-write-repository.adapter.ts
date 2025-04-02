import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Artist as ArtistDocument } from './artist.document';
import { BaseWriteRepository } from '../../base/base-write-repository.abstract';
import ArtistMapper from './artist.mapper';
import { Artist, ArtistId } from '../../../../../core/domain/components/artist/artist.entity';
import { ArtistFilter } from '../../../../../core/domain/components/artist/repository/artist.filter';
import { ArtistWriteRepository } from '../../../../../core/domain/components/artist/repository/artist-write-repository.port';

@Injectable()
export class ArtistWriteRepositoryAdapter
  extends BaseWriteRepository<ArtistDocument, Artist, ArtistId, ArtistFilter>
  implements ArtistWriteRepository
{
  constructor(
    @InjectModel(ArtistDocument.name)
    private readonly _userModel: Model<ArtistDocument>,
  ) {
    super(_userModel, ArtistMapper);
  }
}
