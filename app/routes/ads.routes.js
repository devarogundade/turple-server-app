module.exports = app => {
    const ads = require("../controllers/ads.controller.js")
    const router = require("express").Router()

    router.get("/loadads", ads.loadAds)

    app.use("/ads", router);
};