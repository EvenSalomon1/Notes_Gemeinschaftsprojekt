import { User } from "../models/User.js";
import { generateRandomSalt, hash } from "../utils/hash.js";
import { sendEmail } from "../utils/sendEmail.js";
import { generateRandomSixDigitCode } from "../utils/sixDigitCode.js";
import { userToView } from "./helpers.js";

export async function registerUser({ firstname, lastname, email, password }) {
  const foundUserWithEmail = await User.findOne({ email });
  if (foundUserWithEmail)
    throw new Error("User with this email already has an account");

  const passwordSalt = generateRandomSalt();
  const passwordHash = hash(`${password}${passwordSalt}`);

  const sixDigitCode = generateRandomSixDigitCode();

  const user = await User.create({
    firstname,
    lastname,
    email,
    passwordHash,
    passwordSalt,
    sixDigitCode,
  });

  await sendEmailVerification(user);

  return userToView(user);
}

async function sendEmailVerification(user) {
  return sendEmail({
    to: user.email,
    subject: "Welcome to Notes.io",
    text: `Hi ${user.firstname},
    welcome to Todo.io 🎉!!!
    Please enter the below six-digit-code verify your account to be able to login.
    ${user.sixDigitCode}
    See you on the other side :)
    - Bester SuperCode Kurs from Todo.io
    `,
  });
}
