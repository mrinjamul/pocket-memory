const bcrypt = require("bcrypt");

const saltRounds = 10;

async function hashAndSalt(password) {
  const hash = await bcrypt.hash(password, saltRounds).then(function (hash) {
    return hash;
  });
  return hash;
}

async function verifyHash(password, hash) {
  const match = await bcrypt.compare(password, hash);
  return match;
}

module.exports = { hashAndSalt, verifyHash };
