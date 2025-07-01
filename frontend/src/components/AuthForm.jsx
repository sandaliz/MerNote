import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { EyeIcon, EyeOffIcon } from 'lucide-react'

const AuthForm = ({ type = "login", onSubmit, isLoading }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [showPassword, setShowPassword] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(formData)
    }

    const isSignup = type === "signup"

    return (
        <form onSubmit={handleSubmit} className="bg-base-100 shadow-md rounded-lg p-6 w-full max-w-md mx-auto space-y-4">
            <h2 className="text-2xl font-bold text-center">{isSignup ? "Create an account" : "Welcome back"}</h2>

            {isSignup && (
                <div className="form-control">
                    <label className="label" htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="input input-bordered"
                        placeholder="Your full name"
                    />
                </div>
            )}

            <div className="form-control">
                <label className="label" htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="input input-bordered"
                    placeholder="you@example.com"
                />
            </div>

            <div className="form-control relative">
                <label className="label" htmlFor="password">Password</label>
                <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="input input-bordered pr-10"
                    placeholder="••••••••"
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(prev => !prev)}
                    className="absolute right-3 top-[45%] text-sm text-base-content/60"
                >
                    {showPassword ? <EyeOffIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                </button>
            </div>

            <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={isLoading}
            >
                {isLoading ? "Loading..." : isSignup ? "Sign Up" : "Login"}
            </button>

            <div className="text-sm text-center text-base-content/70">
                {isSignup
                    ? <>Already have an account? <Link to="/login" className="text-primary underline">Login here</Link></>
                    : <>Don't have an account? <Link to="/signup" className="text-primary underline">Sign up here</Link></>
                }
            </div>
        </form>
    )
}

export default AuthForm
