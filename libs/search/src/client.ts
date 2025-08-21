import * as process from 'process';
import TypeSense from 'typesense';

export const TypeSenseClient = new TypeSense.Client({
  nodes: [
    {
      protocol: (process.env.TYPESENSE_PROTOCOL as string) || 'http',
      host: (process.env.TYPESENSE_HOST as string) || 'localhost',
      port: parseInt(process.env.TYPESENSE_PORT as string) || 8108,
    },
  ],
  apiKey: (process.env.TYPESENSE_KEY as string) || 'xyz',
  connectionTimeoutSeconds: 300,
});
