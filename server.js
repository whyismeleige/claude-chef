require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 5000;

app.use(cors());

app.use(express.json()); 

const API_KEY = process.env.REACT_APP_API_KEY;

const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";
const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page
`

app.post("/claude", async (req, res) => {
    try {
        console.log("Inside Server")
        const { ingredientsString } = req.body;
        
        const response = await axios.post(ANTHROPIC_API_URL, {
            model: "claude-3-haiku-20240307",
            max_tokens: 2000,
            system: SYSTEM_PROMPT,
            messages: [{ role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` }]
        }, {
            headers: {
                "x-api-key": API_KEY,
                "content-type": "application/json",
                "anthropic-version": "2023-06-01"
            }
        });
        console.log("Got data from the AI");
        res.json(response.data);
    } catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get("/claude", async (req, res) => {
    try {
        const { ingredientsString } = req.body;
        
        const response = await axios.post(ANTHROPIC_API_URL, {
            model: "claude-3-haiku-20240307",
            max_tokens: 2000,
            system: SYSTEM_PROMPT,
            messages: [{ role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` }]
        }, {
            headers: {
                "x-api-key": API_KEY,
                "Content-Type": "application/json",
                "anthropic-version": "2023-06-01"
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(PORT, () => console.log(`Proxy server running on http://localhost:${PORT}`));
