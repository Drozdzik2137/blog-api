const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register User
const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check if all required fields are present in the request body
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: 'Please provide all required information' });
    }

    // Check if a user with the provided email already exists
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(409).json({ message: 'User with this e-mail address already exists' });
    }

    // Create new User
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ 
        firstName: firstName, 
        lastName: lastName,
        email: email, 
        password: hashedPassword,
        createdAt: new Date()
    });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('User registration error:', error);
    res.status(500).json({ message: 'An error occurred during user registration' });
  }
};

 // Activate user account (only accessible by admin)
 const activateUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const requestingUserId = req.user.id;
    const requestingUser = await User.findById(requestingUserId)

    // Admins cannot deactivate their account
    if (requestingUser.role != 1001){
      return res.status(403).json({ error: 'You cannot do this!' });
    }

    // Deactivate the user account
    user.isActive = true;
    await user.save();

    res.status(200).json({ message: 'User account activated' });
  } catch (err) {
    console.error('Error activating user account:', err);
    res.status(500).json({ error: 'Failed to activate user account' });
  }
}

 // Deactivate user account (only accessible by admin)
 const deactivateUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const requestingUserId = req.user.id;
    const requestingUser = await User.findById(requestingUserId)

    // Admins cannot deactivate their account
    if (user.role == 1001 || requestingUser.role != 1001){
      return res.status(403).json({ error: 'You cannot do this!' });
    }

    // Deactivate the user account
    user.isActive = false;
    await user.save();

    res.status(200).json({ message: 'User account deactivated' });
  } catch (err) {
    console.error('Error deactivating user account:', err);
    res.status(500).json({ error: 'Failed to deactivate user account' });
  }
}

const changeUserRole =  async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    if(role == 1001){
      return res.status(403).json({ error: 'You cannot do this!' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const requestingUserId = req.user.id;
    const requestingUser = await User.findById(requestingUserId)

    // Only admin can change user roles for others
    if (user.role == 1001 || requestingUser.role != 1001) {
      return res.status(403).json({ error: 'You cannot do this!' });
    }

    // Update the user role
    user.role = role;
    await user.save();

    res.status(200).json({ message: 'User role updated' });
  } catch (err) {
    console.error('Error changing user role:', err);
    res.status(500).json({ error: 'Failed to change user role' });
  }
}

const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select('-password -refreshToken');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const requestingUserId = req.user.id;
    const requestingUser = await User.findById(requestingUserId)

    if(requestingUser.role != 1001 || requestingUser.role != 101){
      // Check if requesting user id == id (from params)
      if(requestingUserId == id){
        // return user data
        return res.status(200).json(user);
      }else{
        console.log("Unauthorized!");
        return res.sendStatus(403);
      }
    }else{
      return res.status(200).json(user);
    }
  }catch(err){
    console.log('Error while fetching user data:', err);
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
}

const getAllUsers = async (req, res) => {
  try {
    const id = req.user.id; 

    const user = await User.findById(id).select('-password -refreshToken');

    // Sprawdź, czy użytkownik jest administratorem
    if (user.role != 1001) {
      return res.status(403).json({ error: 'No authority to perform this operation' });
    }

    // Pobierz dane wszystkich użytkowników z wyłączeniem refreshToken i hasła
    const users = await User.find().select('-refreshToken -password');

    return res.json(users);
  }catch(err){
    console.log('Error while fetching users data:', err);
    res.status(500).json({ error: 'Failed to fetch users data' });
  }
}

module.exports = {
  registerUser,
  activateUser,
  deactivateUser,
  changeUserRole,
  getUser: getUser,
  getAllUsers: getAllUsers
};
