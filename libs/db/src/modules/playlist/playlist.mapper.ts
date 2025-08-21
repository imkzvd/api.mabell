import { Types } from 'mongoose';
import { Domain, App } from '@api.mabell/core';
import { Playlist } from './playlist.schema';
import { PlaylistDocument, PlaylistWithUser, PlaylistWithUserDocument } from './types';
import { ReadMapper, WriteMapper } from '../../base/mapper.interface';
class PlaylistMapper
  implements
    WriteMapper<Playlist, Domain.Playlist.Playlist>,
    ReadMapper<PlaylistWithUserDocument, App.DTOs.PlaylistDTO>
{
  toPersistenceEntity(entity: Domain.Playlist.Playlist): Playlist {
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

  toDomainEntity(doc: Playlist | PlaylistDocument) {
    return Domain.Playlist.PlaylistFactory.create({
      id: doc._id.toHexString() as Domain.Playlist.PlaylistId,
      name: doc.name,
      user: doc.user.toHexString() as Domain.User.UserId,
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

  toDTO(doc: PlaylistWithUser | PlaylistWithUserDocument) {
    return new App.DTOs.PlaylistDTO(
      doc._id.toHexString() as Domain.Playlist.PlaylistId,
      {
        id: doc.user._id.toHexString() as Domain.User.UserId,
        name: doc.user.name,
        isPublic: doc.isPublic,
      },
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
