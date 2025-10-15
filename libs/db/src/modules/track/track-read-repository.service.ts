import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Domain, App, Shared } from '@api.mabell/core';
import TrackMapper from './track.mapper';
import { Track } from './track.schema';
import { TrackWithAlbumAndArtistsDocument, TrackWithAlbumAndArtists } from './types';

@Injectable()
export class TrackReadRepository implements App.Ports.TrackReadRepository {
  constructor(
    @InjectModel(Track.name)
    private readonly _trackModel: Model<Track>,
  ) {}

  async findById(trackId: string, options?: Partial<{ isPublic: boolean }>) {
    const [foundDoc] = await this._trackModel
      .aggregate<TrackWithAlbumAndArtists>([
        {
          $match: {
            _id: new Types.ObjectId(trackId),
            ...(options?.isPublic !== undefined && { isPublic: options.isPublic }),
          },
        },
        {
          $lookup: {
            from: 'albums',
            localField: 'album',
            foreignField: '_id',
            as: 'album',
          },
        },
        {
          $unwind: { path: '$album' },
        },
        {
          $lookup: {
            from: 'artists',
            localField: 'album.artists',
            foreignField: '_id',
            as: 'album.artists',
            let: { artistIds: '$artists' },
            pipeline: [
              {
                $set: {
                  index: {
                    $indexOfArray: ['$$artistIds', '$_id'],
                  },
                },
              },
              { $sort: { index: 1 } },
              { $unset: 'index' },
            ],
          },
        },
        {
          $lookup: {
            from: 'artists',
            localField: 'featArtists',
            foreignField: '_id',
            as: 'featArtists',
            let: { featArtistIds: '$featArtists' },
            pipeline: [
              {
                $match: {
                  ...(options?.isPublic !== undefined && { isPublic: options.isPublic }),
                },
              },
              {
                $set: {
                  index: {
                    $indexOfArray: ['$$featArtistIds', '$_id'],
                  },
                },
              },
              { $sort: { index: 1 } },
              { $unset: 'index' },
            ],
          },
        },
        {
          $match: {
            ...(options?.isPublic !== undefined && {
              'album.isPublic': { $ne: !options.isPublic },
            }),
          },
        },
        {
          $match: {
            ...(options?.isPublic !== undefined && {
              'album.artists.isPublic': { $ne: !options.isPublic },
            }),
          },
        },
      ])
      .exec();

    return foundDoc ? TrackMapper.toDTO(foundDoc) : null;
  }

  async findByIds(trackIds: string[], options?: Partial<{ isPublic: boolean }>) {
    const foundDocs = await this._trackModel
      .aggregate<TrackWithAlbumAndArtists>([
        {
          $match: {
            _id: {
              $in: trackIds.map((i) => new Types.ObjectId(i)),
            },
            ...(options?.isPublic !== undefined && { isPublic: options.isPublic }),
          },
        },
        {
          $lookup: {
            from: 'albums',
            localField: 'album',
            foreignField: '_id',
            as: 'album',
          },
        },
        { $unwind: { path: '$album' } },
        {
          $lookup: {
            from: 'artists',
            localField: 'album.artists',
            foreignField: '_id',
            as: 'album.artists',
            let: { artistIds: '$artists' },
            pipeline: [
              {
                $set: {
                  index: {
                    $indexOfArray: ['$$artistIds', '$_id'],
                  },
                },
              },
              { $sort: { index: 1 } },
              { $unset: 'index' },
            ],
          },
        },
        {
          $lookup: {
            from: 'artists',
            localField: 'featArtists',
            foreignField: '_id',
            as: 'featArtists',
            let: { featArtistIds: '$featArtists' },
            pipeline: [
              {
                $match: {
                  ...(options?.isPublic !== undefined && { isPublic: options.isPublic }),
                },
              },
              {
                $set: {
                  index: {
                    $indexOfArray: ['$$featArtistIds', '$_id'],
                  },
                },
              },
              { $sort: { index: 1 } },
              { $unset: 'index' },
            ],
          },
        },
        {
          $match: {
            ...(options?.isPublic !== undefined && {
              'album.isPublic': { $ne: !options.isPublic },
            }),
          },
        },
        {
          $match: {
            ...(options?.isPublic !== undefined && {
              'album.artists.isPublic': { $ne: !options.isPublic },
            }),
          },
        },
      ])
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
    const [result] = await this._trackModel
      .aggregate<{
        docs: TrackWithAlbumAndArtistsDocument[];
        docsTotal: number;
      }>([
        {
          $match: {
            album: new Types.ObjectId(albumId),
            ...(options?.isPublic !== undefined && { isPublic: options.isPublic }),
          },
        },
        {
          $lookup: {
            from: 'albums',
            localField: 'album',
            foreignField: '_id',
            as: 'album',
          },
        },
        {
          $unwind: { path: '$album' },
        },
        {
          $lookup: {
            from: 'artists',
            localField: 'album.artists',
            foreignField: '_id',
            as: 'album.artists',
            let: { artistIds: '$artists' },
            pipeline: [
              {
                $set: {
                  index: {
                    $indexOfArray: ['$$artistIds', '$_id'],
                  },
                },
              },
              { $sort: { index: 1 } },
              { $unset: 'index' },
            ],
          },
        },
        {
          $lookup: {
            from: 'artists',
            localField: 'featArtists',
            foreignField: '_id',
            as: 'featArtists',
            let: { featArtistIds: '$featArtists' },
            pipeline: [
              {
                $match: {
                  ...(options?.isPublic !== undefined && { isPublic: options.isPublic }),
                },
              },
              {
                $set: {
                  index: {
                    $indexOfArray: ['$$featArtistIds', '$_id'],
                  },
                },
              },
              { $sort: { index: 1 } },
              { $unset: 'index' },
            ],
          },
        },
        {
          $match: {
            ...(options?.isPublic !== undefined && {
              'album.isPublic': { $ne: !options.isPublic },
            }),
          },
        },
        {
          $match: {
            ...(options?.isPublic !== undefined && {
              'album.artists.isPublic': { $ne: !options.isPublic },
            }),
          },
        },
        {
          $facet: {
            docsTotal: [{ $count: 'count' }],
            docs: [
              { $sort: { trackNumber: 1 } },
              { $skip: options?.pagination?.offset ?? 0 },
              { $limit: options?.pagination?.limit ?? 50 },
            ],
          },
        },
        {
          $project: {
            docsTotal: { $arrayElemAt: ['$docsTotal.count', 0] },
            docs: 1,
          },
        },
      ])
      .exec();

    return new App.DTOs.TracksDTO(
      result.docs.map((doc) => TrackMapper.toDTO(doc)),
      result.docsTotal,
      options?.pagination?.offset,
      options?.pagination?.limit,
    );
  }

  async findByArtistId(
    artistId: string,
    options?: Partial<{
      isPublic: boolean;
      pagination: Shared.DTOs.OffsetLimitPaginationDTO;
    }>,
  ) {
    const [result] = await this._trackModel
      .aggregate<{
        docs: TrackWithAlbumAndArtistsDocument[];
        docsTotal: number;
      }>([
        {
          $match: {
            $or: [
              { artists: new Types.ObjectId(artistId) },
              { featArtists: new Types.ObjectId(artistId) },
            ],
            ...(options?.isPublic !== undefined && { isPublic: options.isPublic }),
          },
        },
        {
          $lookup: {
            from: 'albums',
            localField: 'album',
            foreignField: '_id',
            as: 'album',
          },
        },
        {
          $unwind: { path: '$album' },
        },
        {
          $lookup: {
            from: 'artists',
            localField: 'album.artists',
            foreignField: '_id',
            as: 'album.artists',
            let: { artistIds: '$artists' },
            pipeline: [
              {
                $set: {
                  index: {
                    $indexOfArray: ['$$artistIds', '$_id'],
                  },
                },
              },
              { $sort: { index: 1 } },
              { $unset: 'index' },
            ],
          },
        },
        {
          $lookup: {
            from: 'artists',
            localField: 'featArtists',
            foreignField: '_id',
            as: 'featArtists',
            let: { featArtistIds: '$featArtists' },
            pipeline: [
              {
                $match: {
                  ...(options?.isPublic !== undefined && { isPublic: options.isPublic }),
                },
              },
              {
                $set: {
                  index: {
                    $indexOfArray: ['$$featArtistIds', '$_id'],
                  },
                },
              },
              { $sort: { index: 1 } },
              { $unset: 'index' },
            ],
          },
        },
        {
          $match: {
            ...(options?.isPublic !== undefined && {
              'album.isPublic': { $ne: !options.isPublic },
            }),
          },
        },
        {
          $match: {
            ...(options?.isPublic !== undefined && {
              'album.artists.isPublic': { $ne: !options.isPublic },
            }),
          },
        },
        {
          $facet: {
            docsTotal: [{ $count: 'count' }],
            docs: [
              { $sort: { createdAt: -1 } },
              { $skip: options?.pagination?.offset ?? 0 },
              { $limit: options?.pagination?.limit ?? 50 },
            ],
          },
        },
        {
          $project: {
            docsTotal: { $arrayElemAt: ['$docsTotal.count', 0] },
            docs: 1,
          },
        },
      ])
      .exec();

    return new App.DTOs.TracksDTO(
      result.docs.map((doc) => TrackMapper.toDTO(doc)),
      result.docsTotal,
      options?.pagination?.offset,
      options?.pagination?.limit,
    );
  }
}
