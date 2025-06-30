import express from "express";
const router = express.Router();
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
const jwtSecret = process.env.JWT_SECRET;

router.get(
    ["/", "/home"],
    asyncHandler(async(req, res) => {
        const locals = {
            title: "home",
        }
        res.render("home/home", {locals})
    })
);

module.exports = router;