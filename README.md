# Receipt & Invoice Digitizer (Frontend + Backend)

This workspace contains a full-stack Receipt and Invoice Digitizer project split into two folders:

- `receipt_and_invoice_digitizer` -> React + Vite frontend
- `Receipt_Invoice_Digitizer_Ankit_Sharma` -> FastAPI backend

## Project Structure

```text
Infosys_Internship/
├── receipt_and_invoice_digitizer/          # Frontend (React)
├── Receipt_Invoice_Digitizer_Ankit_Sharma/ # Backend (FastAPI)
└── README.md
```

---

## Frontend (React + Vite)

Path: `receipt_and_invoice_digitizer`

### Tech Stack

- React 18
- Vite 5
- React Router
- Tailwind CSS
- Recharts
- Framer Motion

### Install

```bash
cd receipt_and_invoice_digitizer
npm install
```

### Run (Development)

```bash
npm run dev
```

Frontend default URL:

- http://localhost:5173

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---

## Backend (FastAPI)

Path: `Receipt_Invoice_Digitizer_Ankit_Sharma`

### Tech Stack

- FastAPI
- Uvicorn
- SQLAlchemy (SQLite)
- JWT Auth (python-jose)
- Passlib (bcrypt)
- Python Multipart (file upload)

### Install

```bash
cd Receipt_Invoice_Digitizer_Ankit_Sharma
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

### Environment Variables

Create a `.env` file in `Receipt_Invoice_Digitizer_Ankit_Sharma`:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### Run (Development)

```bash
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

Backend default URL:

- http://localhost:8000

API docs:

- http://localhost:8000/docs

### Database

- SQLite database file is created automatically as `app.db` in the backend root.

---

## API Overview

Base URL: `http://localhost:8000`

### Auth Routes

- `POST /auth/register` -> Register user
- `POST /auth/login` -> Login user and get JWT
- `POST /auth/google` -> Google login

### Invoice Routes

- `POST /invoice/upload` -> Upload and process invoice (JWT required)
- `GET /invoice/my` -> Get invoices for logged-in user (JWT required)
- `GET /invoice/all` -> Get all invoices (admin/overview use)

---

## How Frontend Connects to Backend

Frontend API base URL is set in:

- `receipt_and_invoice_digitizer/src/services/api.js`

Current value:

```js
const API_URL = "http://localhost:8000";
```

Make sure backend is running on the same host/port.

---

## Run Full Stack Locally

Open two terminals from workspace root:

Terminal 1 (Backend):

```bash
cd Receipt_Invoice_Digitizer_Ankit_Sharma
.venv\Scripts\activate
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

Terminal 2 (Frontend):

```bash
cd receipt_and_invoice_digitizer
npm install
npm run dev
```

Then open:

- Frontend: http://localhost:5173
- Backend docs: http://localhost:8000/docs

---

## Common Issues

- CORS error: ensure frontend is on `http://localhost:5173` and backend is running on port `8000`.
- Auth token errors: include `Authorization: Bearer <token>` header for protected routes.
- Upload problems: verify file upload is sent as `multipart/form-data` under the field name `file`.

---

## Notes

- Backend creates DB tables automatically on startup.
- Uploaded files are stored in the backend `uploads/` directory.
