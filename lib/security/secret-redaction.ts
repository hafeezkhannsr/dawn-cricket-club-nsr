const KEYS = ['password','token','secret','key','cnic'];
export function redact(o: any): any { if (!o||typeof o!=='object') return o; const r: any = Array.isArray(o)?[]:{}; for (const [k,v] of Object.entries(o)) { if (KEYS.some(s=>k.toLowerCase().includes(s))) r[k]='***'; else if (typeof v==='object') r[k]=redact(v); else r[k]=v; } return r; }
