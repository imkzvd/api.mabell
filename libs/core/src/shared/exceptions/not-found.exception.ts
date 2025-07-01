export class NotFoundException extends Error {
  constructor(message: string = 'Not found') {
    super(message);
    Object.setPrototypeOf(this, NotFoundException.prototype);
  }
}
