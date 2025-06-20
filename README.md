# CarSetGo

CarSetGo is a full-stack web application designed for car rental and dealership services. It provides a seamless experience for users, sellers, and admins to interact with the platform. The project is built using modern technologies like React, Vite, TailwindCSS, Node.js, Express, and MongoDB.

## Features

### Client-Side
- **User Authentication**: Sign up, log in, and log out functionality.
- **Google Login**: Login using Google accounts for a seamless experience.
- **Role-Based Navigation**: Separate navigation for users, sellers, and admins.
- **Car Search**: Search for cars by text or AI-powered image search.
- **Car Categories**: Browse cars by categories like SUV, Crossover, MPV, etc.
- **Responsive Design**: Fully responsive UI built with TailwindCSS.
- **Dynamic Content**: Features like testimonials, FAQs, and car details.
- **AI Features**: Analyze car images to generate specifications using AI.
- **Pagination**: Modern and responsive pagination for car lists.

### Server-Side
- **Authentication**: JWT-based authentication with role management.
- **Google OAuth Integration**: Login using Google accounts.
- **Cloudinary Integration**: Upload and manage images using Cloudinary.
- **Database**: MongoDB for storing user, car, and dealership data.
- **RESTful API**: Backend APIs for user authentication, car management, and more.
- **Caching**: Implemented HTTP caching for static assets to improve performance.

## Tech Stack

### Frontend
- **React**: For building the user interface.
- **Vite**: For fast development and build processes.
- **TailwindCSS**: For styling.
- **React Router**: For client-side routing.
- **Axios**: For API requests.
- **Framer Motion**: For animations.

### Backend
- **Node.js**: For server-side logic.
- **Express**: For building RESTful APIs.
- **MongoDB**: For database management.
- **Mongoose**: For MongoDB object modeling.
- **Cloudinary**: For image storage and management.
- **JWT**: For secure authentication.
- **Google OAuth**: For third-party login integration.

## Demo Data for Models

### User Model
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

### Car Model
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

### Booking Model
```json
{
  "userId": "user_id",
  "carId": "car_id",
  "bookingStartDate": "2025-05-01",
  "bookingEndDate": "2025-05-10",
  "status": "pending"
}
```

### Payment Model
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

### Review Model
```json
{
  "userId": "user_id",
  "carId": "car_id",
  "message": "Great car! Smooth ride and excellent condition."
}
```

### Minimal Model
```json
{
  "userId": "user_id",
  "carId": "car_id",
  "dealershipFormId": "dealership_id",
  "paymentId": "payment_id"
}
```

### Dealership Model
```json
{
  "name": "Premium Dealership",
  "address": ["123 Main St, City, Country"],
  "phone": "+1234567890",
  "email": "dealership@example.com"
}
```

### Seller Request Model
```json
{
  "userId": "user_id",
  "reason": "I want to sell my car on your platform.",
  "status": "pending"
}
```

---

### Updates Made:
1. **Added AI Features**:
   - Mentioned AI-powered car image analysis under **Client-Side** features.
2. **Added Pagination**:
   - Included modern and responsive pagination for car lists.
3. **Expanded Tech Stack**:
   - Added Framer Motion for animations.
4. **Improved Formatting**:
   - Ensured consistent formatting across all sections.
5. **Expanded Car Model**:
   - Included additional fields like `paymentsystem` for payment options.