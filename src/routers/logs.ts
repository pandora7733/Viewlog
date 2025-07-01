import dotenv from "dotenv";
dotenv.config();
import express from "express";
const router = express.Router();
import asyncHandler from "express-async-handler";
const adminUser = require("../models/adminUser");
const User = require("../models/User");
import jwt from "jsonwebtoken";
const jwtSecret = process.env.JWT_SECRET;
import bcrypt from "bcrypt";

/**
 * SignUp page
 * GET /SignUp
 */
router.get(
    "/SignUp",
    asyncHandler(async(req, res) => {
        const locals = {
            title: "SignUp"
        }
        res.render("logs/signup", {locals})
    })
)

/**
 * SignUp page
 * POST /SignUp
 */
router.post(
    "/SignUp", asyncHandler(async(req, res) => {
        const { username, email, password, password2 } = req.body;

        if (!username || !email || !password || !password2) {
            res.status(400).send("모든 필드를 입력해주세요.");
            return;
        }

        if (password !== password2) {
            res.send("비밀번호가 같지 않습니다.");
            return;
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(409).send("이미 존재하는 이메일입니다.");
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            username,
            email,
            password: hashedPassword
        });

        res.redirect("/Login");
    })
)


/**
 * Login page
 * GET /Login
 */
router.get(
    "/Login",
    asyncHandler(async(req, res) => {
        const locals = {
            title: "Login"
        }
        res.render("logs/login", {locals})
    })
)

/**
 * Check Login
 * POST /Login
 */
router.post("/Login", asyncHandler(async(req, res) => {
    const { email, password } = req.body;
    const UserEmail = await User.findOne({email});
    if (!UserEmail) {
        res.status(401).json({ message: "일치하는 사용자가 없습니다." });
        return;
    }
    const isValidPassword = await bcrypt.compare(password, UserEmail.password);

    if (!isValidPassword) {
        res.status(401).json({ message: "일치하는 비밀번호가 없습니다." });
        return;
    }
    const token = jwt.sign({ id: UserEmail._id }, jwtSecret as string);
    res.cookie("token", token, { httpOnly: true });
    res.redirect("/home");
}));


/**
 * LoginAdmin page
 * GET /LoginAdmin
 */
router.get(
    "/LoginAdmin",
    asyncHandler(async(req, res) => {
        const locals = {
            title: "LoginAdmin"
        }
        res.render("logs/login_admin", {locals})
    })
)

/**
 * Check Login
 * POST /LoginAdmin
 */
router.post("/LoginAdmin", asyncHandler(async(req, res) => {
    const { email, password } = req.body;
    const AdminEmail = await adminUser.findOne({email});
    if (!AdminEmail) {
        res.status(401).json({ message: "일치하는 사용자가 없습니다." });
        return;
    }
    const isValidPassword = await bcrypt.compare(password, AdminEmail.password);

    if (!isValidPassword) {
        res.status(401).json({ message: "일치하는 비밀번호가 없습니다." });
        return;
    }
    const token = jwt.sign({ id: AdminEmail._id }, jwtSecret as string);
    res.cookie("token", token, { httpOnly: true });
    res.redirect("/home");
}));

module.exports = router;