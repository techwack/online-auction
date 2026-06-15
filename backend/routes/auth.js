const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const usersFile = path.join(__dirname, '../data/users.json');

const getUsers = () => {
  if (!fs.existsSync(usersFile)) fs.writeFileSync(usersFile, '[]');
  return JSON.parse(fs.readFileSync(usersFile, 'utf-8'));
};
const saveUsers = (users) => fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: 'All fields are required' });

  const users = getUsers();
  if (users.find(u => u.email === email))
    return res.status(400).json({ message: 'Email already registered' });

  const hashed = await bcrypt.hash(password, 10);
  const user = { id: Date.now(), name, email, password: hashed };
  users.push(user);
  saveUsers(users);

  const token = jwt.sign(
    { id: user.id, name, email },
    process.env.JWT_SECRET || 'secret123',
    { expiresIn: '7d' }
  );
  res.status(201).json({ token, user: { id: user.id, name, email } });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: 'Email and password are required' });

  const users = getUsers();
  const user = users.find(u => u.email === email);
  if (!user) return res.status(400).json({ message: 'Invalid email or password' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: 'Invalid email or password' });

  const token = jwt.sign(
    { id: user.id, name: user.name, email },
    process.env.JWT_SECRET || 'secret123',
    { expiresIn: '7d' }
  );
  res.json({ token, user: { id: user.id, name: user.name, email } });
});

module.exports = router;
