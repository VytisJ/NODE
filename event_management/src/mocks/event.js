const mockEvent = {
  id: 1,
  title: "Fake event",
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam voluptates harum ipsam doloremque cupiditate fugiat eius doloribus quod debitis vitae corporis officiis excepturi, quaerat fuga placeat nihil, dignissimos illum provident.",
  startingDate: "2023-08-30",
  endingDate: "2023-09-01",
  location: {
    country: "Lietuva",
    city: "Vilnius",
    address: "Gedimino g. 9",
  },
  attendanceeCount: 200,
  imageUrl:
    "https://img.bizbash.com/files/base/bizbash/bzb/image/2018/07/2018_06_09_pg_groupnine_bestdogdayever_ca_142.png?auto=format%2Ccompress&q=70&w=400",
};

const mockEvent2 = {
  id: 2,
  title: "Fake cat event",
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam voluptates harum ipsam doloremque cupiditate fugiat eius doloribus quod debitis vitae corporis officiis excepturi, quaerat fuga placeat nihil, dignissimos illum provident.",
  startingDate: "2023-09-30",
  endingDate: "2023-10-01",
  location: {
    country: "Lietuva",
    city: "Kaunas",
    address: "Gedimino g. 9",
  },
  attendanceeCount: 100,
  imageUrl:
    "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F477315689%2F1059305250613%2F1%2Foriginal.20230324-213413?h=2000&w=720&auto=format%2Ccompress&q=75&sharp=10&s=47e9a518a18362f9157b14da0b6b5da4",
};

export const mockEvents = [mockEvent, mockEvent2];
