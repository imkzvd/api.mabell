import { NameVO } from './vos/name.vo';
import { GenreVO } from '../../common/vos/genre.vo';
import { Artist } from './artist.entity';
import { BirthNameVO } from './vos/birth-name.vo';
import { BiographyVO } from './vos/biography.vo';
import { BirthDateVO } from './vos/birth-date.vo';
import { HexColorVO } from '../../common/vos/hex-color.vo';
import { ArtistId } from './types';

export class ArtistFactory {
  static create(props: {
    id: ArtistId;
    name: string;
    birtName?: string | null;
    birthDate?: Date | null;
    genres?: string[];
    biography?: string;
    avatar?: string | null;
    cover?: string | null;
    accentColor?: string | null;
    secondaryColor?: string | null;
    isPublic?: boolean;
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    return new Artist(
      props.id,
      NameVO.create(props.name),
      props.birtName ? BirthNameVO.create(props.birtName) : null,
      props.birthDate ? BirthDateVO.create(props.birthDate) : null,
      props.genres?.map((genre: string) => GenreVO.create(genre)) || [],
      BiographyVO.create(props.biography || ''),
      props.avatar || null,
      props.cover || null,
      props.accentColor ? HexColorVO.create(props.accentColor) : null,
      props.secondaryColor ? HexColorVO.create(props.secondaryColor) : null,
      props.isActive ?? false,
      props.isPublic ?? false,
      props.createdAt || new Date(),
      props.updatedAt || new Date(),
    );
  }
}
