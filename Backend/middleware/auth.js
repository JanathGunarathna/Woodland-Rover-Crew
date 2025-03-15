import express from 'express';
import bcrypt from 'bcrypt';
const router = express.Router();
//const mysql = require('mysql2/promise');


// Login endpoint
router.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Get connection from pool
    const connection = await pool.getConnection();

    try {
      // Check if user exists
      const [users] = await connection.execute(
        'SELECT * FROM accounts WHERE email = ?',
        [email]
      );

      if (users.length === 0) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const user = users[0];

      // Verify password (assuming passwords are hashed in database)
      // If passwords are not hashed, replace this with a direct comparison
      const isValidPassword = await bcrypt.compare(password, user.password);
      // For plain text passwords use: const isValidPassword = password === user.password;

      if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Don't send sensitive information back to client
      const safeUser = {
        id: user.id,
        email: user.email,
        name: user.name,
        // Add other non-sensitive fields you want to send to the client
      };

      res.json({
        message: 'Login successful',
        user: safeUser
      });

    } finally {
      connection.release(); // Always release the connection back to the pool
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;