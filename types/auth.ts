export interface User { id: string; email: string; name: string; role: string; permissions: string[]; createdAt: string; }
export interface Session { user: User; expiresAt: number; }
