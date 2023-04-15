import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Questions } from "../data/Questions.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(
	cors({
		origin: "*",
		method: ["POST", "GET"],
		credentials: true,
	})
);
const port = 3001;

import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/", async (req, res) => {
	const { message } = req.body;
	const creatorQuestion = Questions;

	if (creatorQuestion.some((q) => message.toLowerCase().includes(q))) {
		return res.json({
			message:
				"Greetings, I am Meep, a smart Artificial Intelligence developed by Francis Tin-ao. I was created to fulfill the requirements of his major subject ITE18. How can I be of assistance to you today?",
		});
	}

	const response = await openai.createChatCompletion({
		model: "gpt-3.5-turbo",
		messages: [{ role: "user", content: message }],
		max_tokens: 200,
		temperature: 0.7,
	});
	res.json({ message: response.data.choices[0].message.content });
});

app.listen(port, () => console.log(`Server is listening on port ${port}`));
