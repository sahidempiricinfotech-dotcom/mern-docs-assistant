const express = require('express');

const { createUser, findUserByEmail } = require('../repositories/userRepo');
const { signAccessToken } = require('../auth');

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json({ user });
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const user = await findUserByEmail(req.body.email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    res.json({
      token: signAccessToken(user),
      user: { id: user._id, email: user.email }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
