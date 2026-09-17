import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../context/useFetch";

interface ProfileType {
    _id: string;
    name: string;
    email: string;
    phone: string;
}

const Profile = () => {
    const [profile, setProfile] = useState<ProfileType | null>();
    const [error, setError] = useState<String | null>(null);

    const logout = useAuth((state) => state.logout);
    const navigate = useNavigate();

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const data = await useFetch<ProfileType>(
                    `/auth/${profile?._id}`,
                );
                setProfile(data);
            } catch (err) {
                setError(
                    err instanceof Error ? err.message : "Failed to load users",
                );
            }
        };

        loadProfile();
    }, []);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div>
            <nav>
                <strong>Auth App</strong>
                <button onClick={handleLogout}>Logout</button>
            </nav>

            <h1>{profile?.name}'s profile</h1>

            <p>id: {profile?._id}</p>
            <p>Name: {profile?.name}</p>
            <p>Email: {profile?.email}</p>

            {error && <p>{error}</p>}
        </div>
    );
};

export default Profile;
