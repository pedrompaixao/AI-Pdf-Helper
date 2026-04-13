function ExtractedText({ text }) {
    return (
        <section className="card">
            <h2>2. Extracted Text</h2>
            <textarea value={text} readOnly rows={8} />
        </section>
    );
}

export default ExtractedText;
