module.exports = mongoose => {
    const schema = mongoose.Schema({
        adId: {
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
        spent: {
            type: Number,
            default: 0
        }
    }, { timestamps: false });

    return mongoose.model("ads", schema);
};