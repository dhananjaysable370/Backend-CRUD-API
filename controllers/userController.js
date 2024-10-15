import { User } from "../models/userModel.js";

export const create = async (req, res) => {
    try {
        const { name, email } = req.body;
        const userExists = await User.findOne({ name, email });

        if (userExists) {
            return res.status(400).json({ success: false, message: "User already exists!" });
        }

        const createUser = new User({ name, email });
        const result = await createUser.save();

        return res.status(200).json({ success: true, message: "User created successfully.", result });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error!" });
    }
};

export const read = async (req, res) => {
    try {
        const users = await User.find({});
        if (!users) {
            res.status(403).json({ success: false, message: "No users found!" });
        }
        res.status(200).json({ success: true, users });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error!" });
    }
}

export const oneUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            res.status(404).json({ success: false, message: "User not found!" });
        }
        res.status(200).json({ success: true, user});
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
    }
}

export const update = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedUser) {
            res.status(403).json({ success: false, message: "Failed to update user!" });
        }
        res.status(200).json({ success: true, message: "User updated successfully..", updatedUser });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error!" });
    }
}

export const delUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteUser = await User.findByIdAndDelete(id);
        if (!deleteUser) {
            res.status(404).json({ success: false, message: "Failed to delete user" });
        }
        res.status(200).json({ success: true, message: "User deleted successfully..", deleteUser });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error!" });
    }
}