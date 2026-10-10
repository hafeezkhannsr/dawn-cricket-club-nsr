export interface Club {
    id: string;
    name: string;
    logo?: string;
    city: string;
    province: string;
    ownerId: string;
    ownerName: string;
    ownerEmail: string;
    contact: string;
    teamsCount: number;
    playersCount: number;
    status: "active" | "pending" | "verified";
    createdAt: string;
}
