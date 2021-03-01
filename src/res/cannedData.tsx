export interface CannedEvent {
  title: string; // use the title as the UID and don't let users change it
  startTime?: string; // this will be added later in the event creation process
  imageURL: string;
  description: string;
  tags: string[]
}

let cannedEvents: CannedEvent[] = [
  {
    title: "City Tacos",
    imageURL:
      "https://diningonthe101.files.wordpress.com/2020/01/city-tacos-salsa-sign.jpg?w=1680",
    description: "City Tacos is located in the Lumber Yard and offers inside or outdoor seating.  The outdoor tables come with little fire places which are inviting and comfortable. ",
    tags: ["Mexican"]
  },
  {
    title: "Modern Times Far West Lounge & Gelato 101",
    imageURL: "https://diningonthe101.files.wordpress.com/2019/11/img_3832.jpg?w=1680",
    description: "The food is all vegan.  A vegan brewery!",
    tags: ["Healthy"]
  },
  {
    title: "Karina’s Taco Shop    ",
    imageURL: "https://diningonthe101.files.wordpress.com/2019/09/karinas-sign.jpg?w=1680",
    description: "Inside Karina’s has a picture of their “Bomb” burrito.  It’s called the “Bomb” because every single person who has ever ordered one has died. ",
    tags: ["Mexican"]
  },
  {
    title:"Nectarine Grove    ",
    imageURL: "https://diningonthe101.files.wordpress.com/2019/09/img_3698.jpg?w=1680",
    description: "Nectarine Grove is a small order-at-the-counter kinda place.",
    tags: ["Healthy"]
  }
];

let tagList =[
  "Healthy",
  "Mexican"
]
