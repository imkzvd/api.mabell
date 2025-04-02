import { Types } from 'mongoose';
import { ReadMapper, WriteMapper } from '../../base/mapper.interface';
import { Artist as ArtistDocument } from './artist.document';
import { Artist, ArtistId } from '../../../../../core/domain/components/artist/artist.entity';
import { ArtistDTO } from '../../../../../core/app/components/artist/dtos/artist.dto';
import { SimplifiedArtistDTO } from '../../../../../core/app/components/artist/dtos/simplified-artist.dto';
import { ArtistFactory } from '../../../../../core/domain/components/artist/artist.factory';

class ArtistMapper
  implements
    WriteMapper<ArtistDocument, Artist>,
    ReadMapper<ArtistDocument, ArtistDTO, SimplifiedArtistDTO>
{
  toDocument(entity: Artist): ArtistDocument {
    return {
      _id: new Types.ObjectId(entity.getId()),
      name: entity.getName().value,
      birthName: entity.getBirthName()?.value || null,
      birthDate: entity.getBirthDate()?.value || null,
      genres: entity.getGenres().map(({ value }) => value),
      biography: entity.getBiography().value,
      avatar: entity.getAvatar(),
      cover: entity.getCover(),
      accentColor: entity.getAccentColor()?.value || null,
      secondaryColor: entity.getSecondaryColor()?.value || null,
      isActive: entity.getActiveStatus(),
      isPublic: entity.getPublicStatus(),
      createdAt: entity.getCreatedAt(),
      updatedAt: entity.getUpdatedAt(),
    };
  }

  toEntity(doc: ArtistDocument): Artist {
    return ArtistFactory.create({
      id: doc._id.toHexString() as ArtistId,
      name: doc.name,
      birtName: doc.birthName,
      birthDate: doc.birthDate,
      genres: doc.genres,
      biography: doc.biography,
      avatar: doc.avatar,
      cover: doc.cover,
      accentColor: doc.accentColor,
      secondaryColor: doc.secondaryColor,
      isActive: doc.isActive,
      isPublic: doc.isPublic,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }

  toDTO(doc: ArtistDocument): ArtistDTO {
    return new ArtistDTO(
      doc._id.toHexString(),
      doc.name,
      doc.birthName,
      doc.birthDate,
      doc.genres,
      doc.biography,
      doc.avatar,
      doc.cover,
      doc.accentColor,
      doc.secondaryColor,
      doc.isActive,
      doc.isPublic,
      doc.createdAt,
      doc.updatedAt,
    );
  }

  toSimplifiedDTO(doc: ArtistDocument): SimplifiedArtistDTO {
    return new SimplifiedArtistDTO(
      doc._id.toHexString(),
      doc.name,
      doc.birthName,
      doc.birthDate,
      doc.genres,
      doc.biography,
      doc.avatar,
      doc.cover,
      doc.accentColor,
      doc.secondaryColor,
      doc.isActive,
      doc.isPublic,
      doc.createdAt,
      doc.updatedAt,
    );
  }
}

export default new ArtistMapper();
