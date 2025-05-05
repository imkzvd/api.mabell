import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import TrackMapper from './track.mapper';
import { Track } from './track.schema';
import { TrackWithAlbumAndArtistsDocument, TrackWithAlbumAndArtists } from './types';
import { TrackReadRepository } from '../../../../../core/app/components/track/ports/repository/track-read-repository.port';

import { TrackWithAlbumAndArtistsDTO } from '../../../../../core/app/components/track/ports/repository/dtos/track-with-album-and-artists.dto';
import { POPULATE_OPTIONS } from './constants';
import { OffsetLimitPaginationDTO } from '../../../../../core/app/common/dtos/offset-limit-pagination/offset-limit-pagination-payload.dto';
import { OffsetLimitPaginationResponseDTO } from '../../../../../core/app/common/dtos/offset-limit-pagination/offset-limit-pagination-response.dto';

@Injectable()
export class TrackReadRepositoryAdapter implements TrackReadRepository {
  constructor(
    @InjectModel(Track.name)
    private readonly _trackModel: Model<Track>,
  ) {}

  async findById(
    id: string,
    options?: Partial<{ isPublic: boolean }>,
  ): Promise<TrackWithAlbumAndArtistsDTO | null> {
    const foundDoc = await this._trackModel
      .findOne(
        {
          _id: id,
          ...(options?.isPublic !== undefined && { isPublic: options.isPublic }),
        },
        null,
      )
      .populate<TrackWithAlbumAndArtistsDocument[]>(POPULATE_OPTIONS)
      .lean<TrackWithAlbumAndArtists>()
      .exec();

    if (!foundDoc) {
      return null;
    }

    console.log(foundDoc);

    return TrackMapper.toDTO(foundDoc);
  }

  async findByIds(
    ids: string[],
    options?: Partial<{ isPublic: boolean }>,
  ): Promise<{
    items: TrackWithAlbumAndArtistsDTO[];
    foundIds: string[];
    total: number;
    missingIds: string[];
  }> {
    const foundDocs = await this._trackModel
      .find(
        { _id: ids, ...(options?.isPublic !== undefined && { isPublic: options.isPublic }) },
        null,
      )
      .populate<TrackWithAlbumAndArtistsDocument[]>(POPULATE_OPTIONS)
      .lean<TrackWithAlbumAndArtists[]>()
      .exec();

    // TODO: Refactoring
    const docsMap: Map<string, TrackWithAlbumAndArtists> = new Map(
      foundDocs.map((doc) => [doc._id.toHexString(), doc]),
    );
    const sortedDocs = ids.map((id) => docsMap.get(id)!);
    const foundDocIds = sortedDocs.map((doc) => doc._id.toHexString());
    const missingDocIds = ids.filter((id) => !foundDocIds.includes(id));

    return {
      items: sortedDocs.map((doc) => TrackMapper.toDTO(doc)),
      foundIds: foundDocIds,
      total: foundDocIds.length,
      missingIds: missingDocIds,
    };
  }

  async findByAlbumId(
    albumId: string,
    options?: Partial<{
      isPublic: boolean;
      pagination: OffsetLimitPaginationDTO;
    }>,
  ): Promise<OffsetLimitPaginationResponseDTO<TrackWithAlbumAndArtistsDTO>> {
    const filter = {
      album: albumId,
      ...(options?.isPublic !== undefined && { isPublic: options.isPublic }),
    };
    const docsTotal = await this._trackModel.countDocuments(filter);
    const foundDocs = await this._trackModel
      .find(filter, null)
      .limit(options?.pagination?.limit ?? 50)
      .skip(options?.pagination?.offset ?? 0)
      .populate<TrackWithAlbumAndArtistsDocument[]>(POPULATE_OPTIONS)
      .lean<TrackWithAlbumAndArtists[]>()
      .exec();

    return new OffsetLimitPaginationResponseDTO(
      foundDocs.map((doc) => TrackMapper.toDTO(doc)),
      docsTotal,
      options?.pagination?.limit ?? 50,
      options?.pagination?.offset ?? 0,
      (options?.pagination?.limit ?? 50) + (options?.pagination?.offset ?? 0) < docsTotal,
    );
  }

  async findByArtistId(
    artistId: string,
    options?: Partial<{
      isPublic: boolean;
      pagination: OffsetLimitPaginationDTO;
    }>,
  ): Promise<OffsetLimitPaginationResponseDTO<TrackWithAlbumAndArtistsDTO>> {
    const filter = {
      $or: [{ artists: artistId }, { featArtists: artistId }],
      ...(options?.isPublic !== undefined && { isPublic: options.isPublic }),
    };
    const docsTotal = await this._trackModel.countDocuments(filter);
    const foundDocs = await this._trackModel
      .find(filter, null)
      .populate<TrackWithAlbumAndArtistsDocument[]>(POPULATE_OPTIONS)
      .lean<TrackWithAlbumAndArtists[]>()
      .exec();

    return new OffsetLimitPaginationResponseDTO(
      foundDocs.map((doc) => TrackMapper.toDTO(doc)),
      docsTotal,
      options?.pagination?.limit ?? 50,
      options?.pagination?.offset ?? 0,
      (options?.pagination?.limit ?? 50) + (options?.pagination?.offset ?? 0) < docsTotal,
    );
  }
}
