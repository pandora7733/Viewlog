import express from "express";
const router = express.Router();
import asyncHandler from "express-async-handler";
const vlogLayouts = "../views/contentAdd/vlogAdd"

router.get(
    "/profile/vlog/add",
    asyncHandler(async(req, res) => {
        const locals = {
            title: "vlogAdd",
        }
        res.render("contentAdd/vlogAdd", {locals, layout: vlogLayouts});
    })
);

module.exports = router;
