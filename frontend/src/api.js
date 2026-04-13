const API_BASE = "http://localhost:4000";

function getAuthHeaders() {
    const token = localStorage.getItem("authToken");
    return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function uploadPdf(file) {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${API_BASE}/upload`, {
        method: "POST",
        body: formData,
        headers: getAuthHeaders(),
    });

    return response.json();
}

export async function fetchSummary(text, length) {
    const response = await fetch(`${API_BASE}/summary`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({ text, length }),
    });

    return response.json();
}

export async function fetchAnswer(text, question) {
    const response = await fetch(`${API_BASE}/qa`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({ text, question }),
    });

    return response.json();
}

export async function loginUser(email, password) {
    const response = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    return response.json();
}

export async function signupUser(email, password) {
    const response = await fetch(`${API_BASE}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    return response.json();
}
