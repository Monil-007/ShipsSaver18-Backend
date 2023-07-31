const router = require("express").Router();
const passport = require("passport");

const CLIENT_URL = "https://shipsaver18-frontend.onrender.com/welcome";

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
    res.redirect('https://shipsaver18-frontend.onrender.com/dashboard');
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