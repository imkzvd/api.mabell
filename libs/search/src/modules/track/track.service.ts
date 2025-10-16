import { Inject, Injectable } from '@nestjs/common';
import { App } from '@api.mabell/core';
import { TrackCollection } from './track.collection';
import TrackMapper from './track.mapper';
import { TracksDTO } from './dtos/tracks.dto';

@Injectable()
export class TrackService {
  constructor(@Inject(TrackCollection) private readonly _trackCollection: TrackCollection) {}

  async getByQuery(
    q: string,
    options?: Partial<{
      isGlobal: boolean;
    }>,
  ): Promise<TracksDTO> {
    const foundDocs = await this._trackCollection.findByQuery(q, options);

    return new TracksDTO(
      foundDocs.items.map(({ item, score }) => ({
        item: TrackMapper.toDTO(item),
        score,
      })),
      foundDocs.total,
      foundDocs.offset,
      foundDocs.limit,
    );
  }

  async getById(
    id: string,
    options?: Partial<{
      isGlobal: boolean;
    }>,
  ): Promise<App.DTOs.IndexedTrackDTO | null> {
    const foundDoc = await this._trackCollection.findById(id, options);

    return foundDoc ? TrackMapper.toDTO(foundDoc) : null;
  }

  async getByIds(
    ids: string[],
    options?: Partial<{
      isGlobal: boolean;
    }>,
  ): Promise<App.DTOs.IndexedTrackDTO[]> {
    const foundDocs = await this._trackCollection.findByIds(ids, options);
    const mapIds = new Map<string, number>();

    ids.forEach((id, index) => mapIds.set(id, index));

    foundDocs.sort((a, b) => mapIds.get(a.id)! - mapIds.get(b.id)!);

    return foundDocs.map((doc) => TrackMapper.toDTO(doc));
  }
}
