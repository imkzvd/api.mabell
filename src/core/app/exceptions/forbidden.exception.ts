export class ForbiddenException extends Error {
  constructor(message: string = 'Action forbidden') {
    super(message);
    Object.setPrototypeOf(this, ForbiddenException.prototype);
  }
}
