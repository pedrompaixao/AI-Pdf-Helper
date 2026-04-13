import { Link } from "react-router-dom";

function LandingPage() {
    return (
        <div className="app-shell">
            <header>
                <h1>AI-Pdf-Helper</h1>
                <p>Your intelligent PDF companion powered by Azure OpenAI</p>
            </header>

            <section className="card">
                <h2>Welcome to AI-Pdf-Helper</h2>
                <p>
                    AI-Pdf-Helper is a powerful application that helps you extract insights from PDF documents
                    using advanced artificial intelligence. Whether you need to summarize lengthy documents or
                    ask specific questions, we've got you covered.
                </p>
            </section>

            <section className="card">
                <h2>Key Features</h2>
                <div className="features-list">
                    <div className="feature">
                        <h3>📄 PDF Text Extraction</h3>
                        <p>
                            Upload any PDF file and automatically extract clean, readable text. Our system
                            handles various PDF formats with precision.
                        </p>
                    </div>

                    <div className="feature">
                        <h3>✨ Smart Summarization</h3>
                        <p>
                            Generate summaries of your documents in three levels: short (3-5 sentences),
                            medium (5-8 sentences), or detailed (8-12 sentences). Perfect for quick reviews
                            or in-depth analysis.
                        </p>
                    </div>

                    <div className="feature">
                        <h3>❓ Question Answering</h3>
                        <p>
                            Ask questions about your documents and get instant, accurate answers backed by
                            the document text. Great for research, analysis, and information retrieval.
                        </p>
                    </div>

                    <div className="feature">
                        <h3>🔐 Secure & Private</h3>
                        <p>
                            Your documents and queries are processed securely. Each user has their own session
                            protected by JWT authentication tokens.
                        </p>
                    </div>
                </div>
            </section>

            <section className="card">
                <h2>How It Works</h2>
                <ol className="steps-list">
                    <li>
                        <strong>Sign Up or Log In</strong> – Create a new account or log in with your credentials.
                        Your session is secure and private.
                    </li>
                    <li>
                        <strong>Upload a PDF</strong> – Select and upload any PDF document. Our system instantly
                        extracts the text content.
                    </li>
                    <li>
                        <strong>Summarize</strong> – Choose a summary length (short, medium, or detailed) and let AI
                        create a concise overview of your document.
                    </li>
                    <li>
                        <strong>Ask Questions</strong> – Ask any question about the document and receive answers
                        backed by the document content.
                    </li>
                    <li>
                        <strong>Repeat</strong> – Upload more documents and repeat the process as needed. You can
                        work with multiple PDFs in a single session.
                    </li>
                </ol>
            </section>

            <section className="card">
                <h2>Use Cases</h2>
                <ul className="use-cases-list">
                    <li><strong>Research & Academia:</strong> Quickly summarize papers and extract key findings</li>
                    <li><strong>Business:</strong> Analyze reports, contracts, and proposals efficiently</li>
                    <li><strong>Legal:</strong> Review documents and find specific clauses or information</li>
                    <li><strong>Content Creation:</strong> Get ideas and summaries for your writing</li>
                    <li><strong>Education:</strong> Study documents and test comprehension with Q&A</li>
                </ul>
            </section>

            <section className="card">
                <h2>Ready to Get Started?</h2>
                <p>
                    Sign up for a free account or log in to begin working with your documents. No credit card required.
                </p>
                <Link to="/login" style={{ fontSize: "16px", padding: "12px 24px", textDecoration: "none", display: "inline-block" }}>
                    Get Started
                </Link>
            </section>

            <footer>
                <p>© 2026 AI-Pdf-Helper. All rights reserved.</p>
                <p>Powered by Azure OpenAI and modern web technologies.</p>
            </footer>
        </div>
    );
}

export default LandingPage;
