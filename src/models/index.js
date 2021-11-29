// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const Status = {
  "PENDING": "PENDING",
  "ACCEPTED": "ACCEPTED",
  "DECLINED": "DECLINED"
};

const { Plan, User, Availability, PlanArbitration, Invitee } = initSchema(schema);

export {
  Plan,
  User,
  Availability,
  PlanArbitration,
  Invitee,
  Status
};