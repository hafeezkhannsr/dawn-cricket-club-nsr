import { readSheet } from "@/lib/sheets";
const USERS_SHEET = "Users";
export interface UserRecord {
    ID: string;
    Email: string;
    Name: string;
    Picture: string;
    Phone: string;
    Role: string;
    Status: string;
    ClubID: string;
    CreatedAt: string;
    LastLogin: string;
}
export async function getAllUsers(): Promise<UserRecord[]> {
    const users = await readSheet(USERS_SHEET);
    return users as UserRecord[];
}
export async function getUserByEmail(email: string): Promise<UserRecord | null> {
    const users = await getAllUsers();
    const user = users.find((u: any) => u.Email === email);
    return user || null;
}
export async function getUserById(id: string): Promise<UserRecord | null> {
    const users = await getAllUsers();
    const user = users.find((u: any) => u.ID === id);
    return user || null;
}
export function isAdmin(user: UserRecord | null): boolean {
    return user !== null && user.Role === "admin";
}
export function generateUserId(): string {
    return "USR-" + Date.now() + "-" + Math.random().toString(36).substring(2, 8).toUpperCase();
}
