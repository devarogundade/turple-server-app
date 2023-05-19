module.exports = app => {
    const controller = require("../controllers/index.controller.js")
    const router = require("express").Router()

    router.get("/ad/:id", controller.ad)
    router.post("/ad/create", controller.createAd)

    router.get("/app/:id", controller.app)
    router.post("/app/create", controller.createApp)

    router.get("/loadads", controller.loadAds)
    router.post('/onadwatch', controller.onAdWatch)
    router.post('/onadclick', controller.onAdClick)

    app.use("/", router);
};