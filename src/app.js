const express = require("express");
const cors = require("cors");
const pool = require("./config/db");

const locationRoutes = require("./routes/locationRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use(locationRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "FindMe Backend Running"
    });
});

app.get("/test-db", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT current_database();"
        );

        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: error.message
        });
    }
});

module.exports = app;