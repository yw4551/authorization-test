import { useAuth } from "./useAuth";

const port = 3001;

export const useFetch = async <T>(
    endpoint: string,
    options: RequestInit = {},
): Promise<T> => {
    const token = useAuth.getState().token;
    const headers = new Headers(options.headers);
    headers.set("Content-type", "application/json");

    if (token) {
        headers.set("Authorization", `Bearer ${token}`);
    }

    const response = await fetch(`http://localhost:${port}${endpoint}`, {
        ...options,
        headers,
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
        throw new Error(data?.error || "Request failed");
    }

    return data;
};
