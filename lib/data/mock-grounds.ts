export type TimeSlot = {
  id: string;
  start: string;
  end: string;
  price: number;
  available: boolean;
  bookedBy?: string;
};
export type Ground = {
  id: string;
  name: string;
  city: string;
  address: string;
  capacity: number;
  pitch: "Turf" | "Cement" | "Astro" | "Matting";
  surfaceArea: string;
  facilities: string[];
  hourlyRate: number;
  isHome?: boolean;
  note?: string;
  color: string;
  icon: string;
  matches: number;
  rating: number;
  slots: Record<string, TimeSlot[]>; // date -> slots
};
// Generate slots for next 7 days
function makeSlots(): Record<string, TimeSlot[]> {
  const slots: Record<string, TimeSlot[]> = {};
  const times = [
    { start: "07:00 AM", end: "09:00 AM" },
    { start: "09:00 AM", end: "11:00 AM" },
    { start: "11:00 AM", end: "01:00 PM" },
    { start: "02:00 PM", end: "04:00 PM" },
    { start: "04:00 PM", end: "06:00 PM" },
    { start: "06:00 PM", end: "08:00 PM" },
  ];
  const now = new Date();
  for (let d = 0; d < 7; d++) {
    const date = new Date(now.getTime() + d * 24 * 60 * 60 * 1000);
    const key = date.toISOString().slice(0, 10);
    slots[key] = times.map((t, i) => ({
      id: key + "-" + i,
      start: t.start,
      end: t.end,
      price: 3000,
      available: Math.random() > 0.3,
    }));
  }
  return slots;
}
export const GROUNDS: Ground[] = [
  {
    id: "abbas-ground",
    name: "Abbas Cricket Ground",
    city: "Hakeemabad, Nowshera",
    address: "Abbas Cricket Ground, Hakeemabad, Nowshera, Khyber Pakhtunkhwa",
    capacity: 500,
    pitch: "Turf",
    surfaceArea: "Standard cricket field with turf pitch",
    facilities: ["Pavilion", "Practice Nets", "Changing Rooms", "Parking", "Floodlights", "Drinking Water"],
    hourlyRate: 3000,
    isHome: true,
    note: "Home of DAWN Cricket Club",
    color: "#f0b429",
    icon: "🏏",
    matches: 32,
    rating: 4.8,
    slots: makeSlots(),
  },
  {
    id: "dawn-ground",
    name: "DAWN Cricket Ground",
    city: "Dheri Katti Khel, Nowshera",
    address: "DAWN Cricket Ground, Dheri Katti Khel, Nowshera, KP",
    capacity: 400,
    pitch: "Turf",
    surfaceArea: "Standard field",
    facilities: ["Practice Nets", "Changing Rooms", "Parking"],
    hourlyRate: 2500,
    color: "#14a44d",
    icon: "🏟️",
    matches: 24,
    rating: 4.6,
    slots: makeSlots(),
  },
  {
    id: "nowshera-ground",
    name: "Nowshera Cricket Ground",
    city: "Nowshera Kalan",
    address: "Nowshera Kalan, District Nowshera, KP",
    capacity: 1200,
    pitch: "Turf",
    surfaceArea: "Large field with proper turf pitch",
    facilities: ["Pavilion", "Practice Nets", "Media Box", "Parking", "Floodlights", "Cafeteria"],
    hourlyRate: 5000,
    color: "#93c5fd",
    icon: "🏟️",
    matches: 18,
    rating: 4.7,
    slots: makeSlots(),
  },
  {
    id: "pabbi-sports",
    name: "Pabbi Sports Complex",
    city: "Pabbi",
    address: "Pabbi Sports Complex, Pabbi, Nowshera, KP",
    capacity: 800,
    pitch: "Turf",
    surfaceArea: "Multi-purpose sports complex",
    facilities: ["Pavilion", "Practice Nets", "Parking", "Floodlights"],
    hourlyRate: 3500,
    color: "#c4b5fd",
    icon: "🏟️",
    matches: 12,
    rating: 4.5,
    slots: makeSlots(),
  },
  {
    id: "peshawar-stadium",
    name: "Peshawar Stadium",
    city: "Peshawar",
    address: "Peshawar Stadium, Peshawar, KP",
    capacity: 5000,
    pitch: "Turf",
    surfaceArea: "Professional cricket stadium",
    facilities: ["Grand Stand", "Media Center", "Practice Nets", "Floodlights", "Parking", "Restaurant"],
    hourlyRate: 15000,
    color: "#fca5a5",
    icon: "🏟️",
    matches: 8,
    rating: 4.9,
    slots: makeSlots(),
  },
  {
    id: "mardan-ground",
    name: "Mardan Cricket Ground",
    city: "Mardan",
    address: "Mardan Cricket Ground, Mardan, KP",
    capacity: 2000,
    pitch: "Turf",
    surfaceArea: "Professional cricket ground",
    facilities: ["Pavilion", "Practice Nets", "Parking"],
    hourlyRate: 6000,
    color: "#fdba74",
    icon: "🏟️",
    matches: 6,
    rating: 4.4,
    slots: makeSlots(),
  },
  {
    id: "rawalpindi-academy",
    name: "Rawalpindi Cricket Academy",
    city: "Rawalpindi",
    address: "Rawalpindi Cricket Academy, Rawalpindi, Punjab",
    capacity: 800,
    pitch: "Turf",
    surfaceArea: "Training academy ground",
    facilities: ["Practice Nets", "Indoor Facility", "Coaching Staff", "Parking"],
    hourlyRate: 4000,
    color: "#fde68a",
    icon: "🏟️",
    matches: 4,
    rating: 4.5,
    slots: makeSlots(),
  },
  {
    id: "islamabad-sports",
    name: "Islamabad Sports Complex",
    city: "Islamabad",
    address: "Islamabad Sports Complex, Islamabad",
    capacity: 1500,
    pitch: "Turf",
    surfaceArea: "Modern sports complex",
    facilities: ["Pavilion", "Practice Nets", "Floodlights", "Parking", "Cafeteria"],
    hourlyRate: 8000,
    color: "#a7f3d0",
    icon: "🏟️",
    matches: 3,
    rating: 4.7,
    slots: makeSlots(),
  },
];
export function getGround(id: string): Ground | undefined {
  return GROUNDS.find((g) => g.id === id);
}
export function getNext7Days(): string[] {
  const days: string[] = [];
  const now = new Date();
  for (let d = 0; d < 7; d++) {
    const date = new Date(now.getTime() + d * 24 * 60 * 60 * 1000);
    days.push(date.toISOString().slice(0, 10));
  }
  return days;
}