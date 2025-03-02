import User from "../models/UserSchema.js";
import bcrypt from "bcrypt";
import validator from "validator";

// Register a new user
export const registerControllers = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Input validation
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please enter all fields",
            });
        }

        // Validate email
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email address",
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists",
            });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        // Exclude password from the response
        const userResponse = { ...newUser._doc };
        delete userResponse.password;

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            user: userResponse,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

// Login a user
export const loginControllers = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Input validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please enter all fields",
            });
        }

        // Find the user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        // Exclude password from the response
        const userResponse = { ...user._doc };
        delete userResponse.password;

        return res.status(200).json({
            success: true,
            message: `Welcome back, ${user.name}`,
            user: userResponse,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

// Set user avatar
export const setAvatarController = async (req, res) => {
    try {
        const userId = req.params.id;
        const { image } = req.body;

        // Validate the image URL
        if (!validator.isURL(image)) {
            return res.status(400).json({
                success: false,
                message: "Invalid image URL",
            });
        }

        // Update the user's avatar
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                isAvatarImageSet: true,
                avatarImage: image,
            },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            isSet: updatedUser.isAvatarImageSet,
            image: updatedUser.avatarImage,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

// Fetch all users except the current user
export const allUsers = async (req, res) => {
    try {
        const users = await User.find({ _id: { $ne: req.params.id } }).select([
            "email",
            "name",
            "avatarImage",
            "_id",
        ]);

        return res.status(200).json({
            success: true,
            users,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};