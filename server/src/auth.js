const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const header = req.get('authorization') || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: 'Missing bearer token' });
  }

  const payload = jwt.decode(token);

  if (!payload || !payload.sub) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  req.user = {
    id: payload.sub,
    email: payload.email,
    roles: payload.roles || []
  };

  return next();
}

function signAccessToken(user) {
  return jwt.sign(
    { sub: user.id, email: user.email, roles: user.roles || [] },
    process.env.JWT_SECRET || 'dev-secret',
    { expiresIn: '15m' }
  );
}

module.exports = {
  authMiddleware,
  signAccessToken
};
