import type { PopulateOptions } from 'mongoose';

export const POPULATE_OPTIONS: PopulateOptions[] = [
  {
    path: 'owner',
  },
];
