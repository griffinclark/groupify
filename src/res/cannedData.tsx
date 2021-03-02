export interface CannedEvent {
  title: string; // use the title as the UID and don't let users change it
  startTime?: string; // this will be added later in the event creation process
  imageURL: string;
  description: string;
  tags: string[];
}

export const cannedEvents: CannedEvent[] = [
  {
    title: "City Tacos",
    imageURL:
      "https://diningonthe101.files.wordpress.com/2020/01/city-tacos-salsa-sign.jpg?w=1680",
    description:
      "City Tacos is located in the Lumber Yard and offers inside or outdoor seating.  The outdoor tables come with little fire places which are inviting and comfortable. ",
    tags: ["Mexican"],
  },
  {
    title: "Modern Times Far West Lounge & Gelato 101",
    imageURL:
      "https://diningonthe101.files.wordpress.com/2019/11/img_3832.jpg?w=1680",
    description: "The food is all vegan.  A vegan brewery!",
    tags: ["Healthy"],
  },
  {
    title: "Karina’s Taco Shop ",
    imageURL:
      "https://diningonthe101.files.wordpress.com/2019/09/karinas-sign.jpg?w=1680",
    description:
      "Inside Karina’s has a picture of their “Bomb” burrito.  It’s called the “Bomb” because every single person who has ever ordered one has died. ",
    tags: ["Mexican"],
  },
  {
    title: "Nectarine Grove",
    imageURL:
      "https://diningonthe101.files.wordpress.com/2019/09/img_3698.jpg?w=1680",
    description: "Nectarine Grove is a small order-at-the-counter kinda place.",
    tags: ["Healthy"],
  },
  {
    title: "Coffee Coffee & Saint Archer Brewing Company",
    imageURL:
      "https://diningonthe101.files.wordpress.com/2019/08/img_3663.jpg?w=840",
    description: "Coffee Coffee is right by the old Surfy Surfy which is now Bing Surfboards.  They took over the lease and still have a lot of Surfy Surfy stuff. ",
    tags: ["Coffee"],
  },
  {
    title: "Haggo’s Organic Taco",
    imageURL:
      "https://diningonthe101.files.wordpress.com/2019/05/img_3485.jpg?w=768",
    description: "Haggo’s menu is fantastic with grass-fed steak, free-range chicken, whole wheat tortillas and a menu that is almost entirely organic.",
    tags: ["Mexican", "Healthy"],
  },
  {
    title: "Blue Ribbon Artisan Pizzeria",
    imageURL:
      "https://diningonthe101.files.wordpress.com/2018/10/blue-ribbon-patio.jpg?w=768",
    description: "Blue Ribbon Pizza is in a prime location in the Lumberyard right in the middle of the 101 hustle and bustle.  The small restaurant has expanded with two patios which is perfect for San Diego outdoor dining.",
    tags: ["Pizza"],
  },
  {
    title: "Ironsmith Coffee Roasters",
    imageURL:
      "https://diningonthe101.files.wordpress.com/2017/09/img_2168.jpg?w=768",
    description: "Ironsmith generally carries Prager Brothers breads (local and organic), but on Sunday mornings, Wayfarer Bread sets up a pop-up bakery.",
    tags: ["Coffee"],
  },
  {
    title: "The Roxy Encinitas",
    imageURL:
      "https://diningonthe101.files.wordpress.com/2019/02/img_3345.jpg?w=768",
    description: "Notorious for their live music, the roxy (in normal times) is a weekend hot spot with a mixed crowd, great bar and live music. I also love the Roxy for brunch (hello bottomless mimosas).",
    tags: ["Healthy"],
  },
];

export const tagList = ["Healthy", "Mexican", "Coffee", "Pizza"];
