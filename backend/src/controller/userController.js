import { UserService } from "../services/index.js";

async function postRegisterUserCtrl(req, res) {
  try {
    const userInfo = req.body;
    // speicher mir all die userInfo in meine Variable result
    const result = await UserService.registerUser(userInfo);
    // und schreibe das in meinen body und gebe das zurück
    res.json({ result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err, message: err.message });
  }
}

async function postVerifyUserCtrl(req, res) {
  try {
    const verifyEmailInfo = {
      userId: req.body.userId,
      sixDigitCode: req.body.sixDigitCode,
    };
    const result = await UserService.verifyUser(verifyEmailInfo);
    res.json({ result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err, message: err.message });
  }
}

async function postLoginUserCtrl(req, res) {
  try {
    const loginInfo = {
      email: req.body.email,
      password: req.body.password,
    };
    const result = await UserService.loginUser(loginInfo);
    //- hier refresh token abfrage einfügen
    res.json({ result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err, message: err.message });
  }
}

export const UserController = {
  postRegisterUserCtrl,
  postVerifyUserCtrl,
  postLoginUserCtrl,
};
