import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Questions, LoveQuestions } from "../data/Questions.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(
	cors({
		origin: "*",
		method: ["POST"],
		credentials: true,
	})
);
const port = 3001;

import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/api/chat", async (req, res) => {
	const { message } = req.body;
	const creatorQuestion = Questions;
	const loveQuestion = LoveQuestions;

	if (creatorQuestion.some((q) => message.toLowerCase().includes(q))) {
		return res.json({
			message:
				"Greetings, I am Meep, a smart Chatbot developed by Francis Tin-ao. I was created to fulfill the requirements of his major subject ITE18. How can I be of assistance to you today?",
		});
	}

	if (loveQuestion.some((q) => message.toLowerCase().includes(q))) {
		return res.json({
			message:
				"Francis Tin-ao's love of his life is his girlfriend, Sophia Langanlangan. They have been together for almost 8 years now. Sophia Langanlangan is one of a kind girlfriend that will be always in my creator's heart. He loves him very much",
		});
	}

	const response = await openai.createChatCompletion({
		model: "gpt-3.5-turbo",
		messages: [{ role: "user", content: message }],
		max_tokens: 500,
		temperature: 0.7,
	});

	const formattedMessage = formatMessage(
		response.data.choices[0].message.content
	);
	res.set("Content-Type", "text/html");
	res.send({ message: formattedMessage });

	function formatMessage(message) {
		// replacing all \n escape sequence into a br tag
		return message.replace(/\n/g, "<br>");
	}
});

app.listen(port, () => console.log(`Server is listening on port ${port}`));
