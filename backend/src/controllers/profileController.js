import User from "../models/User.js";

export async function getProfile(req, res) {
    try {
        const user = await User.findById(req.user._id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found!" });
        res.status(200).json(user);
    } catch (error) {
        console.error("Get profile error:", error);
        res.status(500).json({ message: "Internal Server Error!" });
    }
}

export async function updateProfile(req, res) {
    try {
        const { name, username, email } = req.body;
        
        // Check if username is already taken (excluding current user)
        if (username && username !== req.user.username) {
            const existingUser = await User.findOne({ username });
            if (existingUser) {
                return res.status(400).json({ message: "Username already taken!" });
            }
        }

        // Check if email is already taken (excluding current user)
        if (email && email !== req.user.email) {
            const existingEmail = await User.findOne({ email: email.toLowerCase() });
            if (existingEmail) {
                return res.status(400).json({ message: "Email already in use!" });
            }
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            { 
                name: name || req.user.name,
                username: username || req.user.username,
                email: email ? email.toLowerCase() : req.user.email
            },
            { new: true }
        ).select("-password");

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Update profile error:", error);
        res.status(500).json({ message: "Internal Server Error!" });
    }
}
