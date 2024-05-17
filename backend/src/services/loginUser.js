import { User } from "../models/User.js";
import { createToken } from "../utils/createToken.js";
import { hash } from "../utils/hash.js";
import { userToView } from "./helpers.js";

export async function loginUser({ email, password }) {
  const user = await User.findOne({ email });

  if (!user) throw new Error("User not found");

  // Unser Passwort ist erst mal Klartext
  // Wir wollen es (+ Salt) mit der Hash Funktion hashen
  // Danach vergleichen wir gehashtes Passwort (Anmeldung) mit gehashtem Passwort von Registrierung

  const hashPassword = hash(`${password}${user.passwordSalt}`);
  const correctPassword = hashPassword === user.passwordHash;

  if (!correctPassword) throw new Error("Invalid login");

  const accessToken = createToken(user);

  console.log(accessToken);
  return {
    user: userToView(user),
    tokens: { accessToken },
  };
}
