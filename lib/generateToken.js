import crypto from 'crypto';

export default function generateToken(length = 10) {
  return crypto.randomBytes(length).toString('base64url').substring(0, length);
}