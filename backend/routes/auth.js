const router = require("express").Router();
const User = require("../Models/user");
const bcrypt = require("bcryptjs");

//SIGN UP
router.post("/register", async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const hashpassword = bcrypt.hashSync(password);

        //check if user is already present or not
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(200).json({ message: "User already exists!" });
        }

        //create and save new user
        const user = new User({ email, username, password: hashpassword });
        await user.save();
        res.status(200).json({ message:"Sign Up Successfull!" });

    } catch (error) {
        res.status(500).json({ message: "An error occured during registration" });
    }
});

//SIGN IN
router.post("/signin", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            res.status(200).json({ message: "Please Sign up first." });
        }

        const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);
        if (!isPasswordCorrect) {
            res.status(200).json({ message: "Password Incorrect." });
        }
        const {password,...others} = user._doc;
        return res.status(200).json({ others });

    } catch (error) {
        res.status(200).json({ message: "An error occured during registration" });
    }
});

module.exports = router;