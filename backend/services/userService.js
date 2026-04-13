// Simple in-memory user store. For production, use a database.
const users = new Map();

export function getUserByEmail(email) {
    return users.get(email);
}

export function createUser(email, password) {
    if (users.has(email)) {
        return null; // User already exists
    }

    const user = { email, password };
    users.set(email, user);
    return user;
}

export function validateUserCredentials(email, password) {
    const user = users.get(email);
    return user && user.password === password ? user : null;
}
