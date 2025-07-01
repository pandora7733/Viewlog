import express from "express";
const router = express.Router();
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
const jwtSecret = process.env.JWT_SECRET;
const User = require("../models/User");

router.get(
    "/profile",
    asyncHandler(async(req, res) => {
        const locals = {
            title: "profile",
        }
        res.render("profile/profile", {locals});
    })
);

module.exports = router;