function QaControls({ text, question, onQuestionChange, onSubmit, answer }) {
    return (
        <section className="card">
            <h2>4. Ask a Question</h2>
            <input
                type="text"
                placeholder="Ask a question about the document"
                value={question}
                onChange={onQuestionChange}
            />
            <button onClick={onSubmit} disabled={!text || !question}>Ask</button>
            <textarea value={answer} readOnly rows={6} />
        </section>
    );
}

export default QaControls;
