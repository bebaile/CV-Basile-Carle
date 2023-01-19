const { v4: uuidv4 } = require("uuid");
const argon2 = require("argon2");

const returnUuid = () => {
  return uuidv4();
};

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

const hashPassword = (plainPassword) => {
  return argon2.hash(plainPassword, hashingOptions);
};

const verifyPassword = (plainPassword, hashedPassword) => {
  return argon2.verify(hashedPassword, plainPassword);
};

module.exports = { returnUuid, hashPassword, verifyPassword };
