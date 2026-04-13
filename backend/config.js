import dotenv from "dotenv";

dotenv.config();

export const config = {
    port: Number(process.env.PORT || 4000),
    azureOpenAiApiKey: process.env.AZURE_OPENAI_API_KEY,
    azureOpenAiEndpoint: process.env.AZURE_OPENAI_ENDPOINT,
    azureOpenAiDeployment: process.env.AZURE_OPENAI_DEPLOYMENT,
    azureOpenAiApiVersion: process.env.AZURE_OPENAI_API_VERSION,
    authUserEmail: process.env.AUTH_USER_EMAIL || "admin@example.com",
    authUserPassword: process.env.AUTH_USER_PASSWORD || "password",
    authJwtSecret: process.env.AUTH_JWT_SECRET,
    authTokenExpiry: process.env.AUTH_TOKEN_EXPIRY || "1h",
};

export function validateConfig() {
    const missing = [];
    if (!config.azureOpenAiApiKey) missing.push("AZURE_OPENAI_API_KEY");
    if (!config.azureOpenAiEndpoint) missing.push("AZURE_OPENAI_ENDPOINT");
    if (!config.azureOpenAiDeployment) missing.push("AZURE_OPENAI_DEPLOYMENT");
    if (!config.azureOpenAiApiVersion) missing.push("AZURE_OPENAI_API_VERSION");
    if (!config.authJwtSecret) missing.push("AUTH_JWT_SECRET");

    if (missing.length > 0) {
        throw new Error(`Missing environment variables: ${missing.join(", ")}`);
    }
}
