import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotFoundException } from '@core/shared/exceptions';
import { AlbumReadRepository as AlbumReadRepositoryPort } from '@core/domain/components/album/repository/album-read-repository.port';
import { AlbumWithArtistsDTO } from '@core/domain/components/album/repository/dtos/album-with-artists.dto';
import { OffsetLimitPaginationDTO } from '@core/shared/dtos/offset-limit-pagination/offset-limit-pagination-payload.dto';
import { OffsetLimitPaginationResponseDTO } from '@core/shared/dtos/offset-limit-pagination/offset-limit-pagination-response.dto';
import AlbumMapper from './album.mapper';
import { AlbumDocument, AlbumWithArtists, AlbumWithArtistsDocument } from './types';
import { POPULATE_OPTIONS } from './constants';
import { Album } from './album.schema';

@Injectable()
export class AlbumReadRepository implements AlbumReadRepositoryPort {
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
