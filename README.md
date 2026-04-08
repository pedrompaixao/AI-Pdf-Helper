# AI-Pdf-Helper

Minimal MVP scaffold for the AI-Pdf-Helper project.

## Overview
This project contains a frontend and backend for a simple AI-powered PDF helper.

- `frontend/` — React + Vite UI for upload, summary, and Q&A.
- `backend/` — Express API for PDF extraction and AI calls.

## Setup
1. Install dependencies:
   - `cd backend && npm install`
   - `cd frontend && npm install`
2. Configure API key:
   - Copy `backend/.env.example` to `backend/.env`
   - Set `OPENAI_API_KEY` in `backend/.env`
3. Start the backend:
   - `cd backend && npm run dev`
4. Start the frontend:
   - `cd frontend && npm run dev`

## Usage
- Upload a PDF in the frontend
- Generate a summary
- Ask a question about the PDF content

## Notes
- This scaffold uses `pdf-parse` for PDF text extraction.
- If you need scanned OCR support later, add `tesseract.js` or a Python OCR backend.
