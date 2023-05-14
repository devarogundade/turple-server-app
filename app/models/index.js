const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.set('strictQuery', true);

mongoose.Promise = global.Promise;

const db = {}

db.mongoose = mongoose;
db.url = dbConfig.url;

db.ads = require("./ads.model.js")(mongoose);
db.apps = require("./apps.model.js")(mongoose);

module.exports = db;