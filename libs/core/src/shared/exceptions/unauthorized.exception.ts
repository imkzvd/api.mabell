export class UnauthorizedException extends Error {
  constructor(message: string = 'UnauthorizedException') {
    super(message);
    Object.setPrototypeOf(this, UnauthorizedException.prototype);
  }
}
