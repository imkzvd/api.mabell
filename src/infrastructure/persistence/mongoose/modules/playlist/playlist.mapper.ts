import { Types } from 'mongoose';
import { Playlist } from './playlist.schema';
import { PlaylistDocument, PlaylistWithOwner, PlaylistWithOwnerDocument } from './types';
import { ReadMapper, WriteMapper } from '../../base/mapper.interface';
import {
  Playlist as DomainPlaylist,
  PlaylistId,
} from '../../../../../core/domain/components/playlist/playlist.entity';
import { PlaylistWithOwnerDTO } from '../../../../../core/app/components/playlist/ports/repository/dtos/playlist-with-owner.dto';
import { PlaylistFactory } from '../../../../../core/domain/components/playlist/playlist.factory';
import { UserId } from '../../../../../core/domain/components/user/user.entity';
import UserMapper from '../user/user.mapper';

class PlaylistMapper
  implements
    WriteMapper<Playlist, DomainPlaylist>,
    ReadMapper<PlaylistWithOwnerDocument, PlaylistWithOwnerDTO>
{
  toPersistenceEntity(entity: DomainPlaylist): Playlist {
    return {
      _id: new Types.ObjectId(entity.getId().toString()),
      owner: new Types.ObjectId(entity.getOwner()),
      name: entity.getName().value,
      genres: entity.getGenres().map(({ value }) => value),
      cover: entity.getCover(),
      color: entity.getColor()?.value || null,
      description: entity.getDescription().value,
      tracks: [...entity.getTracks().keys()].map((id) => ({
        id,
        addedAt: entity.getTracks().get(id) as Date,
      })),
      isPublic: entity.getPublicStatus(),
      createdAt: entity.getCreatedAt(),
      updatedAt: entity.getUpdatedAt(),
    };
  }

  toDomainEntity(doc: Playlist | PlaylistDocument): DomainPlaylist {
    return PlaylistFactory.create({
      id: doc._id.toHexString() as PlaylistId,
      name: doc.name,
      owner: doc.owner.toHexString() as UserId,
      genres: doc.genres,
      cover: doc.cover,
      color: doc.color,
      description: doc.description,
      tracks: doc.tracks,
      isPublic: doc.isPublic,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }

  toDTO(doc: PlaylistWithOwner | PlaylistWithOwnerDocument): PlaylistWithOwnerDTO {
    return new PlaylistWithOwnerDTO(
      doc._id.toHexString(),
      UserMapper.toDTO(doc.owner),
      doc.name,
      doc.genres,
      doc.cover,
      doc.color,
      doc.description,
      doc.tracks,
      doc.isPublic,
      doc.createdAt,
      doc.updatedAt,
    );
  }
}

export default new PlaylistMapper();
