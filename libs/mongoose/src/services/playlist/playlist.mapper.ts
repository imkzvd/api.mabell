import { Types } from 'mongoose';
import { Playlist as DomainPlaylist } from '@core/domain/components/playlist/playlist.entity';
import { PlaylistFactory } from '@core/domain/components/playlist/playlist.factory';
import { PlaylistWithUserDTO } from '@core/domain/components/playlist/repository/dtos/playlist-with-user.dto';
import { PlaylistId } from '@core/domain/components/playlist/types';
import { UserId } from '@core/domain/components/user/types';
import { Playlist } from './playlist.schema';
import { PlaylistDocument, PlaylistWithUser, PlaylistWithUserDocument } from './types';
import { ReadMapper, WriteMapper } from '../../base/mapper.interface';
import UserMapper from '../user/user.mapper';

class PlaylistMapper
  implements
    WriteMapper<Playlist, DomainPlaylist>,
    ReadMapper<PlaylistWithUserDocument, PlaylistWithUserDTO>
{
  toPersistenceEntity(entity: DomainPlaylist): Playlist {
    return {
      _id: new Types.ObjectId(entity.getId().toString()),
      user: new Types.ObjectId(entity.getUser()),
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
      user: doc.user.toHexString() as UserId,
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

  toDTO(doc: PlaylistWithUser | PlaylistWithUserDocument): PlaylistWithUserDTO {
    return new PlaylistWithUserDTO(
      doc._id.toHexString() as PlaylistId,
      UserMapper.toDTO(doc.user),
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
