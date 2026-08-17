# CarSetGo 🚗

A comprehensive car marketplace platform connecting buyers and sellers with advanced booking systems, payment processing, and AI-powered features.

## 🌟 Features

### For Buyers
- Browse car listings with advanced filtering
- Book test drives and purchases
- Save favorite cars
- Chat with sellers
- Write reviews and ratings
- Secure payment processing with Stripe
- Google OAuth authentication

### For Sellers
- Manage car listings and dealership profiles
- Handle bookings and inquiries
- Analytics dashboard
- AI-powered description generation
- Ad promotion system
- Subscription-based selling plans

### For Admins
- User and content moderation
- Platform analytics
- Report management

## 🛠️ Tech Stack

### Frontend
- React 19, Vite, Tailwind CSS
- React Router, React Query
- React Hook Form, Chart.js
- Stripe.js, Google OAuth

### Backend
- Node.js, Express.js, MongoDB
- JWT authentication, bcryptjs
- Cloudinary, Stripe, Google APIs
- Google Generative AI

### Deployment
- Vercel (Frontend & Backend)
- MongoDB Atlas

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB database
- Stripe account
- Google Cloud Console account
- Cloudinary account

### Installation

1. **Clone and install dependencies**
   ```bash
   git clone <repository-url>
   cd carsetgo
   
   # Frontend
   cd client && npm install
   
   # Backend
   cd ../server && npm install
   ```

2. **Environment Setup**

   **Server (.env)**
   ```env
   PORT=8000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   STRIPE_SECRET_KEY=your_stripe_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GOOGLE_GENERATIVE_AI_KEY=your_google_ai_key
   ```

   **Client (.env)**
   ```env
   VITE_API_BASE_URL=http://localhost:8000/api/v1
   VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   VITE_GOOGLE_CLIENT_ID=your_google_client_id
   ```

3. **Start development servers**
   ```bash
   # Backend
   cd server && npm start
   
   # Frontend
   cd client && npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000

## 📊 Database Models

- **User**: User accounts with roles (user, seller, admin)
- **Car**: Car listings with specifications
- **Dealership**: Dealership information
- **Booking**: Test drive and purchase bookings
- **Payment**: Payment records
- **Review**: User reviews and ratings
- **Message**: Chat system
- **Report**: User reports

## 🔐 Authentication & Authorization

- JWT-based authentication
- Role-based access control
- Google OAuth integration
- Password hashing with bcryptjs

## 💳 Payment System

- Stripe integration
- Multiple payment options (Upfront, EMI, Full payment)
- Subscription plans for sellers
- Payment status tracking

## 🤖 AI Features

- Google Generative AI integration
- AI-powered car description generation

## 🚀 Deployment

### Frontend (Vercel)
1. Connect GitHub repository to Vercel
2. Set environment variables
3. Deploy automatically

### Backend (Vercel)
1. Configure for Node.js deployment
2. Set environment variables
3. Deploy API routes

### Database (MongoDB Atlas)
1. Create MongoDB Atlas cluster
2. Configure network access
3. Set up database users

## 🔧 Development Scripts

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Backend
```bash
npm start        # Start production server
```

## 📁 Project Structure

```
carsetgo/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── routes/        # Routing configuration
│   │   ├── context/       # React context providers
│   │   ├── hooks/         # Custom React hooks
│   │   ├── api/           # API service functions
│   │   └── utils/         # Utility functions
│   └── package.json       # Frontend dependencies
├── server/                # Backend Node.js application
│   ├── routes/            # API route handlers
│   ├── controllers/       # Business logic
│   ├── models/            # Database models
│   ├── middlewares/       # Express middlewares
│   ├── config/            # Configuration files
│   └── package.json       # Backend dependencies
└── README.md              # Project documentation
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

---

**CarSetGo** - Your trusted platform for buying and selling cars! 🚗✨ 