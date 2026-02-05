import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { saveUserToStorage, saveTokenToStorage } from "../lib/utils";

const SignupPage = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const { data } = await api.post("/auth/signup", { username, email, password });
            saveUserToStorage(data.user);
            saveTokenToStorage(data.token);
            toast.success("Account created successfully!");
            navigate("/");
        } catch (error) {
            toast.error(error.response?.data?.message || "Signup failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-100">
            <form onSubmit={handleSignup} className="bg-base-200 p-6 rounded shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
                <label className="form-control w-full mb-4">
                    <span className="label-text">Username</span>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </label>
                <label className="form-control w-full mb-4">
                    <span className="label-text">Email</span>
                    <input
                        type="email"
                        className="input input-bordered w-full"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label className="form-control w-full mb-4">
                    <span className="label-text">Password</span>
                    <input
                        type="password"
                        className="input input-bordered w-full"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <button type="submit" className="btn btn-primary w-full">Sign Up</button>
                <p className="mt-4 text-sm">
                    Already have an account? <Link to="/login" className="link text-primary">Login</Link>
                </p>
            </form>
        </div>
    );
};

export default SignupPage;
