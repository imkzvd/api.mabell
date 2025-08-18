import { UserId } from '../../domain/components/user/types';

export class SimplifiedUserDTO {
  constructor(
    public readonly id: UserId,
    public readonly name: string,
    public readonly isPublic: boolean,
  ) {}
}
