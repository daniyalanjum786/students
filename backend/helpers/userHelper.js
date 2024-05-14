import bcrypt from "bcrypt";

const passwordEncrypt = async (plainPassword) => {
  const saltRounds = 10;
  const encryptedPassword = await bcrypt.hash(plainPassword, saltRounds);
  return encryptedPassword;
};

const passwordCompare = async (plainPassword, encryptedPassword) => {
  return bcrypt.compare(plainPassword, encryptedPassword);
};

export { passwordEncrypt, passwordCompare };
