// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const Status = {
  "PENDING": "PENDING",
  "ACCEPTED": "ACCEPTED",
  "DECLINED": "DECLINED"
};

const { User, Availability, Plan, Invitee } = initSchema(schema);

export {
  User,
  Availability,
  Plan,
  Invitee,
  Status
};