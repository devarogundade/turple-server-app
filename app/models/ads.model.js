module.exports = mongoose => {
    const schema = mongoose.Schema({
        adId: {
            type: Number,
            unique: true
        },
        spent: {
            type: String
        }
    }, { timestamps: false });

    return mongoose.model("ads", schema);
};