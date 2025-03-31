export class DuplicationException extends Error {
  constructor(message: string = 'Already exists') {
    super(message);
    Object.setPrototypeOf(this, DuplicationException.prototype);
  }
}
