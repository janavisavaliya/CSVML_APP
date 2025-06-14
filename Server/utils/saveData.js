const Upload = require("../models/Upload");

exports.saveData = async (original, predicted) => {
    const record = new Upload({
        originalData: original,
        predictedData: predicted,
    });
    await record.save();
};
