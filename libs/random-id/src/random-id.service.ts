import { Types } from 'mongoose';
import { App } from '@api.mabell/core';

export class RandomIdService implements App.Ports.IdService {
  generate<T>(): T {
    return new Types.ObjectId().toHexString() as T;
  }
}
