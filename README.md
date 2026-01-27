# Industrial Attachment Management System

A comprehensive web application for managing industrial attachments and internships, similar to NITA, with integrated M-Pesa payment processing.

## 🎯 Features

- **User Authentication**: Secure signup/login system with JWT tokens
- **Opportunity Browsing**: View and search for internships and industrial attachments
- **Application Management**: 
  - Submit applications with resume and referral forms
  - Track application status
  - Upload required documents (PDF, DOC, DOCX)
- **Payment Integration**: 
  - M-Pesa STK Push for KES 500 application fee
  - Automatic payment verification
- **Admin Dashboard**: Manage opportunities and review applications
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## 📁 Project Structure

```
industrial-attachment-system/
├── backend/
│   ├── src/
│   │   ├── controllers/      # Request handlers
│   │   ├── models/           # Database models
│   │   ├── routes/           # API routes
│   │   ├── middleware/       # Auth, upload, error handling
│   │   ├── config/           # Configuration files
│   │   ├── utils/            # Helper functions (M-Pesa, file upload)
│   │   └── server.js         # Entry point
│   ├── Dockerfile
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/       # Reusable React components
│   │   ├── pages/            # Page components
│   │   ├── services/         # API services
│   │   ├── context/          # State management (Zustand)
│   │   └── App.jsx           # Main app component
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
│
├── k8s/
│   ├── backend/
│   │   ├── deployment.yaml   # Backend deployment config
│   │   └── service.yaml      # Backend service config
│   ├── frontend/
│   │   ├── deployment.yaml   # Frontend deployment config
│   │   └── service.yaml      # Frontend service config
│   ├── database/
│   │   └── secret.yaml       # Database credentials (DB creds only)
│   ├── namespace.yaml
│   ├── configmap.yaml
│   └── ingress.yaml
│
└── .github/
    └── workflows/
        └── deploy.yml        # CI/CD pipeline
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB
- Docker & Kubernetes (for deployment)
- M-Pesa Developer Account (Safaricom)
- Cloudinary Account (for file uploads)

### Local Development

#### Backend Setup

```bash
cd backend
npm install

# Create .env file
cat > .env << EOF
PORT=5000
MONGO_URI=mongodb://localhost:27017/industrial-attachment
JWT_SECRET=your-secret-key
JWT_EXPIRE=7d

# M-Pesa Configuration
MPESA_CONSUMER_KEY=your-consumer-key
MPESA_CONSUMER_SECRET=your-consumer-secret
MPESA_SHORTCODE=your-shortcode
MPESA_PASSKEY=your-passkey
MPESA_CALLBACK_URL=http://your-domain.com/api/applications/mpesa/callback
MPESA_API_URL=https://sandbox.safaricom.co.ke

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=noreply@yourdomain.com

NODE_ENV=development
EOF

# Start development server
npm run dev
```

#### Frontend Setup

```bash
cd frontend
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:5000/api" > .env

# Start development server
npm run dev
```

Visit `http://localhost:3000` to view the application.

### Docker Deployment

Build and run with Docker Compose:

```bash
# Build images
docker build -t industrial-attachment-backend ./backend
docker build -t industrial-attachment-frontend ./frontend

# Run containers
docker run -d -p 5000:5000 --env-file backend/.env industrial-attachment-backend
docker run -d -p 3000:80 industrial-attachment-frontend
```

### Kubernetes Deployment

1. **Create namespace:**
```bash
kubectl apply -f k8s/namespace.yaml
```

2. **Configure secrets:**
```bash
# Edit k8s/database/secret.yaml with your actual credentials
kubectl apply -f k8s/database/secret.yaml
```

3. **Apply configurations:**
```bash
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/backend/
kubectl apply -f k8s/frontend/
kubectl apply -f k8s/ingress.yaml
```

4. **Verify deployment:**
```bash
kubectl get pods -n industrial-attachment
kubectl get services -n industrial-attachment
```

## 🔧 Configuration

### M-Pesa Setup

1. Register at [Safaricom Developer Portal](https://developer.safaricom.co.ke/)
2. Create an app and obtain:
   - Consumer Key
   - Consumer Secret
   - Business Shortcode
   - Passkey
3. Configure callback URL in your app
4. Add credentials to `.env` or Kubernetes secrets

### Cloudinary Setup

1. Sign up at [Cloudinary](https://cloudinary.com/)
2. Get your Cloud Name, API Key, and API Secret from Dashboard
3. Add credentials to `.env` or Kubernetes secrets

## 📱 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile

### Opportunities
- `GET /api/opportunities` - List all opportunities
- `GET /api/opportunities/:id` - Get single opportunity
- `POST /api/opportunities` - Create opportunity (Admin)
- `PUT /api/opportunities/:id` - Update opportunity (Admin)
- `DELETE /api/opportunities/:id` - Delete opportunity (Admin)

### Applications
- `POST /api/applications` - Create application
- `GET /api/applications/my` - Get user's applications
- `GET /api/applications/:id` - Get single application
- `PUT /api/applications/:id` - Update application
- `POST /api/applications/:id/payment` - Initiate M-Pesa payment
- `GET /api/applications/:id/payment/status` - Check payment status
- `POST /api/applications/mpesa/callback` - M-Pesa callback (webhook)

### File Upload
- `POST /api/upload/resume/:applicationId` - Upload resume
- `POST /api/upload/referral/:applicationId` - Upload referral form

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting on API endpoints
- Helmet.js for security headers
- File upload validation
- Role-based access control
- CORS configuration

## 📊 Database Models

### User
- email, password, firstName, lastName
- phoneNumber, role (student/admin/company)
- isVerified, timestamps

### Opportunity
- companyName, title, description, type
- category, location, duration
- requirements, benefits, availableSlots
- applicationDeadline, status

### Application
- Personal info (firstName, lastName, email, phone, DOB, nationality)
- Educational info (institution, course, yearOfStudy, studentId)
- Documents (resume, referralForm)
- Payment info (status, amount, transactionId, mpesaReceiptNumber)
- Application status (draft, submitted, under-review, shortlisted, accepted, rejected)

## 🚦 Application Flow

1. **User Registration/Login**
2. **Browse Opportunities**
3. **Fill Application Form**
   - Personal details
   - Educational information
   - Upload resume
   - Upload referral form (for continuing students)
4. **Payment Processing**
   - Initiate M-Pesa STK Push
   - Enter phone number
   - Confirm payment on phone
   - System verifies payment
5. **Application Submitted**
6. **Track Application Status**

## 🎨 Tech Stack

### Backend
- Node.js & Express
- MongoDB & Mongoose
- JWT for authentication
- M-Pesa API integration
- Cloudinary for file storage
- Multer for file uploads

### Frontend
- React 18
- React Router v6
- Zustand (state management)
- Tailwind CSS
- Axios
- Vite

### DevOps
- Docker
- Kubernetes
- GitHub Actions (CI/CD)
- Nginx

## 📝 Environment Variables

See `.env.example` files in backend and frontend directories for required environment variables.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Support

For support, email support@yourdomain.com or create an issue in the repository.

## 🗺️ Roadmap

- [ ] Email notifications for application updates
- [ ] SMS notifications
- [ ] Document verification system
- [ ] Interview scheduling
- [ ] Company dashboard
- [ ] Analytics and reporting
- [ ] Mobile app (React Native)
- [ ] Multi-language support

## ⚠️ Important Notes

### M-Pesa Testing
Use Safaricom's sandbox environment for testing. Switch to production API URL when ready for deployment.

### Security
- Never commit `.env` files or `secret.yaml` files
- Store secrets in environment variables or secret management systems
- Use HTTPS in production
- Regularly update dependencies

### File Uploads
- Maximum file size: 5MB
- Allowed formats: PDF, DOC, DOCX, JPG, JPEG, PNG
- Files are stored in Cloudinary

### Payment
- Application fee: KES 500
- Payment is required before application submission
- M-Pesa receipts are stored with applications

---

Built with ❤️ for streamlining industrial attachment and internship processes.
