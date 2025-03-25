export class Duplication extends Error {
  constructor(message: string = 'Already exists') {
    super(message);
    Object.setPrototypeOf(this, Duplication.prototype);
  }
}
