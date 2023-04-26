module.exports = app => {
    const apps = require("../controllers/apps.controller.js")
    const router = require("express").Router()

    // Retrieve all apps
    router.get("/", apps.findAll)

    app.use("/apps", router);
};