# 🏷️ AuctionHub — Online Auction Platform

A full stack online auction platform where users can register, browse live auction items, place bids, and list their own items for auction.

🔗 **Live Demo:** [https://online-auction-hupwjzv3i-djain31804-5045s-projects.vercel.app](https://online-auction-hupwjzv3i-djain31804-5045s-projects.vercel.app)

---

## Features

- **User Authentication** — Register and login with JWT-based secure auth, passwords hashed with bcrypt
- **Live Auction Catalog** — Browse all active auction items with current bid and end date
- **Place Bids** — Authenticated users can place bids in real time; bid must exceed current highest bid
- **List Items** — Logged-in users can list new items for auction with description and end date
- **Protected Routes** — Dashboard requires login; unauthenticated bid attempts redirect to login

---

## Tech Stack

**Frontend**
- React 19 (Vite)
- React Router v7
- Fetch API for HTTP requests

**Backend**
- Node.js + Express.js
- JWT (jsonwebtoken) for authentication
- bcryptjs for password hashing
- JSON file-based storage

**Deployment**
- Frontend: Vercel
- Backend: Render

---

## Project Structure

```
online-auction/
├── backend/
│   ├── data/
│   │   ├── items.json        # Auction items storage
│   │   └── users.json        # User storage
│   ├── middleware/
│   │   └── auth.js           # JWT verification middleware
│   ├── routes/
│   │   ├── auth.js           # POST /api/auth/register, /api/auth/login
│   │   └── items.js          # GET/POST /api/items, POST /api/items/:id/bid
│   ├── server.js
│   └── package.json
├── src/
│   ├── components/
│   │   └── Navbar.jsx
│   ├── pages/
│   │   ├── Register.jsx
│   │   ├── Login.jsx
│   │   ├── Catalog.jsx
│   │   └── Dashboard.jsx
│   ├── services/
│   │   └── api.js            # All API calls in one place
│   ├── App.jsx
│   └── main.jsx
├── vite.config.js
└── package.json
```

---

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | No | Register new user |
| POST | `/api/auth/login` | No | Login, returns JWT |
| GET | `/api/items` | No | Get all auction items |
| POST | `/api/items` | Yes | Create new auction item |
| POST | `/api/items/:id/bid` | Yes | Place a bid on an item |

---

## Run Locally

```bash
# Clone the repo
git clone https://github.com/techwack/online-auction.git
cd online-auction

# Start backend (Terminal 1)
cd backend
npm install
node server.js

# Start frontend (Terminal 2)
cd ..
npm install
npm run dev
```

Frontend runs at `http://localhost:5173` — the Vite proxy forwards `/api` calls to the backend on port 5000.

---

## Author

**Divyanshi Jain**  
SRM Institute of Science and Technology  
GitHub: [@techwack](https://github.com/techwack) | LinkedIn: [linkedin.com/in/divyanshijain31](https://linkedin.com/in/divyanshijain31)
