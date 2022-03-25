// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const Sender = {
  "USER": "USER",
  "NOTIFICATIONPANEL": "NOTIFICATIONPANEL"
};

const Gender = {
  "MALE": "MALE",
  "FEMALE": "FEMALE",
  "NONBINARY": "NONBINARY",
  "PREFER_NOT_TO_SAY": "PREFER_NOT_TO_SAY"
};

const Status = {
  "PENDING": "PENDING",
  "ACCEPTED": "ACCEPTED",
  "DECLINED": "DECLINED"
};

const { Interest, User, Availability, NotificationFromTo, Notification, Plan, PlanArbitration, Invitee } = initSchema(schema);

export {
  Interest,
  User,
  Availability,
  NotificationFromTo,
  Notification,
  Plan,
  PlanArbitration,
  Invitee,
  Sender,
  Gender,
  Status
};