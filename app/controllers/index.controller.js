const db = require("../models");
const graphAPI = require("../utils/SubGraphAPI")

const Ad = db.ads
const App = db.apps

const fee = '100000000000000000'

exports.loadAds = async (req, res) => {
    try {
        const subid = req.query.subid
        const appId = subid.replace('subid_', '')

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

exports.debitAd = async (req, res) => {
    Ad.findOneAndUpdate(
        { adId: req.query.adId }, // filter
        { $inc: { spent: fee } }, // data
        {
            upsert: true,
            returnNewDocument: true,
            returnDocument: "after"
        } // options
    ).then(result => {
        const data = { status: 'OK', data: result }
        res.send(data)
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some err occurred."
        })
    })
}

exports.creditApp = async (req, res) => {
    App.findOneAndUpdate(
        { adId: req.query.adId }, // filter
        { $inc: { earned: fee } }, // data
        {
            upsert: true,
            returnNewDocument: true,
            returnDocument: "after"
        } // options
    ).then(result => {
        const data = { status: 'OK', data: result }
        res.send(data)
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some err occurred."
        })
    })
}

exports.ad = async (req, res) => {
    Ad.findById(req.params.id)
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
    App.findById(req.params.id)
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
