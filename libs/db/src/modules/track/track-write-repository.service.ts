import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Domain } from '@api.mabell/core';
import { Track } from './track.schema';
import TrackMapper from './track.mapper';
import { TrackDocument } from './types';

@Injectable()
export class TrackWriteRepository implements Domain.Track.TrackWriteRepository {
  constructor(
    @InjectModel(Track.name)
    private readonly _trackModel: Model<TrackDocument>,
  ) {}

  async save(entity: Domain.Track.Track) {
    const mappedDoc = TrackMapper.toPersistenceEntity(entity);

    await this._trackModel.findByIdAndUpdate({ _id: mappedDoc._id }, mappedDoc, {
      new: true,
      upsert: true,
      runValidators: true,
    });
  }

  async saveMany(entities: Domain.Track.Track[]) {
    const mappedDocs = entities.map((e) => TrackMapper.toPersistenceEntity(e));

    await this._trackModel.bulkWrite(
      mappedDocs.map((doc) => ({
        updateOne: {
          filter: { _id: doc._id },
          update: { $set: doc },
          upsert: true,
        },
      })),
    );
  }

  async deleteById(trackId: string) {
    const result = await this._trackModel.deleteOne({ _id: trackId }).exec();

    return result.deletedCount ? (trackId as Domain.Track.TrackId) : null;
  }

  async deleteByArtistId(artistId: string) {
    const foundDocs = await this._trackModel.find({ artists: artistId }, '_id').lean().exec();

    await this._trackModel.deleteMany({ artists: artistId }).exec();

    return {
      deletedIds: foundDocs.map((doc) => doc._id.toHexString() as Domain.Track.TrackId),
      total: foundDocs.length,
    };
  }

  async deleteByAlbumId(albumId: string) {
    const foundDocs = await this._trackModel.find({ album: albumId }, '_id').lean().exec();

    await this._trackModel.deleteMany({ album: albumId }).exec();

    return {
      deletedIds: foundDocs.map((doc) => doc._id.toHexString() as Domain.Track.TrackId),
      total: foundDocs.length,
    };
  }

  async deleteByFeatArtistId(artistId: string) {
    await this._trackModel
      .updateMany(
        { featArtists: artistId },
        {
          $pull: { featArtists: artistId },
        },
      )
      .exec();
  }

  async findById(trackId: string) {
    const foundDoc = await this._trackModel.findOne({ _id: trackId }).lean<Track>().exec();

    return foundDoc ? TrackMapper.toDomainEntity(foundDoc) : null;
  }

  async findByAlbumId(albumId: string) {
    const foundDocs = await this._trackModel.find({ album: albumId }).lean<Track[]>().exec();

    return {
      items: foundDocs.map((doc) => TrackMapper.toDomainEntity(doc)),
      itemIds: foundDocs.map((doc) => doc._id.toHexString() as Domain.Track.TrackId),
      total: foundDocs.length,
    };
  }

  async findByFeatArtistId(artistId: string) {
    const foundDocs = await this._trackModel.find({ featArtists: artistId }).lean<Track[]>().exec();

    return {
      items: foundDocs.map((doc) => TrackMapper.toDomainEntity(doc)),
      itemIds: foundDocs.map((doc) => doc._id.toHexString() as Domain.Track.TrackId),
      total: foundDocs.length,
    };
  }

  async existsById(trackId: string) {
    const foundDoc = await this._trackModel.exists({ _id: trackId });

    return foundDoc ? (foundDoc._id.toHexString() as Domain.Track.TrackId) : null;
  }

  async getNextTrackIndexByAlbumId(albumId: string) {
    let docsTotal = await this._trackModel.countDocuments({ album: albumId });

    return docsTotal === 0 ? docsTotal : docsTotal++;
  }
}
