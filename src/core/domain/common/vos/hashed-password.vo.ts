export class HashedPasswordVO {
  private constructor(public readonly value: string) {}

  static create(value: string): HashedPasswordVO {
    return new HashedPasswordVO(value);
  }
}
