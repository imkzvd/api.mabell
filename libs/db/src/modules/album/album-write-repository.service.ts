import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Domain } from '@api.mabell/core';
import { Album } from './album.schema';
import AlbumMapper from './album.mapper';
import { AlbumDocument } from './types';

@Injectable()
export class AlbumWriteRepository implements Domain.Album.AlbumWriteRepository {
  constructor(
    @InjectModel(Album.name)
    private readonly _albumModel: Model<AlbumDocument>,
  ) {}

  async save(entity: Domain.Album.Album) {
    const mappedDoc = AlbumMapper.toPersistenceEntity(entity);

    await this._albumModel.findByIdAndUpdate({ _id: mappedDoc._id }, mappedDoc, {
      new: true,
      upsert: true,
      runValidators: true,
    });
  }

  async deleteById(albumId: string) {
    const result = await this._albumModel.deleteOne({ _id: albumId }).exec();

    return result.deletedCount ? (albumId as Domain.Album.AlbumId) : null;
  }

  async deleteByArtistId(artistId: string) {
    const foundDocs = await this._albumModel.find({ artists: artistId }, '_id').lean().exec();

    await this._albumModel.deleteMany({ artists: artistId }).exec();

    return {
      deletedIds: foundDocs.map((doc) => doc._id.toHexString() as Domain.Album.AlbumId),
      total: foundDocs.length,
    };
  }

  async findById(albumId: string) {
    const foundDoc = await this._albumModel.findOne({ _id: albumId }).lean<Album>().exec();

    return foundDoc ? AlbumMapper.toDomainEntity(foundDoc) : null;
  }

  async getNextAlbumIndexByArtistId(artistId: string) {
    const totalDocs = await this._albumModel.countDocuments({ artists: artistId }).exec();

    return totalDocs + 1;
  }

  async existsById(albumId: string) {
    const foundDoc = await this._albumModel.exists({ _id: albumId });

    return foundDoc ? (foundDoc._id.toHexString() as Domain.Album.AlbumId) : null;
  }
}
