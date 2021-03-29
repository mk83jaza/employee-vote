require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const moment = require("moment-timezone");
const db = require("./db");
const config = require("./config");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const HTTP_PORT = process.env.APP_HTTP_PORT || 3000;
const MIN_VOTE = 1;
const MAX_VOTE = 10;

app.post('/vote', (req, res) => {
    const errors = [];
    if (!req.body || !req.body.value || !isInt(req.body.value) || req.body.value < MIN_VOTE || req.body.value > MAX_VOTE) {
        errors.push("Wrong or no value specified!");
    }
    if (errors.length) {
        res.status(400).json({ "error": errors.join(",") });
        return;
    }
    const sql = 'INSERT INTO votes(value, timestamp) VALUES ((?), NOW())';
    db.query(sql, [req.body.value], (error) => {
        if (error) {
            res.status(400).json({ "error": error.message })
            return;
        }
        res.json(true);
    });
});

app.get('/possibleDates', (req, res) => {
    const sql = `
        SELECT YEAR(converted.timestamp) AS year, WEEK(converted.timestamp) AS week 
        FROM 
            (SELECT CONVERT_TZ(timestamp, '+00:00', (?)) AS timestamp FROM votes) AS converted
        GROUP BY year, week
        ORDER BY year, week;
    `;
    db.query(sql, [config.db.timezone], function (error, rows) {
        if (error) {
            res.status(400).json({ "error": error.message })
            return;
        }
        let possibleDates = {};
        rows.forEach(row => {
            if (possibleDates[row.year] != null) {
                possibleDates[row.year].push(row.week);
            } else {
                possibleDates[row.year] = [row.week];
            }
        })
        res.json({
            possibleDates
        });
    });
});

app.get("/yearlyData", (req, res) => {
    let currentYear;
    if (req.query.year && isInt(req.query.year)) {
        currentYear = req.query.year
    } else {
        currentYear = (moment().tz(config.db.timezone).year());
    }
    const sql = `
        SELECT converted.value, YEAR(converted.timestamp) AS year, WEEK(converted.timestamp) AS week
        FROM 
            (SELECT value, CONVERT_TZ(timestamp, '+00:00', (?)) AS timestamp FROM votes) AS converted
        WHERE YEAR(converted.timestamp)=(?);
    `;
    const params = [config.db.timezone, currentYear];
    db.query(sql, params, (error, rows) => {
        if (error) {
            res.status(400).json({ "error": error.message });
            return;
        }
        let currentYear = {};
        rows.forEach(row => {
            if (currentYear[row.year] != null) {
                if (currentYear[row.year][row.week] != null) {
                    currentYear[row.year][row.week].push(row.value);
                } else {
                    currentYear[row.year][row.week] = [row.value];
                }
            } else {
                let week = {};
                week[row.week] = [row.value]
                currentYear[row.year] = week
            }
        });
        res.json({
            currentYear
        });
    });
});

function isInt(value) {
    return !isNaN(parseInt(value));
}

app.listen(HTTP_PORT, () => console.log("Server running on port " + HTTP_PORT + "..."));