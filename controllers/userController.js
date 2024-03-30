const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const { restart } = require("nodemon");`/`

//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    // check for User to provide username, password and email
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are required.");
    };

    // check for Available User with email || check duplicate emails
    userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("User email already Exist");
    }
    
    // hashed a user password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed password is:', hashedPassword);

    // create a new user
    const user = await User.create({
        username, email, password: hashedPassword,
    });

    console.log(`Registered Successfully ${user}`);
    if (user) {
        res.status(201).json({ _id: user.id, username: user.username, email: user.email })
    } else {
        res.status(400);
        throw new Error("User info not Valid");
    };

    res.send({ Message: "User Registration" });
    console.log("Registration Successful");
});

//@desc Login a user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
    
    // destructure email and password
    const { email, password } = req.body;

    // Check if email and password is provided
    if (!email || !password) {
        res.status(400);
        throw new Error("Email and Password field required");
    }
    // check a user email
    const user = await User.findOne({ email })

    // compare hashedPassword with user
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id,
            },
        }, process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '20m' },
        );
        
        
        res.status(200).json({ accessToken });
    } else {
        res.status(401);
        throw new Error("Email and Pasword not found");
    }
    console.log("Login Successful");
});

//@desc Current user info
//@route GET /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
    res.send(req.user)
});



module.exports = { registerUser, loginUser, currentUser }