module.exports = mongoose => {
    const schema = mongoose.Schema({
        appId: {
            type: Number,
            unique: true
        }, 
        views: {
            type: Number,
            default: 0
        },
        clicks: {
            type: Number,
            default: 0
        },
        earned: {
            type: Number,
            default: 0
        }
    }, { timestamps: false });

    return mongoose.model("apps", schema);
};