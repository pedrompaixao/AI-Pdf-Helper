function StatusFooter({ status }) {
    return (
        <footer>
            <p>{status}</p>
            <p>Backend: http://localhost:4000</p>
        </footer>
    );
}

export default StatusFooter;
