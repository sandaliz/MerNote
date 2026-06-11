import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../lib/axios";
import toast from "react-hot-toast";
import AuthHeader from "../components/AuthHeader";

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post("/auth/forgot-password", { email });
            setSent(true);
            toast.success("Reset link sent to your email");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to send reset email");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-base-300">
            <AuthHeader />
            <main className="flex-grow flex items-center justify-center px-4">
                <div className="bg-base-200 p-6 rounded-xl shadow-lg w-full max-w-md border border-base-content/10">
                    {sent ? (
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-base-content mb-4">Check Your Email</h2>
                            <p className="text-base-content/70 mb-6">
                                If an account exists for <strong>{email}</strong>, we've sent a password reset link.
                            </p>
                            <Link to="/login" className="btn btn-primary">Back to Login</Link>
                        </div>
                    ) : (
                        <>
                            <h2 className="text-2xl font-bold text-base-content mb-2">Reset Password</h2>
                            <p className="text-sm text-base-content/60 mb-6">
                                Enter your email address and we'll send you a reset link.
                            </p>
                            <form onSubmit={handleSubmit}>
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
                                <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                                    {loading ? <span className="loading loading-spinner"></span> : "Send Reset Link"}
                                </button>
                            </form>
                            <p className="mt-4 text-sm text-base-content/60 text-center">
                                Remember your password? <Link to="/login" className="link text-primary">Login</Link>
                            </p>
                        </>
                    )}
                </div>
            </main>
            <footer className="border-t border-base-content/10 py-4 text-center text-sm text-base-content/40">
                MerNote
            </footer>
        </div>
    );
};

export default ForgotPasswordPage;