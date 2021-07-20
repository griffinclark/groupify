// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const Status = {
  "PENDING": "PENDING",
  "ACCEPTED": "ACCEPTED",
  "DECLINED": "DECLINED"
};

const { User, UserContact, Availability, Plan, Invitee } = initSchema(schema);

export {
  User,
  UserContact,
  Availability,
  Plan,
  Invitee,
  Status
};