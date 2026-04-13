function FileUpload({ file, onFileChange, onUpload }) {
    return (
        <section className="card">
            <h2>1. Upload PDF</h2>
            <input type="file" accept="application/pdf" onChange={onFileChange} />
            <button onClick={onUpload} disabled={!file}>Upload & Extract</button>
        </section>
    );
}

export default FileUpload;
