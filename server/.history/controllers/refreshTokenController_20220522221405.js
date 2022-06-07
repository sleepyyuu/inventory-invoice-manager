const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.refresh_token_get = async function (req, res) {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.sendStatus(401);
  }
  const refreshToken = cookies.jwt;
  console.log("searching for " + refreshToken);
  res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
  const foundUser = await User.findOne({ refreshToken }).exec();
  //if duplicate refresh token use attempted, ie old refresh token/expired/used
  if (!foundUser) {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
      if (err) {
      } else {
        const hackedUser = await User.findOne({ username: decoded.username }).exec();
        hackedUser.refreshToken = []; //clear refresh tokens for hacked user
        await hackedUser.save();
      }
    });
    return res.sendStatus(403);
  } else {
    const newRefreshTokenArray = foundUser.refreshToken.filter((token) => token !== refreshToken);

    await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
      if (err) {
        foundUser.refreshToken = [...newRefreshTokenArray];
        await foundUser.save();
      }
      if (err || foundUser.username !== decoded.username) {
        return res.sendStatus(403);
      }
      const accessToken = jwt.sign({ username: decoded.username }, process.env.JWT_TOKEN, { expiresIn: "10m" });
      const newRefreshToken = jwt.sign({ username: decoded.username }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "10d",
      });
      foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
      await foundUser.save();
      console.log("old" + refreshToken);
      console.log("new" + newRefreshToken);
      res.cookie("jwt", newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.json({ accessToken, username: decoded.username });
    });
  }
};
