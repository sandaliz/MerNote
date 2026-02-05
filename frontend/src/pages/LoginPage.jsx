import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { saveUserToStorage, saveTokenToStorage } from "../lib/utils";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await api.post("/auth/login", { email, password });
            saveUserToStorage(data.user);
            saveTokenToStorage(data.token);
            toast.success("Logged in successfully!");
            navigate("/");
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-100">
            <form onSubmit={handleLogin} className="bg-base-200 p-6 rounded shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
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
                <button type="submit" className="btn btn-primary w-full">Login</button>
                <p className="mt-4 text-sm">
                    Don’t have an account? <Link to="/signup" className="link text-primary">Sign up</Link>
                </p>
            </form>
        </div>
    );
};

export default LoginPage;
