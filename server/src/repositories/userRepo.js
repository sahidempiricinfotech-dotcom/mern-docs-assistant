const { getNativeDb } = require('../db');

async function createUser(input) {
  const db = getNativeDb();
  const now = new Date();

  const doc = {
    email: input.email,
    passwordHash: input.passwordHash,
    roles: input.roles || ['developer'],
    createdAt: now,
    updatedAt: now
  };

  const result = await db.collection('users').insertOne(doc);
  return { _id: result.insertedId, ...doc };
}

async function findUserByEmail(email) {
  const db = getNativeDb();

  return new Promise((resolve, reject) => {
    db.collection('users').findOne({ email }, (err, doc) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(doc);
    });
  });
}

module.exports = {
  createUser,
  findUserByEmail
};
