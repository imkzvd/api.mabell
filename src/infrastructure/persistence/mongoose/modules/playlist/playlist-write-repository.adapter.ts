import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Playlist as PlaylistDocument } from './playlist.document';
import { BaseWriteRepository } from '../../base/base-write-repository.abstract';
import {
  Playlist,
  PlaylistId,
} from '../../../../../core/domain/components/playlist/playlist.entity';
import { PlaylistFilter } from '../../../../../core/domain/components/playlist/repository/playlist.filter';
import { PlaylistWriteRepository } from '../../../../../core/domain/components/playlist/repository/playlist-write-repository.port';
import PlaylistMapper from './playlist.mapper';

@Injectable()
export class PlaylistWriteRepositoryAdapter
  extends BaseWriteRepository<PlaylistDocument, Playlist, PlaylistId, PlaylistFilter>
  implements PlaylistWriteRepository
{
  constructor(
    @InjectModel(PlaylistDocument.name)
    private readonly _playlistModel: Model<PlaylistDocument>,
  ) {
    super(_playlistModel, PlaylistMapper);
  }
}
