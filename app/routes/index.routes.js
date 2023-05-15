module.exports = app => {
    const controller = require("../controllers/index.controller.js")
    const router = require("express").Router()

    router.get("/ad/:id", controller.ad)
    router.get("/app/:id", controller.app)
    router.get("/loadads", controller.loadAds)
    router.post('/onadwatch', controller.onAdWatch)

    app.use("/", router);
};