import { User } from './user.entity';
import { Regions } from '../../common/constants/regions';
import { HashedPasswordVO } from '../../common/vos/hashed-password.vo';
import { UsernameVO } from './vos/username.vo';
import { NameVO } from './vos/name.vo';
import { EmailVO } from '../../common/vos/email.vo';
import { RegionVO } from '../../common/vos/region.vo';
import { GenreVO } from '../../common/vos/genre.vo';
import { UserId } from './types';

export class UserFactory {
  static create(props: {
    id: UserId;
    username: string;
    password: HashedPasswordVO;
    name?: string;
    email?: string | null;
    isBlocked?: boolean;
    birthDate?: Date;
    region?: string;
    genres?: string[];
    avatar?: string | null;
    color?: string | null;
    isVerified?: boolean;
    isPremium?: boolean;
    isPublic?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    return new User(
      props.id,
      UsernameVO.create(props.username),
      props.password,
      NameVO.create(props.name || props.username),
      props.email ? EmailVO.create(props.email) : null,
      props.birthDate || new Date(),
      RegionVO.create(props.region || Regions['Russian Federation']),
      props.genres?.map((genre: string) => GenreVO.create(genre)) || [],
      props.avatar || null,
      props.color || null,
      props.isBlocked ?? false,
      props.isVerified ?? false,
      props.isPremium ?? false,
      props.isPublic ?? true,
      props.createdAt || new Date(),
      props.updatedAt || new Date(),
    );
  }
}
