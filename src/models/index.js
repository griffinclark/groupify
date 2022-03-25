// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const NotificationType = {
  "ACCEPTED": "ACCEPTED",
  "DECLINED": "DECLINED",
  "INVITED": "INVITED"
};


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

const { Interests, AvailabilityTime, NotificationFromTo, Notification, User, Plan, PlanArbitration, Invitee } = initSchema(schema);

export {
  Interests,
  AvailabilityTime,
  NotificationFromTo,
  Notification,
  User,
  Plan,
  PlanArbitration,
  Invitee,
  NotificationType,
  Gender,
  Sender,
  Status
};