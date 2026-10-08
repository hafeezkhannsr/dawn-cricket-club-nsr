export type Coach = {
  id: string;
  name: string;
  role: string;
  specialty: string;
  experience: number;
  certifications: string[];
  city: string;
  email: string;
  phone: string;
  bio: string;
  avatar: string;
  color: string;
  batches: string[];
};
export type Student = {
  id: string;
  name: string;
  age: number;
  batchId: string;
  category: "U13" | "U15" | "U17" | "U19";
  role: string;
  batting: string;
  bowling: string;
  attendance: number;
  progress: number;
  joinedDate: string;
  avatar: string;
};
export type Batch = {
  id: string;
  name: string;
  category: "U13" | "U15" | "U17" | "U19";
  ageRange: string;
  schedule: string;
  timing: string;
  days: string[];
  coachId: string;
  assistantCoachId?: string;
  venue: string;
  capacity: number;
  enrolled: number;
  monthlyFee: number;
  status: "OPEN" | "FULL" | "CLOSED";
  color: string;
  description: string;
};
export type Program = {
  id: string;
  name: string;
  ageRange: string;
  duration: string;
  sessionsPerWeek: number;
  monthlyFee: number;
  features: string[];
  color: string;
};
// ============================
// COACHES
// ============================
export const COACHES: Coach[] = [
  {
    id: "coach-ilyas",
    name: "Muhammad Ilyas",
    role: "Head Coach",
    specialty: "Batting Technique",
    experience: 15,
    certifications: ["PCB Level 3", "ICC Level 2"],
    city: "Nowshera",
    email: "ilyas@dawncricketclub.pk",
    phone: "+92 300 1111111",
    bio: "Former first-class cricketer with 15 years of coaching experience. Specializes in batting technique and mental conditioning for young players.",
    avatar: "🎯",
    color: "#14a44d",
    batches: ["u15-morning", "u17-morning"],
  },
  {
    id: "coach-khalid",
    name: "Khalid Mahmood",
    role: "Bowling Coach",
    specialty: "Fast Bowling",
    experience: 12,
    certifications: ["PCB Level 2", "Fitness Specialist"],
    city: "Peshawar",
    email: "khalid@dawncricketclub.pk",
    phone: "+92 300 2222222",
    bio: "Specialist fast bowling coach with expertise in pace development, action correction, and injury prevention.",
    avatar: "⚡",
    color: "#f0b429",
    batches: ["u17-morning", "u19-evening"],
  },
  {
    id: "coach-saeed",
    name: "Saeed Anwar",
    role: "Spin Bowling Coach",
    specialty: "Leg-Spin & Off-Spin",
    experience: 10,
    certifications: ["PCB Level 2"],
    city: "Islamabad",
    email: "saeed@dawncricketclub.pk",
    phone: "+92 300 3333333",
    bio: "Spin bowling specialist with deep knowledge of wrist position, variations, and match strategy.",
    avatar: "🌀",
    color: "#93c5fd",
    batches: ["u15-morning", "u19-evening"],
  },
  {
    id: "coach-rashid",
    name: "Rashid Latif",
    role: "Wicket-keeping Coach",
    specialty: "Keeping & Fielding",
    experience: 18,
    certifications: ["PCB Level 3", "ICC Level 1"],
    city: "Peshawar",
    email: "rashid@dawncricketclub.pk",
    phone: "+92 300 4444444",
    bio: "Master of wicket-keeping and fielding with 18 years of experience. Known for developing quick glove-work and athleticism.",
    avatar: "🧤",
    color: "#fca5a5",
    batches: ["u13-morning", "u15-morning"],
  },
  {
    id: "coach-inzamam",
    name: "Inzamam-ul-Haq",
    role: "Batting Coach",
    specialty: "Power Hitting",
    experience: 14,
    certifications: ["PCB Level 2"],
    city: "Mardan",
    email: "inzamam@dawncricketclub.pk",
    phone: "+92 300 5555555",
    bio: "Specialist in modern power hitting, T20 batting, and finisher role development.",
    avatar: "💥",
    color: "#fdba74",
    batches: ["u19-evening"],
  },
  {
    id: "coach-abdul",
    name: "Abdul Rehman",
    role: "Fitness & Conditioning",
    specialty: "Athletic Development",
    experience: 8,
    certifications: ["NSCA-CSCS", "Sports Nutrition"],
    city: "Nowshera",
    email: "abdul@dawncricketclub.pk",
    phone: "+92 300 6666666",
    bio: "Certified strength and conditioning specialist focused on age-appropriate athletic development.",
    avatar: "💪",
    color: "#c4b5fd",
    batches: ["u13-morning", "u15-morning", "u17-morning", "u19-evening"],
  },
];
// ============================
// BATCHES
// ============================
export const BATCHES: Batch[] = [
  {
    id: "u13-morning",
    name: "U13 Foundation Batch",
    category: "U13",
    ageRange: "10-13 years",
    schedule: "Monday, Wednesday, Friday",
    timing: "7:00 AM - 9:00 AM",
    days: ["Mon", "Wed", "Fri"],
    coachId: "coach-rashid",
    assistantCoachId: "coach-abdul",
    venue: "Abbas Cricket Ground, Hakeemabad",
    capacity: 25,
    enrolled: 18,
    monthlyFee: 3000,
    status: "OPEN",
    color: "#93c5fd",
    description: "Foundation program for young beginners. Focus on basic skills, discipline, and love for the game.",
  },
  {
    id: "u15-morning",
    name: "U15 Development Batch",
    category: "U15",
    ageRange: "13-15 years",
    schedule: "Tuesday, Thursday, Saturday",
    timing: "6:30 AM - 9:00 AM",
    days: ["Tue", "Thu", "Sat"],
    coachId: "coach-ilyas",
    assistantCoachId: "coach-saeed",
    venue: "Abbas Cricket Ground, Hakeemabad",
    capacity: 30,
    enrolled: 24,
    monthlyFee: 4000,
    status: "OPEN",
    color: "#14a44d",
    description: "Intermediate program focused on technical skills, match awareness, and PCB U15 preparation.",
  },
  {
    id: "u17-morning",
    name: "U17 Elite Batch",
    category: "U17",
    ageRange: "15-17 years",
    schedule: "Monday, Wednesday, Friday, Sunday",
    timing: "6:00 AM - 9:00 AM",
    days: ["Mon", "Wed", "Fri", "Sun"],
    coachId: "coach-ilyas",
    assistantCoachId: "coach-khalid",
    venue: "Abbas Cricket Ground, Hakeemabad",
    capacity: 25,
    enrolled: 25,
    monthlyFee: 5000,
    status: "FULL",
    color: "#f0b429",
    description: "Advanced program for serious cricketers. Match simulation, strength training, and PCB U17 trials preparation.",
  },
  {
    id: "u19-evening",
    name: "U19 Professional Batch",
    category: "U19",
    ageRange: "17-19 years",
    schedule: "Tuesday, Thursday, Saturday, Sunday",
    timing: "4:00 PM - 7:00 PM",
    days: ["Tue", "Thu", "Sat", "Sun"],
    coachId: "coach-khalid",
    assistantCoachId: "coach-inzamam",
    venue: "DAWN Cricket Ground, Dheri Katti Khel",
    capacity: 20,
    enrolled: 14,
    monthlyFee: 6000,
    status: "OPEN",
    color: "#fca5a5",
    description: "Professional-level program for players aiming for first-class cricket. Advanced tactics, fitness, and match preparation.",
  },
];
// ============================
// STUDENTS
// ============================
export const STUDENTS: Student[] = [
  { id: "s1", name: "Adnan Irshad", age: 15, batchId: "u15-morning", category: "U15", role: "Batter", batting: "Right-hand", bowling: "-", attendance: 92, progress: 78, joinedDate: "2024-03-15", avatar: "🧑" },
  { id: "s2", name: "Hamza Ahmad", age: 14, batchId: "u15-morning", category: "U15", role: "Batter", batting: "Right-hand", bowling: "Right-arm medium", attendance: 88, progress: 72, joinedDate: "2024-04-02", avatar: "👦" },
  { id: "s3", name: "Rohail Murtaza", age: 15, batchId: "u15-morning", category: "U15", role: "Wicket-keeper", batting: "Left-hand", bowling: "-", attendance: 95, progress: 81, joinedDate: "2024-03-20", avatar: "🧑" },
  { id: "s4", name: "Bilal Khan", age: 15, batchId: "u15-morning", category: "U15", role: "All-rounder", batting: "Right-hand", bowling: "Right-arm off-spin", attendance: 85, progress: 68, joinedDate: "2024-05-10", avatar: "👦" },
  { id: "s5", name: "Asad Khan", age: 14, batchId: "u15-morning", category: "U15", role: "Bowler", batting: "Right-hand", bowling: "Right-arm fast", attendance: 90, progress: 74, joinedDate: "2024-04-15", avatar: "🧑" },
  { id: "s6", name: "Fida Ullah", age: 15, batchId: "u15-morning", category: "U15", role: "Bowler", batting: "Left-hand", bowling: "Left-arm orthodox", attendance: 94, progress: 79, joinedDate: "2024-03-25", avatar: "👦" },
  { id: "s7", name: "M. Hassan", age: 14, batchId: "u15-morning", category: "U15", role: "Bowler", batting: "Right-hand", bowling: "Right-arm medium", attendance: 87, progress: 70, joinedDate: "2024-05-01", avatar: "🧑" },
  { id: "s8", name: "Tariq Mehmood", age: 15, batchId: "u15-morning", category: "U15", role: "Bowler", batting: "Right-hand", bowling: "Right-arm fast", attendance: 91, progress: 76, joinedDate: "2024-04-08", avatar: "👦" },
  { id: "s9", name: "Asif Ali", age: 14, batchId: "u15-morning", category: "U15", role: "All-rounder", batting: "Left-hand", bowling: "Left-arm medium", attendance: 89, progress: 71, joinedDate: "2024-05-20", avatar: "🧑" },
  { id: "s10", name: "N. Shah", age: 15, batchId: "u15-morning", category: "U15", role: "Bowler", batting: "Right-hand", bowling: "Right-arm off-spin", attendance: 93, progress: 77, joinedDate: "2024-03-30", avatar: "👦" },
  { id: "s11", name: "Wajdan Tariq", age: 14, batchId: "u15-morning", category: "U15", role: "Bowler", batting: "Right-hand", bowling: "Right-arm fast", attendance: 90, progress: 75, joinedDate: "2024-04-22", avatar: "🧑" },
  { id: "s12", name: "Naseer Ahmad", age: 15, batchId: "u17-morning", category: "U17", role: "Batter", batting: "Right-hand", bowling: "-", attendance: 96, progress: 88, joinedDate: "2023-09-15", avatar: "👦" },
  { id: "s13", name: "Maaz Khan", age: 16, batchId: "u17-morning", category: "U17", role: "All-rounder", batting: "Right-hand", bowling: "Right-arm medium", attendance: 94, progress: 84, joinedDate: "2023-10-02", avatar: "🧑" },
  { id: "s14", name: "Irfan Khan", age: 16, batchId: "u17-morning", category: "U17", role: "Batter", batting: "Left-hand", bowling: "-", attendance: 88, progress: 79, joinedDate: "2023-11-10", avatar: "👦" },
  { id: "s15", name: "Salman Ali", age: 15, batchId: "u17-morning", category: "U17", role: "Wicket-keeper", batting: "Right-hand", bowling: "-", attendance: 91, progress: 82, joinedDate: "2023-09-28", avatar: "🧑" },
];
// ============================
// PROGRAMS
// ============================
export const PROGRAMS: Program[] = [
  {
    id: "foundation",
    name: "Foundation Program",
    ageRange: "10-13 years",
    duration: "12 months",
    sessionsPerWeek: 3,
    monthlyFee: 3000,
    features: ["Basic cricket skills", "Physical fitness", "Discipline & teamwork", "Age-appropriate training", "Weekly match practice"],
    color: "#93c5fd",
  },
  {
    id: "development",
    name: "Development Program",
    ageRange: "13-15 years",
    duration: "12 months",
    sessionsPerWeek: 3,
    monthlyFee: 4000,
    features: ["Technical refinement", "Match strategy", "PCB U15 preparation", "Strength training", "Video analysis"],
    color: "#14a44d",
  },
  {
    id: "elite",
    name: "Elite Program",
    ageRange: "15-17 years",
    duration: "12 months",
    sessionsPerWeek: 4,
    monthlyFee: 5000,
    features: ["Match simulation", "Advanced tactics", "PCB U17 trials prep", "Professional coaching", "Fitness testing"],
    color: "#f0b429",
  },
  {
    id: "professional",
    name: "Professional Program",
    ageRange: "17-19 years",
    duration: "12 months",
    sessionsPerWeek: 4,
    monthlyFee: 6000,
    features: ["First-class prep", "Advanced match strategy", "Professional fitness", "Mental conditioning", "Career guidance"],
    color: "#fca5a5",
  },
];
// ============================
// HELPERS
// ============================
export function getCoach(id: string): Coach | undefined {
  return COACHES.find((c) => c.id === id);
}
export function getBatch(id: string): Batch | undefined {
  return BATCHES.find((b) => b.id === id);
}
export function getStudentsInBatch(batchId: string): Student[] {
  return STUDENTS.filter((s) => s.batchId === batchId);
}
export function getCoachBatches(coachId: string): Batch[] {
  return BATCHES.filter((b) => b.coachId === coachId || b.assistantCoachId === coachId);
}