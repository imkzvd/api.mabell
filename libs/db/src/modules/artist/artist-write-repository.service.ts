import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Domain } from '@api.mabell/core';
import { Artist } from './artist.schema';
import { ArtistDocument } from './types';
import ArtistMapper from './artist.mapper';

@Injectable()
export class ArtistWriteRepository implements Domain.Artist.ArtistWriteRepository {
  constructor(
    @InjectModel(Artist.name)
    private readonly _artistModel: Model<ArtistDocument>,
  ) {}

  async save(entity: Domain.Artist.Artist) {
    const mappedDoc = ArtistMapper.toPersistenceEntity(entity);

    await this._artistModel.findByIdAndUpdate({ _id: mappedDoc._id }, mappedDoc, {
      new: true,
      upsert: true,
      runValidators: true,
    });
  }

  async deleteById(artistId: string) {
    const result = await this._artistModel.deleteOne({ _id: artistId }).exec();

    return result.deletedCount ? (artistId as Domain.Artist.ArtistId) : null;
  }

  async findById(artistId: string) {
    const foundDoc = await this._artistModel.findOne({ _id: artistId }).lean<Artist>().exec();

    return foundDoc ? ArtistMapper.toDomainEntity(foundDoc) : null;
  }

  async findByIds(artistIds: string[]) {
    const foundDocs = await this._artistModel.find({ _id: artistIds }).lean<Artist[]>();
    const foundDocsMap: Map<string, Domain.Artist.Artist> = new Map(
      foundDocs.map((doc) => [doc._id.toString(), ArtistMapper.toDomainEntity(doc)]),
    );
    const itemsResult: (Domain.Artist.Artist | null)[] = artistIds.map((id) => {
      return foundDocsMap.get(id) || null;
    });
    const missingDocIds = artistIds.filter((id) => !foundDocsMap.has(id));

    return {
      items: itemsResult,
      foundItems: itemsResult.filter((i) => i !== null),
      foundIds: [...foundDocsMap.keys()] as Domain.Artist.ArtistId[],
      total: foundDocsMap.size,
      missingIds: missingDocIds,
    };
  }

  async existsById(artistId: string, isPublic?: boolean) {
    const foundDoc = await this._artistModel.exists({
      _id: artistId,
      ...(isPublic !== undefined && { isPublic }),
    });

    return foundDoc ? (foundDoc._id.toHexString() as Domain.Artist.ArtistId) : null;
  }

  async existsByIds(artistIds: string[]) {
    const foundDocs = await this._artistModel.find({ _id: artistIds }, '_id');
    const foundDocIdsMap = new Set<string>(foundDocs.map((doc) => doc._id.toString()));
    const itemsResult = artistIds.map((id) => {
      if (foundDocIdsMap.has(id)) return id;

      return null;
    });
    const missingIds = artistIds.filter((id) => !foundDocIdsMap.has(id));

    return {
      items: itemsResult as (Domain.Artist.ArtistId | null)[],
      foundIds: itemsResult.filter((i) => i !== null) as Domain.Artist.ArtistId[],
      total: foundDocIdsMap.size,
      missingIds,
    };
  }

  async getNextIndex(): Promise<number> {
    return (await this._artistModel.countDocuments()) + 1;
  }
}
