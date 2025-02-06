import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const API_KEY = process.env.WEB3FORMS_API_KEY;

app.post("/send-message", async (req, res) => {
    try {
        const formData = { ...req.body, access_key: API_KEY };

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const result = await response.json();
        res.json(result);
    } catch (error) {
        console.error("Error processing form:", error);
        res.status(500).json({ success: false, message: "Server error. Please try again later." });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});