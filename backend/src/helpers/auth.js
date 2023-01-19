const { v4: uuidv4 } = require("uuid");

const returnUuid = () => {
  return uuidv4();
};

module.exports = { returnUuid };
