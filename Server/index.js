const express = require("express");

const { verifyToken } = require('./middleware/auth');

const port = 8000;

const mongoose = require("mongoose");

const multer = require("multer");

const csv = require("csv-parser");

const cors = require("cors");

const fs = require("fs");

const { saveData } = require("./utils/saveData");

const app = express();

app.use(cors());

const db = require('./Config/db');

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', require('./route/authRoute'));

const upload = multer({ dest: "uploads/" });

const predictSalary = require('./controller/predictController')

app.post('/api/upload', upload.single('file'), (req, res) => {
    const results = [];
    const filePath = req.file.path;

    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            const predictions = results.map((row) => {
                const salary = predictSalary(row.experience, row.education);
                return { ...row, predicted_salary: salary };
            });

            res.json({
                success: true,
                data: predictions,
            });

            fs.unlink(filePath, () => { }); // delete temp file
        });
});

app.listen((port), err => {
    if (err) {
        console.log(err);
    }
    console.log("✅ Server running at http://localhost:8000");
})
