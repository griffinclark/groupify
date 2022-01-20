// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const Sender = {
  "USER": "USER",
  "NOTIFICATIONPANEL": "NOTIFICATIONPANEL"
};

const Status = {
  "PENDING": "PENDING",
  "ACCEPTED": "ACCEPTED",
  "DECLINED": "DECLINED"
};

const { NotificationFromTo, Notification, User, Availability, Plan, PlanArbitration, Invitee } = initSchema(schema);

export {
  NotificationFromTo,
  Notification,
  User,
  Availability,
  Plan,
  PlanArbitration,
  Invitee,
  Sender,
  Status
};