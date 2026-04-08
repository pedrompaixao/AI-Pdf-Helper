import OpenAI from "openai";

const model = "gpt-4.1-mini";

export function createAIClient(apiKey) {
    return new OpenAI({ apiKey });
}

export async function generateSummary(client, text, length = "medium") {
    const lengthInstructions = {
        short: "Write a short, concise summary in 3-5 sentences.",
        medium: "Write a clear summary in 5-8 sentences.",
        detailed: "Write a detailed summary with the most important points in 8-12 sentences."
    };

    const prompt = `You are an assistant that summarizes document text. ${lengthInstructions[length] || lengthInstructions.medium}\n\nDocument text:\n${text}`;

    const response = await client.responses.create({
        model,
        input: prompt
    });

    return response.output[0]?.content[0]?.text?.trim() || "";
}

export async function answerQuestion(client, text, question) {
    const prompt = `You are an assistant that answers questions using the provided document text. Use only the information in the text and cite the source when possible.\n\nDocument text:\n${text}\n\nQuestion: ${question}`;

    const response = await client.responses.create({
        model,
        input: prompt
    });

    return response.output[0]?.content[0]?.text?.trim() || "";
}
