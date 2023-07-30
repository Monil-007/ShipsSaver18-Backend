const cookieSession = require("cookie-session");
const express = require('express');
const connectDB = require('./DB/database.js');
const passportSetup = require("./passport");
const passport = require("passport");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
var cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(
    cors({
        origin: ["http://localhost:3001", "https://shipsaver.onrender.com"],
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
    })
);

const routes = require('./Routes/route.js');
const authRoute = require("./Routes/auth.js");
const authManualRoute = require("./Routes/authManual.js");



app.use(express.static('public'));
app.use(bodyParser.json());
app.use(
    cors({
        origin: "http://localhost:3001",
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
    })
);
// app.use(cors({
//     origin: 'http://localhost:3001',
//     credentials: true
// }));
//app.use(cors());

app.use(
    cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
);

app.use(passport.initialize());
app.use(passport.session());


app.use('/', routes);
//app.use('/auth', authRoute);
app.use("/auth", authRoute);
app.use("/authManual", authManualRoute);

app.listen(3000, async function (req, res) {
    await connectDB();

});