// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Tes } = initSchema(schema);

export {
  Tes
};