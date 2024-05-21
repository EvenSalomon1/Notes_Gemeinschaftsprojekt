import { registerUser } from "./registerUser.js";
import { verifyUser } from "./verifyUser.js";
import { loginUser } from "./loginUser.js";
import { refreshAccessToken } from "./refreshAccessToken.js";

export const UserService = {
  registerUser,
  verifyUser,
  loginUser,
  refreshAccessToken,
};
