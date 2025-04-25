import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseReadRepository } from '../../base/base-read-repository.abstract';
import { Playlist } from './playlist.document';
import { PlaylistDTO } from '../../../../../core/app/components/playlist/ports/repository/dtos/playlist.dto';
import { PlaylistFilter } from '../../../../../core/app/components/playlist/ports/repository/playlist.filter';
import { PlaylistWithOwnerDocument } from './types';
import { PlaylistWithOwnerDTO } from '../../../../../core/app/components/playlist/ports/repository/dtos/playlist-with-owner.dto';
import { PlaylistReadRepository } from '../../../../../core/app/components/playlist/ports/repository/playlist-read-repository.port';
import PlaylistMapper from './playlist.mapper';
import { POPULATE_OPTIONS } from './constants';

@Injectable()
export class PlaylistReadRepositoryAdapter
  extends BaseReadRepository<
    Playlist,
    PlaylistDTO,
    PlaylistFilter,
    PlaylistWithOwnerDocument,
    PlaylistWithOwnerDTO
  >
  implements PlaylistReadRepository
{
  constructor(
    @InjectModel(Playlist.name)
    private readonly _playlistModel: Model<Playlist>,
  ) {
    super(_playlistModel, PlaylistMapper, POPULATE_OPTIONS);
  }
}
