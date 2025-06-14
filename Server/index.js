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

app.post("/api/upload", verifyToken, upload.single("file"), async (req, res) => {

    const results = [];

    fs.createReadStream(req.file.path)
        .pipe(csv())

        .on("data", (data) => {
            console.log(data);
            results.push(data)
        })

        .on("end", async () => {
            const predicted = results.map((row) => {
                const name = row.name?.trim() || row.Name?.trim();
                const email = row.email?.trim() || row.Email?.trim();
                const age = parseInt(row.age || row.Age);
                const exp = parseInt(row.experience || row.Experience);
                const edu = (row.education || row.Education || row.EducationLevel || "").toLowerCase();

                const Forecasted_Salary = !isNaN(age) && !isNaN(exp)
                    ? 10000 + exp * 200 + (edu === "Masters" ? 1000 : 0)
                    : 0;

                return { ...row, Forecasted_Salary };
            });

            await saveData(results, predicted);
            fs.unlinkSync(req.file.path);
            res.json({ data: predicted });

        });
});

app.listen((port), err => {
    if (err) {
        console.log(err);
    }
    console.log("✅ Server running at http://localhost:8000");
})
