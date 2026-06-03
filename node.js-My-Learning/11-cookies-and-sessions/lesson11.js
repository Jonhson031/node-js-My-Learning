const express = require('express');
const router = express.Router();
const db = require('./mongoDB');
const session = require("express-session");
const bcrypt = require('bcryptjs');
const MongoStore = require("connect-mongo").default;
const User = require('./models/userModel');
router.use(express.urlencoded({ extended: true }));

// * Configure Session
router.use(session({
    secret: "super-secret-key",
    resave: false,
    saveUninitialized: false,

    store: MongoStore.create({
        mongoUrl: process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD),
        collectionName: "lesson11-users"
    }),

    cookie: {
        maxAge: 1000 * 60 * 60 // 1 hour
    }
}));

const isAuth = (req, res, next) => {
    if (req.session.isAuth) {
        next()
    } else {
        res.redirect('/lesson11');
    }
}

// pages
router.get('/', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});
router.get('/register', (req, res) => {
    res.sendFile(__dirname + '/register.html');
});

router.get('/employee', isAuth, (req, res) => {
    res.sendFile(__dirname + '/employee.html');
});

router.get('/signout', isAuth, (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.send(
                `<div>
                    <h1>Error signing out!</h1>
                    <a href="/lesson11/employee">Go back</a>
            </div>`);
        }
        res.redirect('/lesson11')
    })
});

router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
        return res.send(
            `<div>
                <h1>This email is already registed!</h1>
                <a href="/lesson11/register">Go back</a>
        </div>`);
    }

    // * To ecnrypte password we use bcryptjs npm package
    const hashedPws = await bcrypt.hash(password, 12); // 12 - Salt length to generate or salt to use

    const newUser = await User.create({
        email,
        password: hashedPws
    })

    res.send(
        `<div>
                <h1>Succefully registed!</h1>
                <a href="/lesson11">Go back</a>
        </div>`);
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.send(
            `<div>
                <h1>User with this email is not registed yet!</h1>
                <a href="/lesson11/register">Register new user</a>
                <br/>
                <br/>
                <a href="/lesson11">Go back to login</a>
        </div>`);
    }
    console.log(user);

    // To compare password
    const isPasswordsMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordsMatched) {
        return res.send(
            `<div>
                <h1>Wrong password!</h1>
                <a href="/lesson11">Try again!</a>
        </div>`);
    }

    req.session.isAuth = true;

    req.session.save(() => {
        res.redirect('/lesson11/employee');
    });
})


module.exports = router;