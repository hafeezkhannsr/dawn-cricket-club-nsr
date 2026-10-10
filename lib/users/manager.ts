import { readSheet } from "@/lib/sheets";
const USERS_SHEET = "Users";
export async function getAllUsers() {
    return await readSheet(USERS_SHEET);
}
export async function getUserByEmail(email: string) {
    const users = await getAllUsers();
    return users.find((u: any) => u.Email === email);
}
export async function getUserById(id: string) {
    const users = await getAllUsers();
    return users.find((u: any) => u.ID === id);
}
export function isAdmin(user: any): boolean {
    return user && user.Role === "admin";
}
