export interface User {
    id: string;
    email: string;
    name: string;
    picture?: string;
    phone?: string;
    role: "admin" | "user" | "scorer" | "club_owner" | "player";
    status: "active" | "pending" | "blocked";
    clubId?: string;
    createdAt: string;
    lastLogin?: string;
}
export interface UserSession {
    user: User;
    expiresAt: number;
}
