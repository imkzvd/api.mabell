import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Artist as ArtistDocument } from './artist.document';
import ArtistMapper from './artist.mapper';
import { BaseReadRepository } from '../../base/base-read-repository.abstract';
import { ArtistFilter } from '../../../../../core/app/components/artist/ports/repository/artist.filter';
import { ArtistReadRepository } from '../../../../../core/app/components/artist/ports/repository/artist-read-repository.port';
import { ArtistDTO } from '../../../../../core/app/components/artist/ports/repository/dtos/artist.dto';

@Injectable()
export class ArtistReadRepositoryAdapter
  extends BaseReadRepository<ArtistDocument, ArtistDTO, ArtistFilter>
  implements ArtistReadRepository
{
  constructor(
    @InjectModel(ArtistDocument.name)
    private readonly _userModel: Model<ArtistDocument>,
  ) {
    super(_userModel, ArtistMapper);
  }
}
