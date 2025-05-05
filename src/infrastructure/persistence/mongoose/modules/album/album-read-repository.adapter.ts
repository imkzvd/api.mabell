import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AlbumReadRepository } from '../../../../../core/app/components/album/ports/repository/album-read-repository.port';
import AlbumMapper from './album.mapper';
import { AlbumDocument, AlbumWithArtists, AlbumWithArtistsDocument } from './types';
import { AlbumWithArtistsDTO } from '../../../../../core/app/components/album/ports/repository/dtos/album-with-artists.dto';
import { OffsetLimitPaginationDTO } from '../../../../../core/app/common/dtos/offset-limit-pagination/offset-limit-pagination-payload.dto';
import { OffsetLimitPaginationResponseDTO } from '../../../../../core/app/common/dtos/offset-limit-pagination/offset-limit-pagination-response.dto';
import { POPULATE_OPTIONS } from './constants';
import { Album } from './album.schema';
import { NotFoundException } from '../../../../../core/shared/exceptions';

@Injectable()
export class AlbumReadRepositoryAdapter implements AlbumReadRepository {
  constructor(
    @InjectModel(Album.name)
    private readonly _albumModel: Model<AlbumDocument>,
  ) {}

  async findById(id: string, options?: { isPublic: boolean }): Promise<AlbumWithArtistsDTO | null> {
    const foundDoc = await this._albumModel
      .findOne(
        {
          _id: id,
          ...(options?.isPublic !== undefined && { isPublic: options.isPublic }),
        },
        null,
      )
      .populate<AlbumWithArtistsDocument>(POPULATE_OPTIONS)
      .lean<AlbumWithArtists>()
      .exec();

    if (!foundDoc) {
      return null;
    }

    return AlbumMapper.toDTO(foundDoc);
  }

  async findByArtistId(
    artistId: string,
    options?: Partial<{
      isPublic: boolean;
      pagination: OffsetLimitPaginationDTO;
    }>,
  ): Promise<OffsetLimitPaginationResponseDTO<AlbumWithArtistsDTO>> {
    const filter = {
      artists: artistId,
      ...(options?.isPublic !== undefined && { isPublic: options.isPublic }),
    };
    const docsTotal = await this._albumModel.countDocuments(filter);
    const foundDocs = await this._albumModel
      .find(filter, null)
      .limit(options?.pagination?.limit ?? 50)
      .skip(options?.pagination?.offset ?? 0)
      .populate<AlbumWithArtistsDocument[]>(POPULATE_OPTIONS)
      .lean<AlbumWithArtists[]>()
      .exec();

    return new OffsetLimitPaginationResponseDTO(
      foundDocs.map((doc) => AlbumMapper.toDTO(doc)),
      docsTotal,
      options?.pagination?.limit ?? 50,
      options?.pagination?.offset ?? 0,
      (options?.pagination?.limit ?? 50) + (options?.pagination?.offset ?? 0) < docsTotal,
    );
  }

  async getPublicStatus(id: string): Promise<boolean> {
    const foundDoc = await this._albumModel
      .findById(id, 'isPublic')
      .lean<{ isPublic: boolean }>()
      .exec();

    if (!foundDoc) {
      throw new NotFoundException('Artist not found');
    }

    return foundDoc.isPublic;
  }
}
