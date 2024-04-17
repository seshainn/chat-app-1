import { User } from "../models/userModel.js"
import catchAsync from "../config/catchAsync.js"
import expressError from "../config/expressError.js"
import bcrypt from 'bcrypt'

const salt = bcrypt.genSaltSync(10);

export const registerUser = catchAsync(async (req, res) => {

    const { name, email, password, password2, picThr, picName } = req.body

    if (password !== password2) {
        throw expressError('passwords do not match', 510)
    }

    const existingUser = await User.findOne({ email })
    if (!existingUser) {
        const newUser = await User.create({
            name, email, password: bcrypt.hashSync(password, salt), picThr, picName
        })
        if (newUser) {
            const payload = {
                _id: newUser._id
            }
            const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "2m" });

            res.json({
                status: 200,
                message: "Registration Successful",
                name: newUser.name,
                picThr: newUser.picThr,
                picName: newUser.picName,
                token: token,
            })
        } else {
            throw expressError("Registration failed.", 502)
        }
    } else {
        throw expressError("User already registered. Please Login.", 501)
    }
})

export const loginUser = catchAsync(async (req, res) => {

    const { email, password } = req.body
    const existingUser = await User.findOne({ email })
    if (existingUser) {
        const passOk = bcrypt.compareSync(password, existingUser.password);

        if (passOk) {

            const payload = {
                _id: existingUser._id
            }
            const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "2m" });

            res.json({
                status: 200,
                message: "Login Successful",
                name: existingUser.name,
                picThr: existingUser.picThr,
                picName: existingUser.picName,
                token: token,
            })
        } else {
            throw expressError("Invalid Credentials", 504)
        };
    } else {
        throw expressError("User not registered. Please register.", 503)
    }
})

export const isAuth = catchAsync(async (req, res) => {

    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        throw expressError("token not received at server", 511);
    } else {

        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        if (decoded.exp && Date.now() / 1000 < decoded.exp) {
            const userDoc = await User.findOne({ _id: decoded._id });

            if (userDoc) {
                throw expressError("User details not found. Please register", 512)
            }
        } else {
            throw expressError("Authentication expired. Please login again", 513)
        }

    }
})