const router = require("express").Router();
const passport = require("passport");

const CLIENT_URL = "http://localhost:3001/welcome";

router.get("/login/success", (req, res) => {
    console.log("displaying name:" + req.user.displayName);
    if (req.user) {
        res.status(200).json({
            success: true,
            message: "successfull",
            user: req.user,
            //   cookies: req.cookies
        });
    }
    else {
        console.log("no user found");
    }
});

router.get("/login/failed", (req, res) => {
    res.status(401).json({
        success: false,
        message: "failure",
    });
});

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect('http://localhost:3001/dashboard');
});

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
    "/google/callback",
    passport.authenticate("google", {
        successRedirect: CLIENT_URL,
        failureRedirect: "/login/failed",
    })
);

router.get("/github", passport.authenticate("github", { scope: ["profile"] }));


router.get(
    "/github/callback",
    passport.authenticate("github", {
        successRedirect: CLIENT_URL,
        failureRedirect: "/login/failed",
    })
);

router.get("/twitter", passport.authenticate("twitter", { scope: ["profile"] }));

router.get(
    "/twitter/callback",
    passport.authenticate("twitter", {
        successRedirect: CLIENT_URL,
        failureRedirect: "/login/failed",
    })
);

module.exports = router