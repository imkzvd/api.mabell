import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Domain, App, Shared } from '@api.mabell/core';
import TrackMapper from './track.mapper';
import { Track } from './track.schema';
import { TrackWithAlbumAndArtistsDocument, TrackWithAlbumAndArtists } from './types';
import { POPULATE_OPTIONS } from './constants';

@Injectable()
export class TrackReadRepository implements App.Ports.TrackReadRepository {
  constructor(
    @InjectModel(Track.name)
    private readonly _trackModel: Model<Track>,
  ) {}

  async findById(trackId: string, options?: Partial<{ isPublic: boolean }>) {
    const foundDoc = await this._trackModel
      .findOne(
        {
          _id: trackId,
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

    return TrackMapper.toDTO(foundDoc);
  }

  async findByIds(trackIds: string[], options?: Partial<{ isPublic: boolean }>) {
    const foundDocs = await this._trackModel
      .find(
        { _id: trackIds, ...(options?.isPublic !== undefined && { isPublic: options.isPublic }) },
        null,
      )
      .populate<TrackWithAlbumAndArtistsDocument[]>(POPULATE_OPTIONS)
      .lean<TrackWithAlbumAndArtists[]>()
      .exec();

    const foundDocsMap: Map<string, TrackWithAlbumAndArtists> = new Map(
      foundDocs.map((doc) => [doc._id.toHexString(), doc]),
    );
    const itemsResult: (App.DTOs.TrackWithAlbumDTO | null)[] = trackIds.map((id) => {
      const doc = foundDocsMap.get(id);

      return doc ? TrackMapper.toDTO(doc) : null;
    });

    return {
      items: itemsResult,
      foundItems: itemsResult.filter((i) => i !== null),
      foundIds: [...foundDocsMap.keys()] as Domain.Track.TrackId[],
      total: foundDocsMap.size,
      missingIds: trackIds.filter((id) => !foundDocsMap.has(id)),
    };
  }

  async findByAlbumId(
    albumId: string,
    options?: Partial<{
      isPublic: boolean;
      pagination: Shared.DTOs.OffsetLimitPaginationDTO;
    }>,
  ) {
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

    return new App.DTOs.TracksDTO(
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
      pagination: Shared.DTOs.OffsetLimitPaginationDTO;
    }>,
  ) {
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

    return new App.DTOs.TracksDTO(
      foundDocs.map((doc) => TrackMapper.toDTO(doc)),
      docsTotal,
      options?.pagination?.limit ?? 50,
      options?.pagination?.offset ?? 0,
      (options?.pagination?.limit ?? 50) + (options?.pagination?.offset ?? 0) < docsTotal,
    );
  }
}
