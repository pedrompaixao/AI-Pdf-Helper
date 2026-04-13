import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import FileUpload from "../components/FileUpload";
import ExtractedText from "../components/ExtractedText";
import SummaryControls from "../components/SummaryControls";
import QaControls from "../components/QaControls";
import StatusFooter from "../components/StatusFooter";
import { uploadPdf, fetchSummary, fetchAnswer } from "../api";

function DashboardPage() {
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState("");
    const [text, setText] = useState("");
    const [summary, setSummary] = useState("");
    const [lengthOption, setLengthOption] = useState("medium");
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const { user, logout } = useAuth();

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

        const data = await uploadPdf(file);
        if (data.error) {
            setStatus(data.error || "Upload failed.");
            return;
        }

        setText(data.text || "");
        setStatus("Text extracted successfully.");
    };

    const requestSummary = async () => {
        if (!text) return;
        setStatus("Generating summary...");

        const data = await fetchSummary(text, lengthOption);
        if (data.error) {
            setStatus(data.error || "Summary failed.");
            return;
        }

        setSummary(data.summary || "");
        setStatus("Summary generated.");
    };

    const requestAnswer = async () => {
        if (!text || !question) return;
        setStatus("Asking question...");

        const data = await fetchAnswer(text, question);
        if (data.error) {
            setStatus(data.error || "Question answering failed.");
            return;
        }

        setAnswer(data.answer || "");
        setStatus("Answer received.");
    };

    const handleLogout = () => {
        setText("");
        setSummary("");
        setQuestion("");
        setAnswer("");
        setFile(null);
        setStatus("Logged out.");
        logout();
    };

    return (
        <div className="app-shell">
            <header>
                <h1>AI-Pdf-Helper</h1>
                <p>Upload a PDF, extract text, summarize it, and ask questions.</p>
            </header>

            <section className="card">
                <div className="login-status">
                    <p>Signed in as {user?.email}</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </section>

            <FileUpload file={file} onFileChange={handleFileChange} onUpload={uploadFile} />
            <ExtractedText text={text} />
            <SummaryControls
                text={text}
                lengthOption={lengthOption}
                onLengthChange={(e) => setLengthOption(e.target.value)}
                onSubmit={requestSummary}
                summary={summary}
            />
            <QaControls
                text={text}
                question={question}
                onQuestionChange={(e) => setQuestion(e.target.value)}
                onSubmit={requestAnswer}
                answer={answer}
            />

            <StatusFooter status={status} />
        </div>
    );
}

export default DashboardPage;
