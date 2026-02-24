import bcrypt from "bcrypt";

export const hashPassword = async(password) => {
    const saltRounds = 10;
    const hashed_password = bcrypt.hash(password, saltRounds);
    return hashed_password;
}