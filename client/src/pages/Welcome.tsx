import { Link } from "react-router-dom";

function Welcome() {
    return (
        <>
            <h1>Welcome</h1>
            <h2>to your profile</h2>
            <div className="links">
                <Link to="/register">Register</Link>
                <Link to="/login">Login</Link>
            </div>
        </>
    );
}

export default Welcome;
