import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { saveUserToStorage, saveTokenToStorage } from "../lib/utils";
import AuthHeader from "../components/AuthHeader";

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
            navigate("/notes");
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-base-300">
            <AuthHeader />
            <main className="flex-grow flex items-center justify-center px-4">
                <form onSubmit={handleLogin} className="bg-base-200 p-6 rounded-xl shadow-lg w-full max-w-md border border-base-content/10">
                    <h2 className="text-2xl font-bold text-base-content mb-6">Welcome Back</h2>
                    <label className="form-control w-full mb-4">
                        <span className="label-text text-base-content/80">Email</span>
                        <input
                            type="email"
                            className="input input-bordered w-full bg-base-100"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>
                    <label className="form-control w-full mb-2">
                        <span className="label-text text-base-content/80">Password</span>
                        <input
                            type="password"
                            className="input input-bordered w-full bg-base-100"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                    <div className="text-right mb-4">
                        <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                            Forgot password?
                        </Link>
                    </div>
                    <button type="submit" className="btn btn-primary w-full">Login</button>
                    <p className="mt-4 text-sm text-base-content/60 text-center">
                        Don't have an account? <Link to="/signup" className="link text-primary">Sign up</Link>
                    </p>
                </form>
            </main>
            <footer className="border-t border-base-content/10 py-4 text-center text-sm text-base-content/40">
                MerNote
            </footer>
        </div>
    );
};

export default LoginPage;