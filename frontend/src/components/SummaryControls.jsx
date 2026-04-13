function SummaryControls({ text, lengthOption, onLengthChange, onSubmit, summary }) {
    return (
        <section className="card">
            <h2>3. Summarize Document</h2>
            <label>
                Summary length:
                <select value={lengthOption} onChange={onLengthChange}>
                    <option value="short">Short</option>
                    <option value="medium">Medium</option>
                    <option value="detailed">Detailed</option>
                </select>
            </label>
            <button onClick={onSubmit} disabled={!text}>Generate Summary</button>
            <textarea value={summary} readOnly rows={6} />
        </section>
    );
}

export default SummaryControls;
