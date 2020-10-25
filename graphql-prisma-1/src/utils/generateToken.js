import jwt from 'jsonwebtoken';

const generateToken = (userId) =>
  jwt.sign({ userId }, 'secret', { expiresIn: '7 days' });

export default generateToken;
