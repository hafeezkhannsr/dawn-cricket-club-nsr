// DAWN Cricket Club - Auth Utilities
// Yeh function logout karta hai aur home page par redirect karta hai
export async function logoutUser() {
    try {
        const res = await fetch('/api/v1/auth/logout', { method: 'POST' });
        if (res.ok) {
            window.location.href = '/';
            return true;
        }
        return false;
    } catch (error) {
        console.error('Logout failed:', error);
        return false;
    }
}
