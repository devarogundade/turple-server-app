module.exports = app => {
    const controller = require("../controllers/index.controller.js")
    const router = require("express").Router()

    router.get("/loadads", controller.loadAds)

    app.use("/", router);
};