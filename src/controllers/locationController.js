const pool = require("../config/db");
const { getIO } = require("../socket/socket");

const saveLocation = async (req, res) => {
    try {
        const {
            deviceId,
            latitude,
            longitude,
            accuracy,
            speed,
            battery
        } = req.body;

        console.log("DATA MASUK:", req.body);

        const query = `
            INSERT INTO locations (
                device_id,
                latitude,
                longitude,
                accuracy,
                speed,
                battery
            )
            VALUES ($1,$2,$3,$4,$5,$6)
            RETURNING *;
        `;

        const values = [
            deviceId,
            latitude,
            longitude,
            accuracy,
            speed,
            battery
        ];

        const result = await pool.query(query, values);

        console.log("✅ DB berhasil:", result.rows[0]);

        const io = getIO();
        io.emit("location-update", result.rows[0]);

        console.log("✅ Socket emitted!");

        return res.status(201).json({
            success: true,
            data: result.rows[0]
        });

    } catch (error) {
        console.error("❌ Error detail:", error.message);
        console.error(error);

        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

const getLatestLocation = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT *
            FROM locations
            ORDER BY created_at DESC
            LIMIT 1
        `);

        res.status(200).json({
            success: true,
            data: result.rows[0] || null
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

const getLocations = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT *
            FROM locations
            ORDER BY created_at DESC
            LIMIT 100
        `);

        res.status(200).json({
            success: true,
            data: result.rows
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

module.exports = {
    saveLocation,
    getLatestLocation,
    getLocations
};