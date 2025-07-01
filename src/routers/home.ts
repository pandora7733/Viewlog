import express from "express";
const router = express.Router();
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
const jwtSecret = process.env.JWT_SECRET;
const User = require("../models/User");

router.get(
    ["/", "/home"],
    asyncHandler(async(req, res) => {
        const locals = {
            title: "home",
        }
        res.render("home/home", {locals});
    })
);

router.get(
    "/log",
    asyncHandler(async(req, res) => {
        const locals = {
            title: "log",
        }
        const userdata = await User.find();
        res.render("userlog/log", {locals, userdata});
    })
)

module.exports = router;