const bcrypt = require("bcrypt");

exports.encrypt = async text => {
  if (!text) return "";
  console.log(text);
  return await bcrypt.hash(text, 10);
};
