import { Admin } from './admin.entity';
import { AdminRoles } from './constants/admin-roles';
import { AdminRoleVO } from './vos/admin-role.vo';
import { UsernameVO } from './vos/username.vo';
import { NameVO } from './vos/name.vo';
import { AdminId } from './types';
import { HashedPasswordVO } from '../../common/vos/hashed-password.vo';

export class AdminFactory {
  static create(props: {
    id: AdminId;
    username: string;
    password: HashedPasswordVO;
    name?: string;
    isBlocked?: boolean;
    role?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    return new Admin(
      props.id,
      UsernameVO.create(props.username),
      props.password,
      NameVO.create(props.name || props.username),
      props.isBlocked ?? false,
      AdminRoleVO.create(props.role || AdminRoles.Guest),
      props.createdAt || new Date(),
      props.updatedAt || new Date(),
    );
  }
}
