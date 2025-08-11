import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ArtistWriteRepository as ArtistWriteRepositoryPort,
  Artist as DomainArtist,
  ArtistId,
} from '@api.mabell/core';
import { Artist } from './artist.schema';
import { ArtistDocument } from './types';
import ArtistMapper from './artist.mapper';

@Injectable()
export class ArtistWriteRepository implements ArtistWriteRepositoryPort {
  constructor(
    @InjectModel(Artist.name)
    private readonly _artistModel: Model<ArtistDocument>,
  ) {}

  async save(entity: DomainArtist): Promise<void> {
    const mappedDoc = ArtistMapper.toPersistenceEntity(entity);

    return this._artistModel.findByIdAndUpdate({ _id: mappedDoc._id }, mappedDoc, {
      new: true,
      upsert: true,
      runValidators: true,
    });
  }

  async deleteById(id: string): Promise<ArtistId | null> {
    const result = await this._artistModel.deleteOne({ _id: id }).exec();

    return result.deletedCount ? (id as ArtistId) : null;
  }

  async findById(id: string): Promise<DomainArtist | null> {
    const foundDoc = await this._artistModel.findOne({ _id: id }).lean<Artist>().exec();

    return foundDoc ? ArtistMapper.toDomainEntity(foundDoc) : null;
  }

  async findByIds(ids: string[]): Promise<{
    items: (DomainArtist | null)[];
    foundItems: DomainArtist[];
    foundIds: ArtistId[];
    total: number;
    missingIds: string[];
  }> {
    const foundDocs = await this._artistModel.find({ _id: ids }).lean<Artist[]>();
    const foundDocsMap: Map<string, DomainArtist> = new Map(
      foundDocs.map((doc) => [doc._id.toString(), ArtistMapper.toDomainEntity(doc)]),
    );
    const itemsResult: (DomainArtist | null)[] = ids.map((id) => {
      return foundDocsMap.get(id) || null;
    });
    const missingDocIds = ids.filter((id) => !foundDocsMap.has(id));

    return {
      items: itemsResult,
      foundItems: itemsResult.filter((i) => i !== null),
      foundIds: [...foundDocsMap.keys()] as ArtistId[],
      total: foundDocsMap.size,
      missingIds: missingDocIds,
    };
  }

  async existsById(id: string): Promise<ArtistId | null> {
    const foundDoc = await this._artistModel.exists({ _id: id });

    return foundDoc ? (foundDoc._id.toHexString() as ArtistId) : null;
  }

  async existsByIds(ids: string[]): Promise<{
    items: (ArtistId | null)[];
    foundIds: ArtistId[];
    total: number;
    missingIds: string[];
  }> {
    const foundDocs = await this._artistModel.find({ _id: ids }, '_id');
    const foundDocIdsMap = new Set<string>(foundDocs.map((doc) => doc._id.toString()));
    const itemsResult = ids.map((id) => {
      if (foundDocIdsMap.has(id)) return id;

      return null;
    });
    const missingIds = ids.filter((id) => !foundDocIdsMap.has(id));

    return {
      items: itemsResult as (ArtistId | null)[],
      foundIds: itemsResult.filter((i) => i !== null) as ArtistId[],
      total: foundDocIdsMap.size,
      missingIds,
    };
  }

  async getNextIndex(): Promise<number> {
    return (await this._artistModel.countDocuments()) + 1;
  }
}
