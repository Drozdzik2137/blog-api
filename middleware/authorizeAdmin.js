const authorizeAdmin = (req, res, next) => {
    const userRole = req.user.role;
  
    if (userRole === 1001) {
      // Użytkownik ma rolę administratora
      next();
    } else {
      res.status(403).json({ error: 'Unauthorized' });
    }
  };
  
module.exports = { 
    authorizeAdmin: authorizeAdmin
};