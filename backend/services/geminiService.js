const { GoogleGenAI } = require("@google/genai");
const { getTodosFromDB } = require("./firebaseService");
const { sendToSlack } = require("./slackService");
const axios = require("axios");
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
exports.summarizeTodos = async (req, res) => {
    try {
        const todos = await getTodosFromDB();
        const prompt = todos.map(t => `- ${t.text}`).join("\n");

        async function main() {
            const response = await ai.models.generateContent({
                model: "gemini-2.0-flash",
                contents: `Summarize the following list of personal to-do items into a short, clear summary suitable for posting in a team chat app like Slack. 
                           Group related items if possible, highlight priorities, and make the tone professional but friendly. 
                           Here is the list of example u can check this format keep summary in this format of 2-3 word sentence
                           dont include any other comments and ** etc simply give responnse in 2-3 word of each task like the given example:

                         - Submit assignment
                         - Buy groceries
                         - Prepare presentation for Monday meeting
                         - Call the bank
                         - Review PRs on GitHub
                         - Pick up dry cleaning
                         - Schedule dentist appointment
                          here is the text for which you need perform above task ${prompt}`,
            });
            console.log(response.text);
            await sendToSlack(response.text);

            res.json({ message: "Summary sent to Slack" });
        }

        await main();

    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).json({ error: "Gemini summarization failed." });
    }
};
