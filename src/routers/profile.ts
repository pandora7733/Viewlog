import express from "express";
const router = express.Router();
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { title } from "process";
const jwtSecret = process.env.JWT_SECRET;
const User = require("../models/User");
const Layouts = "../views/profile/profile"

router.get(
    "/profile",
    asyncHandler(async(req, res) => {
        const locals = {
            title: "profile",
        }
        res.render("layouts/imagePage", {locals, layout: Layouts});
    })
);

router.get(
    "/profile/log",
    asyncHandler(async(req, res) => {
        const locals = {
            title: "profile",
        }
        res.render("layouts/logPage", {locals, layout: Layouts})
    })
)

router.get(
    "/profile/media",
    asyncHandler(async(req, res) => {
        const locals = {
            title: "profile",
        }
        res.render("layouts/mediaPage", {locals, layout: Layouts})
    })
)

module.exports = router;