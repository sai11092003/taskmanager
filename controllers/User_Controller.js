const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const User = require('../model/user_Schema');
const bcrypt = require('bcrypt');

const Get_allelements = asyncHandler(async (req, res) => {
    const results = await User.find().select('-password').lean();
    if (!results.length) {
        return res.status(400).json({ message: 'No users found' });
    }
    res.status(200).json(results);
});

const Create_element = asyncHandler(async (req, res) => {
    const { username, password, roles } = req.body;
    if (!username || !password || !roles) {
        return res.status(400).json({ message: 'Username, password, and roles are required' });
    }
    const duplicate = await User.findOne({ username }).lean().exec();
    if (duplicate) {
        return res.status(400).json({ message: 'User already exists' });
    }
    const hashed_PWD = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashed_PWD, roles });
    const results = await newUser.save();
    if (!results) {
        return res.status(400).json({ message: 'User not created' });
    }
    res.status(201).json({ message: `Success: ${username} created` });
});

const Update_element = asyncHandler(async (req, res) => {
    const { id, username, password, roles, active } = req.body;
    if (!id || !username || !roles.length || typeof active !== 'boolean') {
        return res.status(400).json({ message: 'ID, username, roles, and active status are required' });
    }
    const user = await User.findById(id).exec();
    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }
    const duplicate = await User.findOne({ username }).lean().exec();
    if (duplicate && duplicate._id.toString() !== id) {
        return res.status(400).json({ message: 'Username already exists' });
    }
    if (password) {
        user.password = await bcrypt.hash(password, 10);
    }
    user.username = username;
    user.roles = roles;
    user.active = active;
    const results = await user.save();
    if (!results) {
        return res.status(400).json({ message: 'User not updated' });
    }
    res.status(200).json({ message: `Success: ${user.username} updated` });
});

const Delete_element = asyncHandler(async (req, res) => {
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({ message: 'User ID required' });
    }
    const foundUser = await User.findById(id).exec();
    if (!foundUser) {
        return res.status(400).json({ message: 'User not found' });
    }
    const results = await foundUser.deleteOne();
    if (!results) {
        return res.status(400).json({ message: 'User not deleted' });
    }
    res.status(200).json({ message: `Success: ${foundUser.username} deleted` });
});

module.exports = { Get_allelements, Delete_element, Update_element, Create_element };
