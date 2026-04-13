import OpenAI from "openai";
import { config, validateConfig } from "./config.js";

const model = config.azureOpenAiDeployment || "gpt-4";

export function createAIClient() {
    validateConfig();

    return new OpenAI({
        apiKey: config.azureOpenAiApiKey,
        baseURL: config.azureOpenAiEndpoint,
        apiVersion: config.azureOpenAiApiVersion,
    });
}


// Update the API calls to use chat.completions.create
export async function generateSummary(client, text, length = "medium") {
    const lengthInstructions = {
        short: "Write a short, concise summary in 3-5 sentences.",
        medium: "Write a clear summary in 5-8 sentences.",
        detailed: "Write a detailed summary with the most important points in 8-12 sentences."
    };

    const prompt = `You are an assistant that summarizes document text. ${lengthInstructions[length] || lengthInstructions.medium}\n\nDocument text:\n${text}`;

    // console.log(prompt);

    const response = await client.chat.completions.create({
        model,
        messages: [{ role: "user", content: prompt }],
    });

    return response.choices[0]?.message?.content?.trim() || "";
}

export async function answerQuestion(client, text, question) {
    const prompt = `You are an assistant that answers questions using the provided document text. Use only the information in the text and cite the source when possible.\n\nDocument text:\n${text}\n\nQuestion: ${question}`;

    const response = await client.chat.completions.create({
        model,
        messages: [{ role: "user", content: prompt }],
    });

    return response.choices[0]?.message?.content?.trim() || "";
}