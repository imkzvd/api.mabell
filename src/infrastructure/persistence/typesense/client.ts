import TypeSense from 'typesense';
import * as process from 'process';

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
