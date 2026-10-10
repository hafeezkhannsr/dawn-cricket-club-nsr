export const ALLOWED_IMG = ['image/jpeg','image/png','image/webp'];
export const MAX_SIZE = 5*1024*1024;
export const validateFile = (f: File, allowed: string[]) => allowed.includes(f.type) && f.size <= MAX_SIZE;
