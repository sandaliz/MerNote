export function formatDate(date) {
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

// --- User auth localStorage utils ---

const USER_KEY = "user";
const TOKEN_KEY = "token";

export function saveUserToStorage(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getUserFromStorage() {
    const userStr = localStorage.getItem(USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
}

export function removeUserFromStorage() {
    localStorage.removeItem(USER_KEY);
}

export function saveTokenToStorage(token) {
    localStorage.setItem(TOKEN_KEY, token);
}

export function getTokenFromStorage() {
    return localStorage.getItem(TOKEN_KEY);
}

export function removeTokenFromStorage() {
    localStorage.removeItem(TOKEN_KEY);
}

export function clearAuthStorage() {
    removeUserFromStorage();
    removeTokenFromStorage();
}