export interface CannedEvent {
  UID: string;
  title: string;
  startTime: string;
  imageURL: string
  description: string
}

let cannedEvents: CannedEvent[] = [
  {
    UID: "string",
    title: "string",
    startTime: "firestore.Timestamp",
    imageURL: "www.image.com",
    description: "It's cool"
  },
];
