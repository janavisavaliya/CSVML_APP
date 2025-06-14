const mongoose = require("mongoose");

const UploadSchema = new mongoose.Schema({
    originalData: Array,
    predictedData: Array,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Upload", UploadSchema);
