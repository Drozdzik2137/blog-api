const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Rejestracja użytkownika
const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Sprawdź, czy użytkownik o podanym emailu już istnieje
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: 'Użytkownik o tym adresie e-mail już istnieje' });
    }

    // Stwórz nowego użytkownika
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ 
        firstName: firstName, 
        lastName: lastName,
        email: email, 
        password: hashedPassword,
        createdAt: new Date()
    });
    await newUser.save();

    res.status(201).json({ message: 'Użytkownik zarejestrowany pomyślnie' });
  } catch (error) {
    console.error('Błąd rejestracji użytkownika:', error);
    res.status(500).json({ message: 'Wystąpił błąd podczas rejestracji użytkownika' });
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

module.exports = {
  registerUser,
  activateUser,
  deactivateUser,
  changeUserRole
};