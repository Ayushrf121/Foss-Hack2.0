import bcrypt from 'bcrypt';
import UserModel from '../models/users.js';
import jwt from 'jsonwebtoken'
import validator from 'validator'
// google controller
import { OAuth2Client } from 'google-auth-library';
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleAuth = async (req, res) => {
    const { token } = req.body;
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        });
        const payload = ticket.getPayload();
        const { name, email, sub } = payload;
        let user = await UserModel.findOne({ email });
        if (user) {
            // user exists but signed up manually
            if (user.provider === 'local') {
                return res.json({
                    success: false,
                    message: "Account already exists. Login with email & password"
                })
            }

        }
        else {
            // create google user
            user = new UserModel({
                name,
                email,
                googleId: sub,
                provider: 'google'
            });

            await user.save();
        }

        const tokenJWT = createToken(user._id);

        res.json({
            success: true,
            token: tokenJWT
        });
    } catch (error) {
        res.json({
            success:false,
            message:"Google Authentication Failed"
        })
}
}
// token generated
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
}
const signup = async (req, res) => {
    try {

        const { name, email, password } = req.body;
        // Checks user exist or not.
        const existUser = await UserModel.findOne({ email });
        if (existUser) {
            // 409 Some Conflict occurs...
            return res.status(409).json({
                message: "Data already existed in DB you can login", success: false
            })
        }
        // validating email format and strong password
        if (!validator.isEmail(email)) {
            return res.status(409).json({
                message: "Please enter a valid email", success: false
            })
        }


        const newUser = new UserModel({
            name, email, password
        });

        newUser.password = await bcrypt.hash(password, 10);

        const user = await newUser.save();
        const token = createToken(user._id);
        // 201 req successfully fullfilled!
        res.status(201).json({ message: "Signup Successfully", success: true, token });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error!",
            success: false
        })
    }
}
// 500 Internal Error by server
const login = async (req, res) => {
    try {

        const { email, password } = req.body;
        const existingUser = await UserModel.findOne({ email });
        // google login
        if (existingUser.provider === 'google') {
            return res.status(403).json({
                message: "Please login using Google",
                success: false
            })
        }
        const authMsg = "Authentication failed ! either email or password is wrong!";
        if (!existingUser) {
            // 403 indicates server understood req but refuse to authorize..
            return res.status(403).json({
                message: authMsg, success: false
            })
        }
        // comparing password done by user and saved password in DB
        const passwordCheck = await bcrypt.compare(password, existingUser.password);
        if (!passwordCheck) {
            return res.status(403).json({
                message: authMsg, success: false
            })
        }
        const token = createToken(existingUser._id);
        res.status(200)
            .json({
                message: "Login success",
                success: true,
                token
            })

    } catch (error) {
        res.status(500).json({
            message: "No user exist!\nCreate account first.",
            success: false
        })
    }
}

export { signup, login, googleAuth };