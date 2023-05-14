module.exports = mongoose => {
    const schema = mongoose.Schema({
        appId: {
            type: Number,
            unique: true
        },
        earned: {
            type: String
        }
    }, { timestamps: false });

    return mongoose.model("apps", schema);
};