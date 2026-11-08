export type CampusEvent = {
  id: number;
  title: string;
  date: string;
  place: string;
  seats: number;
};

export const events: CampusEvent[] = [
  {
    id: 1,
    title: "React Study Night",
    date: "2026-11-05",
    place: "Room 302",
    seats: 20,
  },
  {
    id: 2,
    title: "Web Development Workshop",
    date: "2026-11-08",
    place: "IT Lab",
    seats: 3,
  },
  {
    id: 3,
    title: "Design Thinking Meetup",
    date: "2026-11-12",
    place: "Library Hall",
    seats: 15,
  },
  {
    id: 4,
    title: "Campus Hackathon",
    date: "2026-11-18",
    place: "Innovation Center",
    seats: 12,
  },
];