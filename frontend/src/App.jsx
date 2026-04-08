import { useState } from "react";

const API_BASE = "http://localhost:4000";

function App() {
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState("");
    const [text, setText] = useState("");
    const [summary, setSummary] = useState("");
    const [lengthOption, setLengthOption] = useState("medium");
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    const handleFileChange = (event) => {
        setFile(event.target.files?.[0] || null);
        setText("");
        setSummary("");
        setAnswer("");
        setStatus("");
    };

    const uploadFile = async () => {
        if (!file) return;
        setStatus("Uploading and extracting text...");

        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch(`${API_BASE}/upload`, {
            method: "POST",
            body: formData
        });

        const data = await response.json();
        if (!response.ok) {
            setStatus(data.error || "Upload failed.");
            return;
        }

        setText(data.text || "");
        setStatus("Text extracted successfully.");
    };

    const requestSummary = async () => {
        if (!text) return;
        setStatus("Generating summary...");

        const response = await fetch(`${API_BASE}/summary`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text, length: lengthOption })
        });

        const data = await response.json();
        if (!response.ok) {
            setStatus(data.error || "Summary failed.");
            return;
        }

        setSummary(data.summary || "");
        setStatus("Summary generated.");
    };

    const requestAnswer = async () => {
        if (!text || !question) return;
        setStatus("Asking question...");

        const response = await fetch(`${API_BASE}/qa`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text, question })
        });

        const data = await response.json();
        if (!response.ok) {
            setStatus(data.error || "Question answering failed.");
            return;
        }

        setAnswer(data.answer || "");
        setStatus("Answer received.");
    };

    return (
        <div className="app-shell">
            <header>
                <h1>AI-Pdf-Helper</h1>
                <p>Upload a PDF, extract text, summarize it, and ask questions.</p>
            </header>

            <section className="card">
                <h2>1. Upload PDF</h2>
                <input type="file" accept="application/pdf" onChange={handleFileChange} />
                <button onClick={uploadFile} disabled={!file}>Upload & Extract</button>
            </section>

            <section className="card">
                <h2>2. Extracted Text</h2>
                <textarea value={text} readOnly rows={8} />
            </section>

            <section className="card">
                <h2>3. Summarize Document</h2>
                <label>
                    Summary length:
                    <select value={lengthOption} onChange={(e) => setLengthOption(e.target.value)}>
                        <option value="short">Short</option>
                        <option value="medium">Medium</option>
                        <option value="detailed">Detailed</option>
                    </select>
                </label>
                <button onClick={requestSummary} disabled={!text}>Generate Summary</button>
                <textarea value={summary} readOnly rows={6} />
            </section>

            <section className="card">
                <h2>4. Ask a Question</h2>
                <input
                    type="text"
                    placeholder="Ask a question about the document"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                />
                <button onClick={requestAnswer} disabled={!text || !question}>Ask</button>
                <textarea value={answer} readOnly rows={6} />
            </section>

            <footer>
                <p>{status}</p>
                <p>Backend: http://localhost:4000</p>
            </footer>
        </div>
    );
}

export default App;
