const db = require("../models");
const graphAPI = require("../utils/SubGraphAPI")

const Ad = db.ads
const App = db.apps

exports.loadAds = async (req, res) => {
    try {
        const appId = req.query.subid.replace('subid_', '')

        const app = await graphAPI.getApp(appId)

        const ads = await graphAPI.getAds(app.category, app.format)

        const data = { status: 'OK', data: ads }

        res.send(data)
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some err occurred."
        });
    }
}

exports.onAdWatch = async (req, res) => {
    try {
        const fee = req.query.fee ? req.query.fee : 0

        const result1 = await Ad.findOneAndUpdate(
            { adId: req.query.adid }, // filter
            { $inc: { spent: fee, views: 1 } }, // data
            {
                upsert: true,
                returnNewDocument: true,
                returnDocument: "after"
            } // options
        )

        const result2 = await App.findOneAndUpdate(
            { appId: req.query.subid }, // filter
            { $inc: { earned: fee, views: 1 } }, // data
            {
                upsert: true,
                returnNewDocument: true,
                returnDocument: "after"
            } // options
        )

        const data = {
            status: 'OK',
            result1: result1,
            result2: result2
        }

        res.send(data)
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some err occurred."
        })
    }
}

exports.onAdClick = async (req, res) => {
    try {
        const result1 = await Ad.findOneAndUpdate(
            { adId: req.query.adid }, // filter
            { $inc: { clicks: 1 } }, // data
            {
                upsert: true,
                returnNewDocument: true,
                returnDocument: "after"
            } // options
        )

        const result2 = await App.findOneAndUpdate(
            { appId: req.query.subid }, // filter
            { $inc: { clicks: 1 } }, // data
            {
                upsert: true,
                returnNewDocument: true,
                returnDocument: "after"
            } // options
        )

        const data = {
            status: 'OK',
            result1: result1,
            result2: result2
        }

        res.send(data)
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some err occurred."
        })
    }
}

exports.ad = async (req, res) => {
    Ad.findOne({ adId: req.params.id })
        .then(result => {
            const data = { status: 'OK', data: result }
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some err occurred."
            });
        });
}

exports.createAd = async (req, res) => {
    const ad = new Ad({
        adId: Number(req.query.adid)
    })

    ad.save()
    .then(result => {
        const data = { status: 'OK', data: result }
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some err occurred."
        });
    });
}

exports.app = async (req, res) => {
    App.findOne({ appId: req.params.id })
        .then(result => {
            const data = { status: 'OK', data: result }
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some err occurred."
            });
        });
}

exports.createApp = async (req, res) => {
    const app = new App({
        appId: Number(req.query.appid)
    })

    app.save()
    .then(result => {
        const data = { status: 'OK', data: result }
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some err occurred."
        });
    });
}
