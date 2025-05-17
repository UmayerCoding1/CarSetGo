# CarSetGo - Car Rental Platform

A full-stack car rental platform built with React, Node.js, and Express, offering a seamless experience for car rentals and dealership management.

## Project Overview

CarSetGo is a modern car rental platform that connects car owners, dealerships, and customers. The platform features a user-friendly interface, secure payment processing, and comprehensive car management system.

## Tech Stack

### Frontend (Client)
- React 19
- Vite 6
- Tailwind CSS 4
- React Router 7
- React Query
- Stripe Integration
- Google OAuth
- Axios

### Backend (Server)
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Stripe Payment Processing
- Cloudinary Image Storage
- Google APIs Integration

## Project Structure

```
carsetgo/
├── client/                 # Frontend application
│   ├── src/
│   │   ├── assets/        # Static assets
│   │   ├── components/    # Reusable components
│   │   ├── context/       # React context
│   │   ├── hooks/         # Custom hooks
│   │   ├── layout/        # Layout components
│   │   ├── pages/         # Page components
│   │   └── routes/        # Route configurations
│   └── public/            # Public assets
│
└── server/                # Backend application
    ├── config/           # Configuration files
    ├── controllers/      # Route controllers
    ├── middlewares/      # Custom middleware
    ├── models/          # Mongoose models
    ├── routes/          # API routes
    ├── utils/           # Utility functions
    └── public/          # Public assets
```

## Features

### User Features
- User authentication (Email & Google OAuth)
- Car browsing and searching
- Booking management
- Secure payment processing
- Messaging system
- User profile management

### Dealership Features
- Dealership registration and management
- Car listing management
- Booking management
- Pricing management
- Communication with customers

### Admin Features
- User management
- Dealership verification
- Content management
- System monitoring

## Getting Started

### Prerequisites
- Node.js (Latest LTS version)
- MongoDB
- npm or yarn
- Google Cloud Platform account (for OAuth)
- Stripe account (for payments)
- Cloudinary account (for image storage)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/carsetgo.git
   cd carsetgo
   ```

2. Install dependencies for both client and server:
   ```bash
   # Install client dependencies
   cd client
   npm install

   # Install server dependencies
   cd ../server
   npm install
   ```

3. Set up environment variables:

   Create `.env` file in the client directory:
   ```
   VITE_API_URL=http://localhost:5000
   VITE_GOOGLE_CLIENT_ID=your_google_client_id
   VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
   ```

   Create `.env` file in the server directory:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   STRIPE_SECRET_KEY=your_stripe_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

### Running the Application

1. Start the server:
   ```bash
   cd server
   npm start
   ```

2. Start the client:
   ```bash
   cd client
   npm run dev
   ```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## API Documentation (It has been updated at any time.)

### Authentication
- POST `/api/auth/register` - User registration
- POST `/api/auth/login` - User login
- GET `/api/auth/google-login` - Google OAuth login
- POST `/api/auth/logout` - User logout (requires authentication)
- POST `/api/auth/upload-avatar` - Upload user avatar (requires authentication)
- GET `/api/auth/logdin-user` - Get logged-in user details (requires authentication)

### Cars
- GET `/api/cars` - Get all cars
- GET `/api/cars/:id` - Get car by ID
- POST `/api/cars` - Create new car
- PUT `/api/cars/:id` - Update car
- DELETE `/api/cars/:id` - Delete car

### Bookings
- POST `/api/bookings/create-booking` - Create new booking (requires authentication)
- GET `/api/bookings/check-bookings` - Check existing bookings (requires authentication)
- GET `/api/bookings/get-all-bookings` - Get all bookings (requires admin)
- GET `/api/bookings/get-bookings/:userId` - Get user's bookings (requires authentication)
- GET `/api/bookings/get-bookings-by-seller/:sellerId` - Get seller's bookings (requires seller authentication)
- PUT `/api/bookings/update-booking/:bookingId` - Update booking (requires seller authentication)
- DELETE `/api/bookings/delete-booking/:bookingId` - Delete booking (requires authentication)

### Payments
- POST `/api/payments/create-intent` - Create payment intent
- POST `/api/payments/webhook` - Stripe webhook handler

### Dealership
- POST `/api/dealership/create-dealership` - Create dealership (requires authentication)
- GET `/api/dealership/get-dealership/:userId` - Get dealership by user ID (requires authentication)
- GET `/api/dealership/get-dealership-by-seller` - Get seller's dealership (requires seller authentication)
- POST `/api/dealership/clear-dealership` - Clear dealership data (requires authentication)

### Messaging
- GET `/api/messages` - Get user messages
- POST `/api/messages` - Send message
- PUT `/api/messages/:id` - Update message status

### Categories
- GET `/api/categories` - Get all car categories
- POST `/api/categories` - Create new category
- PUT `/api/categories/:id` - Update category
- DELETE `/api/categories/:id` - Delete category

### Pricing
- GET `/api/pricing` - Get pricing information
- POST `/api/pricing` - Create pricing
- PUT `/api/pricing/:id` - Update pricing

### Seller Requests
- GET `/api/seller-requests` - Get seller requests
- POST `/api/seller-requests` - Create seller request
- PUT `/api/seller-requests/:id` - Update seller request status

Note: All endpoints marked with "requires authentication" need a valid JWT token in the Authorization header. Some endpoints may require additional role-based authentication (admin or seller).

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- CORS configuration
- Environment variable protection
- Input validation
- Rate limiting
- Secure file uploads

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

.

## Support

For support, email [support](http://lovalhost:5173/support) or create an issue in the repository.
