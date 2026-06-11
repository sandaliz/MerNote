import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../lib/axios";
import toast from "react-hot-toast";
import AuthHeader from "../components/AuthHeader";

const ResetPasswordPage = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== password2) {
            toast.error("Passwords do not match");
            return;
        }
        if (password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }
        setLoading(true);
        try {
            await api.post(`/auth/reset-password/${token}`, { password });
            toast.success("Password reset successfully!");
            navigate("/login");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to reset password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-base-300">
            <AuthHeader />
            <main className="flex-grow flex items-center justify-center px-4">
                <form onSubmit={handleSubmit} className="bg-base-200 p-6 rounded-xl shadow-lg w-full max-w-md border border-base-content/10">
                    <h2 className="text-2xl font-bold text-base-content mb-2">Set New Password</h2>
                    <p className="text-sm text-base-content/60 mb-6">Enter your new password below.</p>
                    <label className="form-control w-full mb-4">
                        <span className="label-text text-base-content/80">New Password</span>
                        <input
                            type="password"
                            className="input input-bordered w-full bg-base-100"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="At least 6 characters"
                            required
                        />
                    </label>
                    <label className="form-control w-full mb-4">
                        <span className="label-text text-base-content/80">Confirm Password</span>
                        <input
                            type="password"
                            className="input input-bordered w-full bg-base-100"
                            value={password2}
                            onChange={(e) => setPassword2(e.target.value)}
                            placeholder="Repeat your password"
                            required
                        />
                    </label>
                    <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                        {loading ? <span className="loading loading-spinner"></span> : "Reset Password"}
                    </button>
                    <p className="mt-4 text-sm text-base-content/60 text-center">
                        <Link to="/login" className="link text-primary">Back to Login</Link>
                    </p>
                </form>
            </main>
            <footer className="border-t border-base-content/10 py-4 text-center text-sm text-base-content/40">
                MerNote
            </footer>
        </div>
    );
};

export default ResetPasswordPage;