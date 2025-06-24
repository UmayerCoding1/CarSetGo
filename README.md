# CarSetGo

CarSetGo is a full-stack web application for car rental and dealership services, providing a seamless experience for users, sellers, and admins. The project is organized into `client` (frontend) and `server` (backend) folders, using modern technologies like React, Vite, TailwindCSS, Node.js, Express, and MongoDB.

---

## Project Structure

```
carsetgo/
├── client/           # Frontend (React, Vite, TailwindCSS)
│   ├── public/       # Static assets
│   ├── src/
│   │   ├── api/      # API utilities
│   │   ├── assets/   # Images and static files
│   │   ├── components/  # UI and feature components
│   │   ├── context/  # React context providers
│   │   ├── hooks/    # Custom React hooks
│   │   ├── layout/   # Layout components
│   │   ├── pages/    # Page components (by feature)
│   │   ├── routes/   # Route definitions and guards
│   │   └── index.css, main.jsx
│   ├── package.json
│   └── vite.config.js
├── server/           # Backend (Node.js, Express, MongoDB)
│   ├── config/       # DB and external service configs
│   ├── controllers/  # Route controllers (auth, car, booking, etc.)
│   ├── middlewares/  # Auth, role, and upload middleware
│   ├── models/       # Mongoose models
│   ├── public/       # Uploaded files
│   ├── routes/       # Express route definitions
│   ├── utils/        # Utility functions/services
│   ├── index.js      # Entry point
│   └── package.json
└── README.md
```

---

## Features

### Client-Side
- **User Authentication** (Sign up, log in/out, Google login)
- **Role-Based Navigation** (User, Seller, Admin)
- **Car Search** (Text & AI-powered image search)
- **Car Categories** (SUV, Crossover, MPV, Pickup, etc.)
- **Responsive UI** (TailwindCSS)
- **Dynamic Content** (Testimonials, FAQs, car details)
- **AI Features** (Car image analysis/specification)
- **Pagination** (Modern, responsive)
- **Custom Hooks** (`useAuth`, `useCars`, etc.)
- **Context Providers** (e.g., `AuthProvider`)
- **Protected Routes** (Private/Seller route guards)

### Server-Side
- **JWT Authentication** (with role management)
- **Google OAuth Integration**
- **Cloudinary Integration** (image upload/management)
- **MongoDB/Mongoose** (data storage & modeling)
- **RESTful API** (auth, car, booking, dealership, etc.)
- **HTTP Caching** (for static assets)
- **Middleware** (role verification, file upload, frontend-only access)
- **Comprehensive Models** (User, Car, Booking, Payment, Review, Dealership, etc.)

---

## Main Directories & Files

### Client
- `src/components/` — UI and feature components (e.g., seller dashboard, charts, forms)
- `src/hooks/` — Custom hooks for API and auth
- `src/context/` — React context providers
- `src/routes/` — Route guards (Private, Seller)
- `src/pages/` — Feature pages (car details, booking, seller, etc.)

### Server
- `controllers/` — Business logic for each route (auth, car, booking, etc.)
- `middlewares/` — Auth, role, and upload middleware
- `models/` — Mongoose schemas for all entities
- `routes/` — Express route definitions
- `utils/` — Utility functions (Cloudinary, Google config, etc.)

---

## API Endpoints
- `/api/auth` — User authentication & Google OAuth
- `/api/car` — Car CRUD & search
- `/api/booking` — Booking management
- `/api/payment` — Payment processing
- `/api/dealership` — Dealership management
- `/api/review` — Car reviews
- `/api/saveCar` — Save/favorite cars
- `/api/analytics` — Analytics endpoints
- ...and more

---

## Example Models

### User
```json
{
  "fullname": "John Doe",
  "email": "johndoe@example.com",
  "username": "johndoe",
  "password": "hashed_password",
  "avatar": "https://example.com/avatar.jpg",
  "role": "user",
  "paymentstatus": "pending",
  "isGoogleAccount": true
}
```

### Car
```json
{
  "make": "Toyota",
  "model": "Corolla",
  "year": 2022,
  "price": 20000,
  "mileage": 15000,
  "color": "Blue",
  "fuelType": "Petrol",
  "transmission": "Automatic",
  "bodyType": "Sedan",
  "seats": 5,
  "description": "A reliable and fuel-efficient sedan.",
  "status": "AVAILABLE",
  "featured": true,
  "images": ["https://example.com/car1.jpg", "https://example.com/car2.jpg"],
  "bookingBy": [],
  "paymentsystem": [
    {
      "type": "FULL_PAYMENT",
      "description": "Full payment required."
    }
  ]
}
```

### Booking
```json
{
  "userId": "user_id",
  "carId": "car_id",
  "bookingStartDate": "2025-05-01",
  "bookingEndDate": "2025-05-10",
  "status": "pending"
}
```

### Payment
```json
{
  "userId": "user_id",
  "carId": "car_id",
  "bookingId": "booking_id",
  "dealershipId": "dealership_id",
  "paymentType": "buying",
  "amount": 20000,
  "paymentMethod": "Credit Card",
  "transactionId": "txn_123456789"
}
```

### Review
```json
{
  "userId": "user_id",
  "carId": "car_id",
  "message": "Great car! Smooth ride and excellent condition."
}
```

### Dealership
```json
{
  "name": "Premium Dealership",
  "address": ["123 Main St, City, Country"],
  "phone": "+1234567890",
  "email": "dealership@example.com"
}
```

### Seller Request
```json
{
  "userId": "user_id",
  "reason": "I want to sell my car on your platform.",
  "status": "pending"
}
```

---

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB instance (local or cloud)

### Installation

1. **Clone the repository:**
   ```sh
   git clone <repo-url>
   cd carsetgo
   ```
2. **Install dependencies:**
   ```sh
   cd client && npm install
   cd ../server && npm install
   ```
3. **Configure environment variables:**
   - Create `.env` files in both `client` and `server` as needed (see sample configs).
4. **Run the development servers:**
   - Client: `npm run dev` (in `client`)
   - Server: `npm run dev` or `npm start` (in `server`)

### Build & Deploy
- **Frontend:** `npm run build` (in `client`)
- **Backend:** Standard Node.js deployment (see `vercel.json` for Vercel setup)
- **Vercel:** Both client and server are ready for Vercel deployment.

---

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## License
[MIT](LICENSE)

---

## Credits
- Built with React, Vite, TailwindCSS, Node.js, Express, MongoDB, Cloudinary, and more.
- Special thanks to all contributors and open-source libraries used in this project.