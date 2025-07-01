import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TrackWriteRepository as TrackWriteRepositoryPort } from '@core/domain/components/track/repository/track-write-repository.port';
import { Track as DomainTrack } from '@core/domain/components/track/track.entity';
import { TrackId } from '@core/domain/components/track/types';
import { Track } from './track.schema';
import TrackMapper from './track.mapper';
import { TrackDocument } from './types';

@Injectable()
export class TrackWriteRepository implements TrackWriteRepositoryPort {
  constructor(
    @InjectModel(Track.name)
    private readonly _trackModel: Model<TrackDocument>,
  ) {}

  async save(entity: DomainTrack): Promise<void> {
    const mappedDoc = TrackMapper.toPersistenceEntity(entity);

    return this._trackModel.findByIdAndUpdate({ _id: mappedDoc._id }, mappedDoc, {
      new: true,
      upsert: true,
      runValidators: true,
    });
  }

  async saveMany(entities: DomainTrack[]): Promise<void> {
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

  async deleteById(id: string): Promise<TrackId | null> {
    const result = await this._trackModel.deleteOne({ _id: id }).exec();

    return result.deletedCount ? (id as TrackId) : null;
  }

  async deleteByArtistId(artistId: string): Promise<{
    deletedIds: TrackId[];
    total: number;
  }> {
    const foundDocs = await this._trackModel.find({ artists: artistId }, '_id').lean().exec();

    await this._trackModel.deleteMany({ artists: artistId }).exec();

    return {
      deletedIds: foundDocs.map((doc) => doc._id.toHexString() as TrackId),
      total: foundDocs.length,
    };
  }

  async deleteByAlbumId(albumId: string): Promise<{
    deletedIds: TrackId[];
    total: number;
  }> {
    const foundDocs = await this._trackModel.find({ album: albumId }, '_id').lean().exec();

    await this._trackModel.deleteMany({ album: albumId }).exec();

    return {
      deletedIds: foundDocs.map((doc) => doc._id.toHexString() as TrackId),
      total: foundDocs.length,
    };
  }

  async deleteByFeatArtistId(artistId: string): Promise<void> {
    await this._trackModel
      .updateMany(
        { featArtists: artistId },
        {
          $pull: { featArtists: artistId },
        },
      )
      .exec();
  }

  async findById(id: string): Promise<DomainTrack | null> {
    const foundDoc = await this._trackModel.findOne({ _id: id }).lean<Track>().exec();

    return foundDoc ? TrackMapper.toDomainEntity(foundDoc) : null;
  }

  async findByAlbumId(albumId: string): Promise<{
    items: DomainTrack[];
    itemIds: TrackId[];
    total: number;
  }> {
    const foundDocs = await this._trackModel.find({ album: albumId }).lean<Track[]>().exec();

    return {
      items: foundDocs.map((doc) => TrackMapper.toDomainEntity(doc)),
      itemIds: foundDocs.map((doc) => doc._id.toHexString() as TrackId),
      total: foundDocs.length,
    };
  }

  async findByFeatArtistId(artistId: string): Promise<{
    items: DomainTrack[];
    itemIds: TrackId[];
    total: number;
  }> {
    const foundDocs = await this._trackModel.find({ featArtists: artistId }).lean<Track[]>().exec();

    return {
      items: foundDocs.map((doc) => TrackMapper.toDomainEntity(doc)),
      itemIds: foundDocs.map((doc) => doc._id.toHexString() as TrackId),
      total: foundDocs.length,
    };
  }

  async existsById(id: string): Promise<TrackId | null> {
    const foundDoc = await this._trackModel.exists({ _id: id });

    return foundDoc ? (foundDoc._id.toHexString() as TrackId) : null;
  }

  async getNextAlbumTrackIndex(albumId: string): Promise<number> {
    let docsTotal = await this._trackModel.countDocuments({ album: albumId });

    return docsTotal === 0 ? docsTotal : docsTotal++;
  }
}
