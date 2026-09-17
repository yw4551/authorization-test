import { useAuth } from "./useAuth";

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

    const response = await fetch(
        `http://localhost:${import.meta.env.PORT}${endpoint}`,
        {
            ...options,
            headers,
        },
    );

    const data = await response.json().catch(() => null);

    if (!response.ok) {
        throw new Error(data?.error || "Request failed");
    }

    return data;
};
